// rental.controller.js
const rentalService = require('../service/rental.service');
const userService = require('../service/user.service');
const User = require('../models/user.model'); 
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator'); // Use a package to generate OTP
let otpStore = {};
class RentalController {
  async createRental(req, res) {
    try {
      const rental = await rentalService.createRental(req.body);
      res.status(201).json(rental);
    } catch (error) {
      console.log("error while creating rental",error)
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRentals(req, res) {
    try {
   
      const { itemType, location } = req.query;
      const rentals = await rentalService.getAllRentals(itemType, location);
  
      res.status(200).json(rentals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRentalById(req, res) {
    try {
      const rental = await rentalService.getRentalById(req.params.id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRental(req, res) {
    try {
      const rental = await rentalService.updateRental(req.params.id, req.body);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRental(req, res) {
    try {
      const rental = await rentalService.deleteRental(req.params.id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json({ message: 'Rental deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async register(req, res) {
    try {
      const { email, password, name, userType } = req.body;

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Register the new user
      const user = await userService.registerUser(email, hashedPassword, name, userType);

      if (user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({ error: 'Failed to register user' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  //Verify OTP
  async verifyOtp(req, res) {
    const { email, otp } = req.body;

    try {
      // Check if the OTP matches the one stored in memory
      if (!otpStore[email] || otpStore[email] !== otp) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      // If the OTP is valid, clear it from memory
      delete otpStore[email];

      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      res.status(500).json({ error: 'Error verifying OTP' });
    }
  }


  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async requestOtp(req, res) {
    const { email, source } = req.body;
  
    try {
      // Validate user based on source (NEW_USER or EXISTING_USER)
      if (source === 'NEW_USER') {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
      } else if (source === 'EXISTING_USER') {
        const user = await userService.findUserByEmail(email);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid source flag' });
      }
  
      // Generate OTP
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      otpStore[email] = otp; // Store OTP in memory or database
  
      // Read the HTML template
      const templatePath = path.join(__dirname, '../templates/otpTemplate.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  
      // Replace placeholders with actual values
      htmlTemplate = htmlTemplate.replace('{{otp}}', otp);
      htmlTemplate = htmlTemplate.replace('{{action}}', source === 'NEW_USER' ? 'Registration' : 'Password Reset');
      htmlTemplate = htmlTemplate.replace('{{description}}', source === 'NEW_USER' ? 'complete your registration' : 'reset your password');
  
      // Create a transporter for sending email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yeshusetia10@gmail.com',
          pass: 'slqo mijx hmjq nqzq',
        },
      });
  
      // Mail options with HTML template
      const mailOptions = {
        from: 'yeshusetia10@gmail.com',
        to: email,
        subject: `Your OTP for ${source === 'NEW_USER' ? 'Registration' : 'Password Reset'}`,
        html: htmlTemplate, // Use the HTML template
      };
  
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  
      // Send success response back to the client
      res.status(200).json({ message: 'OTP sent successfully', otp });
    } catch (error) {
      console.error('Error sending OTP: ', error);
      res.status(500).json({ error: 'Error sending OTP' });
    }
  }
  


  // Reset password
  async resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;

    // Check if OTP matches
    if (otpStore[email] !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const user = await userService.updateUserPassword(email, hashedPassword);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Clear OTP from the store
    delete otpStore[email];

    res.status(200).json({ message: 'Password reset successfully' });
  }





}







module.exports = new RentalController();

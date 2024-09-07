const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Assuming you have a User model

class UserService {
  
  async register(userData) {
    const { email, password, name, userType, otp } = userData;
  
    // Verify OTP
    const isOtpValid = await otpService.verifyOtp(email, otp);
    if (!isOtpValid) {
      throw new Error('Invalid or expired OTP');
    }
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      userType,
    });
  
    // Save the user in the database
    await user.save();
  
    return user;
  }

  async findUserByEmail(email) {
    // Find a user by their email
    const user = await User.findOne({ email });
    return user;
  }
  async findUserByEmail(email) {
    return User.findOne({ email });
  }

  // Register new user
  async registerUser(email, password, name, userType) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      userType,
    });

    return user.save(); // Save user to the database
  }
  async updateUserPassword(email, hashedPassword) {
    // Find the user and update the password
    const user = await User.findOneAndUpdate(
      { email }, // Find the user by email
      { password: hashedPassword }, // Update the password with the new hashed password
      { new: true } // Return the updated user object
    );
    
    return user;
  }
  async login(email, password) {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, userType: user.userType }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    return { user, token };
  }
}

module.exports = new UserService();

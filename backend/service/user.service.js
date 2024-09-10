const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Assuming you have a User model

class UserService {


  async findUserByEmail(email) {
    // Find a user by their email
    const user = await User.findOne({ email });
    return user;
  }
  async findUserByEmail(email) {
    return User.findOne({ email });
  }

  // Register new user
  async registerUser(email, hashedPassword, name, userType) {
 

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
      throw new Error('User not found');
    }
  
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    console.log('User from DB:', user);
    console.log('Plain text password:', password);
    console.log('user from db',user.password);
    if (!isPasswordValid) {
      console.log(isPasswordValid); // Should return true or false
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

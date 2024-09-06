import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';
import openEye from '../../app/assets/open-eye.svg';
import closeEye from '../../app/assets/close-eye.svg';
function SignUp() {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('USER'); // Default to 'USER'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Reset previous error/success messages
    setError('');
    setSuccess('');

    // Validate email
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, number, and special character.');
      return;
    }

    // Call the registration API
    try {
      const response = await fetch('http://localhost:5000/api/rentals/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('User registered successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to register');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <AuthLayout>
      <h1>Get Started Now</h1>
      
      {/* Show error or success message */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className='inputs'
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            className='inputs'
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input
              className='inputs'
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
              <span 
            className="eye-icon" 
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            <img 
              src={showPassword ? closeEye : openEye} 
              alt={showPassword ? 'Hide password' : 'Show password'} 
            />
          </span>
          </div>
        </div>

        <div className="form-group d-flex center-align gap-16 ">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms" style={{ marginBottom: '0' }}>
            I agree to the <a href="/terms">terms & policy</a>
          </label>
        </div>

        <button type="submit" className="signup-btn">Signup</button>
      </form>

      <div className="social-signup">
        <p className='d-flex just-center'>Or</p>
        <button className="google-btn">Sign in with Google</button>
      </div>

      <p className="signin-link">
        Have an account? <a href="/login">Sign In</a>
      </p>
    </AuthLayout>
  );
}

export default SignUp;

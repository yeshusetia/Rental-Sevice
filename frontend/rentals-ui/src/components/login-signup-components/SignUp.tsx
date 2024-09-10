import React, { useState, useEffect } from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';
import openEye from '../../app/assets/open-eye.svg';
import closeEye from '../../app/assets/close-eye.svg';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // State for form inputs
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('USER'); // Default to 'USER'
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State for OTP
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // State for resend OTP loading
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Function to handle OTP sending
  const handleSendOtp = async (e: any) => {
    e.preventDefault();

    // Reset previous error/success messages
    setError('');
    setSuccess('');

    // Validate email and password
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, number, and special character.');
      return;
    }

    // Send OTP to the email
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/rentals/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType, source: 'NEW_USER' }),
      });

      if (response.ok) {
        setSuccess('OTP sent to your email.');
        setOtpSent(true); // OTP has been sent, now show OTP input field
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle OTP verification and user registration
  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();

    // Reset previous error/success messages
    setError('');
    setSuccess('');

    // Validate OTP and register the user
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/rentals/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, userType, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        if (userType === 'BROKER') {
          handleRazorpayPayment(); // Trigger Razorpay payment if user is BROKER
        } else {
          setSuccess('User registered successfully!');
          setTimeout(() => {
            navigate('/login'); // Navigate to login page after successful registration
          }, 1000);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to register');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Razorpay payment
  const handleRazorpayPayment = () => {
    const options = {
      key: 'rzp_live_Z00fZaH51I2BAi', // Enter your Razorpay API Key
      amount: '20000', // Amount is in currency subunits (50000 paise = ₹500)
      currency: 'INR',
      name: 'Broker Registration Fee',
      description: 'Complete your registration by paying the fee',
      // image: 'https://example.com/your_logo', // Replace with your logo
      handler: function (response:any) {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
        setSuccess('Payment successful!');
        setTimeout(() => {
          navigate('/login'); // After payment, navigate to login
        }, 1000);
      },
      prefill: {
        name,
        email,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open(); // Open the Razorpay payment modal
  };


  // Function to handle OTP resending
  const handleResendOtp = async () => {
    setError('');
    setSuccess('');

    // Resend OTP
    try {
      setResendLoading(true);
      const response = await fetch('http://localhost:5000/api/rentals/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType, source: 'NEW_USER' }),
      });

      if (response.ok) {
        setSuccess('OTP resent successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1>Get Started Now</h1>

      {/* Show error or success message */}
      {error && <div className="error-message pb-16 red"><span className="h7-b">{error}</span></div>}
      {success && <div className="success-message pb-16 green"><span className="h7-b">{success}</span></div>}

      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
        {/* Name input */}
        <div className="form-group">
          <label>Name</label>
          <input
            className="inputs"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
        <div className="form-group">
          <label>Email address</label>
          <input
            className="inputs"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label>Password</label>
          <div className="d-flex gap-12 center-align">
            <input
              className="inputs"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="pointer-cursor"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              <img
                src={showPassword ? closeEye : openEye}
                alt={showPassword ? 'Hide password' : 'Show password'}
              />
            </span>
          </div>
        </div>

        {/* User type dropdown */}
        <div className="form-group">
          <label>User Type</label>
          <select
            style={{ width: '75%' }}
            className="inputs"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="USER">User</option>
            <option value="BROKER">Broker</option>
          </select>
        </div>

        {/* OTP input field (only show after OTP is sent) */}
        {otpSent && (
          <>
            <div className="form-group">
              <label>OTP</label>
              <input
                className="inputs"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="resend-btn"
              onClick={handleResendOtp}
              disabled={resendLoading}
            >
              {resendLoading ? 'Resending OTP...' : 'Resend OTP'}
            </button>
          </>
        )}

        {/* Submit button */}
        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? (otpSent ? 'Verifying OTP...' : 'Sending OTP...') : (otpSent ? 'Verify OTP' : 'Sign Up')}
        </button>
      </form>

      <p className="signin-link">
        Have an account? <a href="/login">Login In</a>
      </p>
    </AuthLayout>
  );
}

export default SignUp;

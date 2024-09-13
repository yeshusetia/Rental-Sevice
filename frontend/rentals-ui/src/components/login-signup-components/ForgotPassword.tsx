import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';
import openEye from '../../app/assets/open-eye.svg';
import closeEye from '../../app/assets/close-eye.svg';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();
  // Handle OTP request
  const handleRequestOtp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validate email
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,source:'EXISTING_USER' }),
      });

      if (response.ok) {
        setOtpSent(true);
        setSuccess('OTP sent to your email.');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and password reset
  const handleResetPassword = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate password
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        setSuccess('Password reset successfully.');
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page after successful password reset
        }, 1000); // Redirect after a delay of 2 seconds (optional)
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1>Forgot Your Password?</h1>
      <p>{otpSent ? 'Enter the OTP and new password' : 'Enter your email address to reset your password'}</p>

      {error && <div className="error-message pb-16 red"><span className='h7-b'>{error}</span></div>}
      {success && <div className="success-message pb-16 green"><span className='h7-b'>{success}</span></div>}

      {!otpSent ? (
        <>
          <div className="form-group">
            <label>Email address</label>
            <input
              className="inputs"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="reset-btn" onClick={handleRequestOtp} disabled={loading}>
          {loading ? (
            <>
              Sending OTP<span className="moving-dots"></span>
            </>
          ) : (
            'Send OTP'
          )}
        </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>OTP</label>
            <input
              className="inputs"
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className='d-flex gap-12'>
            <input
              className="inputs"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span 
            className="d-flex center-align" 
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            <img 
              src={showPassword ? closeEye : openEye} 
              alt={showPassword ? 'Hide password' : 'Show password'} 
            />
          </span>
            </div>
       
        
          </div>
          <button className="reset-btn" onClick={handleResetPassword} disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </>
      )}

      <p className="signin-link">
        Remember your password? <a href="/login">Log In</a>
      </p>
    </AuthLayout>
  );
}

export default ForgotPassword;

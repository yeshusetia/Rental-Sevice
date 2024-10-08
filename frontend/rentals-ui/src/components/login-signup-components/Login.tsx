import React, { useEffect, useState } from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';
import { useNavigate } from 'react-router-dom';
import openEye from '../../app/assets/open-eye.svg';
import closeEye from '../../app/assets/close-eye.svg';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals/health`);
        if (response.ok) {
          const data = await response.text();
          console.log('service is running',data)
        }
      } catch (err) {
       console.log('service is not running',err)
      }
    };

    checkHealth(); // Call the health check function
  }, []); // Empty dependency array to run on mount only
  
  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true); // Show loading indicator
    setError(''); // Reset error

    // Call the login API
    try {
      const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data to local storage or context
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <AuthLayout>
      <h1>Welcome back!</h1>
      <p>Enter your Credentials to access your account</p>

      {error && <div className="error-message pb-16 red"><span className='h7-b'>{error}</span></div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="inputs2"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-group">
            <div className='d-flex gap-12'style={{marginBottom:'12px'}} >
            <input
              className="inputs2"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

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
            <a href="/forgot-password" className="forgot-password">forgot password</a>
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

     {false &&  <div className="social-login">
        <p>Or</p>
        <button className="google-btn">Sign in with Google</button>
      </div>}

      <p className="signup-link">Don't have an account? <a href="/register">Sign Up</a></p>
    </AuthLayout>
  );
}

export default Login;

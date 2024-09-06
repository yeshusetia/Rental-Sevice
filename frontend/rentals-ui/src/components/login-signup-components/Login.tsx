import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true); // Show loading indicator
    setError(''); // Reset error

    // Call the login API
    try {
      const response = await fetch('http://localhost:5000/api/rentals/login', {
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

        // Redirect or do something after successful login
        console.log('Login successful', data);
        // window.location.href = '/dashboard'; // Example redirect to a dashboard
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

      {error && <div className="error-message">{error}</div>} {/* Show error message if exists */}

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
            <input
              className="inputs2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/forgot-password" className="forgot-password">forgot password</a>
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="social-login">
        <p>Or</p>
        <button className="google-btn">Sign in with Google</button>
      </div>

      <p className="signup-link">Don't have an account? <a href="/register">Sign Up</a></p>
    </AuthLayout>
  );
}

export default Login;

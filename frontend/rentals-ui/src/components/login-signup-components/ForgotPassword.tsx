import React from 'react';
import AuthLayout from './AuthLayout';
import './login-sign-up.scss';

function ForgotPassword() {
  return (
    <AuthLayout>
      <h1>Forgot Your Password?</h1>
      <p>Enter your email address to reset your password</p>

      <div className="form-group">
        <label>Email address</label>
        <input className="inputs" type="email" placeholder="Enter your email" />
      </div>

      <button className="reset-btn">Reset Password</button>

      <p className="signin-link">
        Remember your password? <a href="/login">Sign In</a>
      </p>
    </AuthLayout>
  );
}

export default ForgotPassword;
import React from 'react';
import './login-sign-up.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form">
          {children}
        </div>
        <div className="auth-image">
          {/* Add your image path here */}
          {/* <img src="/path-to-your-image.jpg" alt="Leaf" /> */}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
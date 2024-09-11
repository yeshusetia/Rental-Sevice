import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './routes/NotFound';
import Dashboard from './routes/Dashboard';
import SignUp from './components/login-signup-components/SignUp';
import Login from './components/login-signup-components/Login';
import ForgotPassword from './components/login-signup-components/ForgotPassword';
import PrivateRoute from './components/private-route-component/private-route-component'; // Importing PrivateRoute
import { RentalProvider } from './context/RentalContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protect the /dashboard route using PrivateRoute */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <UserProvider>
               <RentalProvider>
              <Dashboard />
              </RentalProvider>
              </UserProvider>
            </PrivateRoute>
          }
        />

        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

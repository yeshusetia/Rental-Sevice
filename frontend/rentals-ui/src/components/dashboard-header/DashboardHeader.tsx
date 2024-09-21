import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/styles.scss';
import add from '../../app/assets/plus.svg';
import logo from '../../app/assets/logo.svg'; // Assuming you have a logo.svg file
import userIcon from '../../app/assets/user-icon.svg'; // Assuming you have a user icon
import RentalUploadModal from '../common-components/modal-component/RentalUploadModal';
import './DashboardHeader.scss';
import { useUser } from '../../context/UserContext';

function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate(); // For navigation after logout
  const location = useLocation(); // To get the current path
  const { user, setUser } = useUser();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserClick = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard'); // Navigate to dashboard if not already there
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/login');  // Navigate to login page
  };

  return (
    <div className="top-header d-flex just-space align-items-center">
      {/* Logo on the left */}
      <div className="logo-container d-flex center-align gap-12">
        <img src={logo} alt="QuickList Logo" className="logo" />
        <span className='h5 logo-text'>Quick List</span>
      </div>

      {/* Post Listing button on the right */}

      <div className="actions d-flex align-items-center gap-16">
        {user.userType == 'BROKER' && 
           <div className="post-property-btn d-flex gap-8" onClick={openModal}>
           <img src={add} alt="Add Listing" />
           <span className="white">Post Listing</span>
         </div>
         }
     

        {/* User Icon with Dropdown Menu */}
        <div className="user-menu-container position-relative d-flex center-align">
          <img
            src={userIcon}
            alt="User Icon"
            onClick={toggleUserMenu}
            className="user-icon cursor-pointer"
          />
          {isUserMenuOpen && (
            <div className="user-dropdown">
              <ul className="dropdown-list">
              <li style={{ whiteSpace: 'nowrap' }} className="dropdown-item" onClick={handleUserClick}>
                  {user.name}
                </li>
              { false &&  <li className="dropdown-item">Wishlist</li>}
                <li className="dropdown-item" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Rental Property Modal */}
      <RentalUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DashboardHeader;

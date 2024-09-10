import React, { useState } from 'react';
import '../../styles/styles.scss';
import add from '../../app/assets/plus.svg';
import RentalUploadModal from '../common-components/modal-component/RentalUploadModal';

function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="top-header d-flex just-end">
      <div className="post-property-btn d-flex gap-8" onClick={openModal}>
        <img src={add} alt="" />
        <span className="white">Post Listing</span>
      </div>

      {/* Rental Property Modal */}
      <RentalUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DashboardHeader;

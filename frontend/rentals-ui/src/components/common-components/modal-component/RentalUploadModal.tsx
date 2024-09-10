import React, { useState, useEffect } from 'react';
import './RentalUploadModal.scss';
import { ToastContainer, toast } from 'react-toastify';
import close from '../../../app/assets/close.svg';

interface RentalUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  { label: 'Delhi', value: 'DELHI' },
  { label: 'Mumbai', value: 'MUMBAI' },
  { label: 'Bengaluru', value: 'BENGALURU' },
  { label: 'Hyderabad', value: 'HYDERABAD' },
  { label: 'Kolkata', value: 'KOLKATA' },
  { label: 'Chandigarh', value: 'CHANDIGARH' }
];

function RentalUploadModal({ isOpen, onClose }: RentalUploadModalProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [itemStatus, setItemStatus] = useState('RENT');
  const [itemType, setItemType] = useState('PROPERTY');
  const [ownerName, setOwnerName] = useState('');
  const [ownerMobileNumber, setOwnerMobileNumber] = useState('');
  const [rentDuration, setRentDuration] = useState('MONTH');
  const [sellingPrice, setSellingPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  // Reset the form when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      // Reset all form values
      setTitle('');
      setLocation('');
      setPrice('');
      setItemStatus('RENT');
      setItemType('PROPERTY');
      setOwnerName('');
      setOwnerMobileNumber('');
      setRentDuration('MONTH');
      setSellingPrice('');
      setImage(null);
      setFileName('');
      setError(null);
    }
  }, [isOpen]); // Trigger when `isOpen` changes

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result.toString());
        setError(null);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an image');
      return;
    }

    const rentalData: any = {
      title,
      location,
      itemStatus,
      itemType,
      ownerName,
      ownerMobileNumber,
      image,
    };

    if (itemStatus === 'RENT') {
      rentalData.price = price;
      rentalData.rentDuration = rentDuration;
    }

    if (itemStatus === 'SALE') {
      rentalData.sellingPrice = sellingPrice;
    }

    try {
      const response = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalData),
      });

      if (response.ok) {
        toast.success('Rental posted successfully!');
        onClose();
      } else {
        toast.error('Failed to post rental.');
      }
    } catch (error) {
      console.error('Error posting rental:', error);
      toast.error('Error posting rental.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Post Rental Property</h2>
          <img onClick={onClose} className="close-btn" src={close} alt="Close" />
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group file-upload-wrapper">
              <label className="file-upload-label" htmlFor="imageUpload">Upload Image</label>
              <input
                type="file"
                id="imageUpload"
                className="file-upload-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {fileName && <span className="file-name">{fileName}</span>}
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="form-group">
              <label>Property Title</label>
              <input
                type="text"
                className="inputs"
                placeholder="Enter property title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Property Location</label>
              <select
                className="inputs"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select Location</option>
                {locations.map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={itemStatus}
                onChange={(e) => setItemStatus(e.target.value)}
                required
              >
                <option value="RENT">Rent</option>
                <option value="SALE">Sale</option>
              </select>
            </div>

            <div className="form-group">
              <label>Item Type</label>
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                required
              >
                <option value="PROPERTY">Property</option>
                <option value="VEHICLE">Vehicle</option>
                <option value="THING">Thing</option>
              </select>
            </div>

            {itemStatus === 'RENT' && (
              <>
                <div className="form-group">
                  <label>Rent Price</label>
                  <input
                    type="number"
                    className="inputs"
                    placeholder="Enter rent price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rent Duration</label>
                  <select
                    value={rentDuration}
                    onChange={(e) => setRentDuration(e.target.value)}
                    required
                  >
                    <option value="DAY">Day</option>
                    <option value="MONTH">Month</option>
                    <option value="QUATERLY">Quarterly</option>
                    <option value="SIX_MONTHS">Six Months</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </>
            )}

            {itemStatus === 'SALE' && (
              <div className="form-group">
                <label>Selling Price</label>
                <input
                  type="number"
                  className="inputs"
                  placeholder="Enter selling price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Owner Name</label>
              <input
                type="text"
                className="inputs"
                placeholder="Enter owner's name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Owner Mobile Number</label>
              <input
                type="text"
                className="inputs"
                placeholder="Enter owner's mobile number"
                value={ownerMobileNumber}
                onChange={(e) => setOwnerMobileNumber(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="post-btn">Post Listing</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RentalUploadModal;

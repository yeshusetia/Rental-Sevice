import React, { useState, useEffect } from 'react';
import './RentalUploadModal.scss';
import { ToastContainer, toast } from 'react-toastify';
import close from '../../../app/assets/close.svg';
import { useUser } from '../../../context/UserContext';
import { useRentals } from '../../../context/RentalContext';

interface RentalUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  rental?: any;  // Optional rental prop for editing
}

const locations = [
  { label: 'Delhi', value: 'DELHI' },
  { label: 'Mumbai', value: 'MUMBAI' },
  { label: 'Bengaluru', value: 'BENGALURU' },
  { label: 'Hyderabad', value: 'HYDERABAD' },
  { label: 'Kolkata', value: 'KOLKATA' },
  { label: 'Chandigarh', value: 'CHANDIGARH' }
];

// Define categories for each item type
const categories: any = {
  PROPERTY: [
    { label: 'Residential', value: 'RESIDENTIAL' },
    { label: 'Sport Venue', value: 'SPORT_VENUE' },
    { label: 'Commercial Spaces', value: 'COMMERCIAL_SPACES' }
  ],
  VEHICLE: [
    { label: 'Four Wheeler', value: 'FOUR_WHEELER' },
    { label: 'Two Wheeler', value: 'TWO_WHEELER' },
    { label: 'Bicycle', value: 'BICYCLE' }
  ],
  THING: [
    { label: 'Furniture', value: 'FURNITURE' },
    { label: 'Electronics', value: 'ELECTRONICS' },
    { label: 'Laptops', value: 'LAPTOPS' },
    { label: 'Mobiles', value: 'MOBILES' }
  ]
};

function RentalUploadModal({ isOpen, onClose, rental }: RentalUploadModalProps) {
  const { user } = useUser();
  const { setRentalUploadedSuccessfully } = useRentals();

  // Prefill form values if rental exists, else default values
  const [title, setTitle] = useState(rental ? rental.title : '');
  const [location, setLocation] = useState(rental ? rental.location : '');
  const [price, setPrice] = useState(rental ? rental.price : '');
  const [itemStatus, setItemStatus] = useState(rental ? rental.itemStatus : 'RENT');
  const [itemType, setItemType] = useState(rental ? rental.itemType : 'PROPERTY');
  const [category, setCategory] = useState(rental ? rental.category : '');
  const [ownerName, setOwnerName] = useState(rental ? rental.ownerName : '');
  const [error, setError] = useState<string | null>(null);
  const [ownerMobileNumber, setOwnerMobileNumber] = useState(rental ? rental.ownerMobileNumber : '');
  const [rentDuration, setRentDuration] = useState(rental ? rental.rentDuration : 'MONTH');
  const [sellingPrice, setSellingPrice] = useState(rental ? rental.sellingPrice : '');
  const [image, setImage] = useState<string | null>(rental ? rental.image : null);
  const [fileName, setFileName] = useState('');

  // Reset the form when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      // If editing, prefill the form fields
      if (rental) {
        setTitle(rental.title);
        setLocation(rental.location);
        setPrice(rental.price);
        setItemStatus(rental.itemStatus);
        setItemType(rental.itemType);
        setCategory(rental.category);
        setOwnerName(rental.ownerName);
        setOwnerMobileNumber(rental.ownerMobileNumber);
        setRentDuration(rental.rentDuration);
        setSellingPrice(rental.sellingPrice);
        setImage(rental.image);
        setFileName(''); // Reset file name since it's already prefilled
      } else {
        // Reset all form values for new rental
        setTitle('');
        setLocation('');
        setPrice('');
        setItemStatus('RENT');
        setItemType('PROPERTY');
        setCategory('');
        setOwnerName('');
        setOwnerMobileNumber('');
        setRentDuration('MONTH');
        setSellingPrice('');
        setImage(null);
        setFileName('');
      }
    }
  }, [isOpen, rental]);

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
      category,
      ownerName,
      ownerMobileNumber,
      image
    };

    if (itemStatus === 'RENT') {
      rentalData.price = price;
      rentalData.rentDuration = rentDuration;
    }

    if (itemStatus === 'SALE') {
      rentalData.sellingPrice = sellingPrice;
    }

    try {
      const rentalDataWithEditor = {
        ...rentalData,
        editorId: user._id
      };
      const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals`, {
        method: rental ? 'PUT' : 'POST', // PUT for editing, POST for new rental
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentalDataWithEditor)
      });

      if (response.ok) {
        setRentalUploadedSuccessfully(true); 
        toast.success(`Rental ${rental ? 'updated' : 'posted'} successfully!`);
        onClose();
      } else {
        toast.error(`Error ${rental ? 'updating' : 'posting'} rental.`);
      }
    } catch (error) {
      console.error(`Error ${rental ? 'updating' : 'posting'} rental:`, error);
      toast.error(`Error ${rental ? 'updating' : 'posting'} rental.`);
    }
  };

  const categoryOptions = categories[itemType] || [];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Post Item</h2>
          <img onClick={onClose} className="close-btn" src={close} alt="Close" />
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group file-upload-wrapper">
              <label className="file-upload-label" htmlFor="imageUpload">
                Upload Image
              </label>
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
              <label>Title</label>
              <input
                type="text"
                className="inputs"
                placeholder="Enter Title"
                value={title}
                maxLength={30} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <select
                className="inputs"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
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

            {/* Category field based on itemType */}
            {categoryOptions.length > 0 && (
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((cat:any) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                maxLength={50} 
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
                maxLength={15} 
                onChange={(e) => setOwnerMobileNumber(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="post-btn">
              Post Listing
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RentalUploadModal;

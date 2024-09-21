import React from 'react';
import '../card-components/CardComponent.scss';
import '../../../styles/styles.scss';
import heart from '../../../app/assets/heart.svg';
import pencil from '../../../app/assets/pencil.svg';
import bin from '../../../app/assets/bin.svg';
import { toast } from 'react-toastify';
import { useUser } from '../../../context/UserContext';
import { useRentals } from '../../../context/RentalContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS for the confirm alert

function CardComponent({ rental,style }:{rental:any,style:any}) {
  const { user } = useUser();  
  const { setRentalUploadedSuccessfully } = useRentals();
  
  function formatRentDuration(duration:any) {
    switch (duration) {
      case 'DAY':
        return 'Day';
      case 'MONTH':
        return 'Month';
      case 'QUARTERLY':
        return 'Quarterly';
      case 'SIX_MONTHS':
        return 'Six Months';
      case 'YEARLY':
        return 'Yearly';
      default:
        return duration; 
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_RENTAL_SERVICE_URL}api/rentals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRentalUploadedSuccessfully(true); 
        toast.success('Rental deleted successfully');
      } else {
        toast.error('Failed to delete rental');
      }
    } catch (error) {
      console.error('Error deleting rental:', error);
      toast.error('Error deleting rental');
    }
  };

  // Show confirmation popup
  const showDeleteConfirmation = (id: string) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this rental?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)  // If confirmed, call handleDelete
        },
        {
          label: 'No',
          onClick: () => toast.info('Rental deletion cancelled')  // If cancelled
        }
      ]
    });
  };

  return (
    <div className="main-card d-flex flex-dir-col">
      <div className="photo">
        <img src={rental.image} alt={rental.title} />
      </div>

      <div className="bottom-card d-flex flex-dir-col gap-8">
        <div className='d-flex just-space'>
          <div>
            <span className='h5-b' style={{color:'#E93740'}}>
              ₹ {(rental.price || rental.sellingPrice)?.toLocaleString('en-US')}
            </span>
            {rental.itemStatus === 'RENT' && (
              <span className='h6'> / {formatRentDuration(rental.rentDuration)}</span>
            )}
          </div>

          <div className={rental.itemStatus === 'RENT' ? 'rent' : 'sale'}>
            <span className='h7-b'>
              {rental.itemStatus}
            </span>
          </div>
        </div>
        
        {/* Add car title below rent */}
        <div className="car-title">
          <span className="h6-b">{rental.title}</span>
        </div>
      </div>

      <div className="bottom-card-seller d-flex just-space center-align">
        <div className="seller-info d-flex gap-8">
          <div className="seller-name-alpha d-flex just-center center-align">
            <span className='h6'>{rental.ownerName.charAt(0)}</span>
          </div>
          <div className="seller-name d-flex flex-dir-col just-center">
            <span className='h6'>{rental.ownerName}</span>
            <span className='grey h8'>{rental.ownerMobileNumber}</span>
          </div>
        </div>

        <div className='d-flex gap-8'>
          { user._id === rental.editorId && 
            <img 
              className='pointer-cursor' 
              style={{ width: '32px', height: '32px', opacity: '0.7' }} 
              src={bin} 
              alt="Delete" 
              onClick={() => showDeleteConfirmation(rental._id)}  // Show confirmation before deleting
            /> 
          }
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

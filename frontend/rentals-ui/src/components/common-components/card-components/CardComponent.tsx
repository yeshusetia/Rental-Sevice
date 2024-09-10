import React from 'react';
import '../card-components/CardComponent.scss';
import '../../../styles/styles.scss';
import heart from '../../../app/assets/heart.svg';


function CardComponent({ rental}:{rental:any} ) {

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
            return duration; // Fallback in case an unknown duration is passed
        }
      }


  return (
    <div className="main-card d-flex flex-dir-col">
      <div className="photo">
        <img src={rental.image} alt={rental.title} /> {/* Accessing image and title */}
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
</div>
      
      <div className="bottom-card-seller d-flex just-space center-align">
        <div className="seller-info d-flex gap-8">
          <div className="seller-name-alpha d-flex just-center center-align">
            <span className='h6'>{rental.ownerName.charAt(0)}</span> {/* Accessing owner's name initial */}
          </div>
          <div className="seller-name d-flex flex-dir-col just-center">
            <span className='h6'>{rental.ownerName}</span> {/* Accessing owner's name */}
            <span className='grey h7'>Contributor</span>
          </div>
        </div>

        <div className="heart d-flex just-center center-align">
          <img src={heart} alt="Favorite" />
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

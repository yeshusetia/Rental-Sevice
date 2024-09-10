import React from 'react';
import './CitiesComponent.scss';
import delhiImg from '../../../app/assets/cities/delhi.jpg';
import mumbaiImg from '../../../app/assets/cities/mumbai.jpg';
import bengaluruImg from '../../../app/assets/cities/bengaluru.jpg';
import hyderabadImg from '../../../app/assets/cities/hyderabad.jpg';
import kolkataImg from '../../../app/assets/cities/kolkata.jpg';
import chandigarhImg from '../../../app/assets/cities/chandigarh.jpg';

const locations = [
  { label: 'Delhi', value: 'DELHI', imageUrl: delhiImg },
  { label: 'Mumbai', value: 'MUMBAI', imageUrl: mumbaiImg },
  { label: 'Bengaluru', value: 'BENGALURU', imageUrl: bengaluruImg },
  { label: 'Hyderabad', value: 'HYDERABAD', imageUrl: hyderabadImg },
  { label: 'Kolkata', value: 'KOLKATA', imageUrl: kolkataImg },
  { label: 'Chandigarh', value: 'CHANDIGARH', imageUrl: chandigarhImg }
];

function CitiesComponent() {
  return (
    <div className="cities-container">
      <h2 className="cities-heading">Featured Locations</h2>
      <div className="cities-grid">
        {locations.map((city) => (
          <div className="city-card" key={city.value}>
            <img src={city.imageUrl} alt={city.label} className="city-image" />
            <div className="city-name">{city.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitiesComponent;

import React, { useState } from 'react';
import './CitiesComponent.scss';
import delhiImg from '../../../app/assets/cities/delhi.jpg';
import mumbaiImg from '../../../app/assets/cities/mumbai.jpg';
import bengaluruImg from '../../../app/assets/cities/bengaluru.jpg';
import hyderabadImg from '../../../app/assets/cities/hyderabad.jpg';
import kolkataImg from '../../../app/assets/cities/kolkata.jpg';
import chandigarhImg from '../../../app/assets/cities/chandigarh.jpg';
import allCitiesImg from '../../../app/assets/cities/all-cities.jpg'; 

const locations = [
  { label: 'Delhi', value: 'DELHI', imageUrl: delhiImg },
  { label: 'Mumbai', value: 'MUMBAI', imageUrl: mumbaiImg },
  { label: 'Bengaluru', value: 'BENGALURU', imageUrl: bengaluruImg },
  { label: 'Hyderabad', value: 'HYDERABAD', imageUrl: hyderabadImg },
  { label: 'Kolkata', value: 'KOLKATA', imageUrl: kolkataImg },
  { label: 'Chandigarh', value: 'CHANDIGARH', imageUrl: chandigarhImg }
];

function CitiesComponent() {
  const [selectedCity, setSelectedCity] = useState('ALL');

  return (
    <div className="cities-container">
      <h2 className="cities-heading">Featured Locations</h2>
      <div className="cities-grid">
        {/* All Cities Card */}
        <div
          className={`city-card all-cities-card ${selectedCity === 'ALL' ? 'selected' : ''}`}
          onClick={() => setSelectedCity('ALL')}
        >
          <img src={allCitiesImg} alt="All Cities" className="city-image" />
          <div className="city-name">All Cities</div>
        </div>

        {/* City Cards */}
        <div className="city-cards-container">
          {locations.map((city) => (
            <div
              className={`city-card ${selectedCity === city.value ? 'selected' : ''}`}
              key={city.value}
              onClick={() => setSelectedCity(city.value)}
            >
              <img src={city.imageUrl} alt={city.label} className="city-image" />
              <div className="city-name">{city.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CitiesComponent;

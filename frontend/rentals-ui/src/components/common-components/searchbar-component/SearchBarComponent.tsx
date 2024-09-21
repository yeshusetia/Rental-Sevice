import React, { useState } from 'react';
import '../searchbar-component/SearchBarComponent.scss' // Ensure you have the correct styles imported
import { useRentals } from '../../../context/RentalContext';

function SearchBarComponent() {
    // Use the context for setting search query and active location
    const { setSearchQuery, setActiveLocation } = useRentals();
    const [localSearchQuery, setLocalSearchQuery] = useState(''); // Local state for search query input
    const [selectedLocation, setSelectedLocation] = useState('ALL'); // Local state for selected location
  
    // Updated locations array with 'All Cities'
    const locations = [
      { label: 'All Cities', value: 'ALL' },
      { label: 'Delhi', value: 'DELHI' },
      { label: 'Mumbai', value: 'MUMBAI' },
      { label: 'Bengaluru', value: 'BENGALURU' },
      { label: 'Hyderabad', value: 'HYDERABAD' },
      { label: 'Kolkata', value: 'KOLKATA' },
      { label: 'Chandigarh', value: 'CHANDIGARH' }
    ];
  
    // Handle the search button click
    const handleSearch = () => {
      setSearchQuery(localSearchQuery); // Set search query in context
      setActiveLocation(selectedLocation); // Set selected location in context
      console.log(`Searching for: ${localSearchQuery} in ${selectedLocation}`);
    };
  
    return (
      <div className="search-bar d-flex">
        <input
          type="text"
          placeholder="Search for cars, houses, and more..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)} // Update local state for search query
          className="search-input" // Optional: Add className for styling
        />
    
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)} // Update local state for location
          className="location-dropdown" // Optional: Add className for styling
        >
          {locations.map((location, index) => (
            <option key={index} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
    
        <button className="search-button" onClick={handleSearch}>
          <span className="search-icon">🔍</span> {/* Optional: Add styling */}
        </button>
      </div>
    );
  }
  

export default SearchBarComponent;

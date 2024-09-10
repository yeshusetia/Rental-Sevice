import React, { useEffect, useState } from 'react';
import DashboarMain from '../components/dashboard-main/DashboarMain';
import { useRentals } from '../context/RentalContext';

function Dashboard() {
  const { rentals, setRentals } = useRentals(); // Get rentals and setter from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRentals = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rentals');
      if (!response.ok) {
        throw new Error('Failed to fetch rentals');
      }
      const data = await response.json();
      setRentals(data); // Update the rentals in the context
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals(); // Fetch rentals when component mounts
  }, []);

  return (
    <div>
      {loading && <p>Loading rentals...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <DashboarMain />} 
    </div>
  );
}

export default Dashboard;

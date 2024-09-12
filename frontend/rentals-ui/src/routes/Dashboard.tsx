import React, { useEffect, useState } from 'react';
import DashboarMain from '../components/dashboard-main/DashboarMain';
import { useRentals } from '../context/RentalContext';
import { useUser } from '../context/UserContext';
function Dashboard() {
  const { rentals, setRentals } = useRentals(); // Get rentals and setter from context
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useUser();
  const [error, setError] = useState('');
  const {rentalUploadedSuccessfully,setRentalUploadedSuccessfully} = useRentals();
  const {activeCategory,setActiveCategory} = useRentals();
  const {activeLocation,setActiveLocation} = useRentals();
  const fetchUserDetails = () =>
  {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Parse the user data and store it in the UserContext

    }


  }

  const fetchRentals = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/rentals?itemType=${activeCategory}&location=${activeLocation}`);
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
    fetchUserDetails();
  }, []);

  useEffect(() => {

    if (rentalUploadedSuccessfully || activeCategory || activeLocation) {
      fetchRentals(); 
      // Reset the rental uploaded flag after fetching, if it's true
      if (rentalUploadedSuccessfully) {
        setRentalUploadedSuccessfully(false);
      }
    }
  }, [rentalUploadedSuccessfully, activeCategory, activeLocation]);

  useEffect(() => {
    if (user) {
      console.log('User Data in rental component:', user);
    }
  }, [user]); // This useEffect runs whenever `user` is updated



  return (
    <div>
      {loading && <p>Loading rentals...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <DashboarMain />} 
    </div>
  );
}

export default Dashboard;

import React, { createContext, useState, useContext } from 'react';

const RentalContext = createContext<any | null>(null);

export const useRentals = () => useContext(RentalContext);

export const RentalProvider = ({ children }: { children: React.ReactNode }) => {
  const [rentals, setRentals] = useState<any[]>([]); // Array to store rentals
  const [rentalUploadedSuccessfully,setRentalUploadedSuccessfully] = useState<any>(false); 
  const [activeCategory,setActiveCategory]=useState<any>('PROPERTY')
  const [activeLocation, setActiveLocation] = useState<any>('ALL');
  const [searchQuery, setSearchQuery] = useState<any>(''); // Add search query state

  return (
    <RentalContext.Provider value={{ rentals, setRentals,rentalUploadedSuccessfully,setRentalUploadedSuccessfully,activeCategory,setActiveCategory,activeLocation,setActiveLocation,  searchQuery,
      setSearchQuery, }}>
      {children}
    </RentalContext.Provider>
  );
};
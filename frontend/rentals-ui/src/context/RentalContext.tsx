import React, { createContext, useState, useContext } from 'react';

const RentalContext = createContext<any | null>(null);

export const useRentals = () => useContext(RentalContext);

export const RentalProvider = ({ children }: { children: React.ReactNode }) => {
  const [rentals, setRentals] = useState<any[]>([]); // Array to store rentals
  const [rentalUploadedSuccessfully,setRentalUploadedSuccessfully] = useState<any>(false); 

  return (
    <RentalContext.Provider value={{ rentals, setRentals,rentalUploadedSuccessfully,setRentalUploadedSuccessfully }}>
      {children}
    </RentalContext.Provider>
  );
};
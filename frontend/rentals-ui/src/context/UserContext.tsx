import React, { createContext, useContext, useState } from 'react';

// Create the context

export const UserContext = createContext<any | null>(null);

export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Here, user information will be managed
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
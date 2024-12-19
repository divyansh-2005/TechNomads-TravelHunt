import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(''); // Username state
  const [totalPoints, setTotalPoints] = useState(10); // Total points state

  return (
    <UserContext.Provider value={{ username, setUsername, totalPoints, setTotalPoints }}>
      {children}
    </UserContext.Provider>
  );
};

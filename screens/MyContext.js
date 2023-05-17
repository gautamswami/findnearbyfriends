import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [screenVisible, setScreenVisible] = useState('login');

  return (
    <MyContext.Provider value={{ screenVisible, setScreenVisible }}>
      {children}
    </MyContext.Provider>
  );
};

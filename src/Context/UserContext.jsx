import React, { createContext, useContext, useEffect, useState } from "react";

// Create a User Context
const UserContext = createContext();

// Helper function to get a specific cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return undefined;
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check cookies on mount
  useEffect(() => {
    const userCookie = getCookie("user"); // Get the 'user' cookie

    // If the 'user' cookie exists, set user state
    if (userCookie) {
      setUser(JSON.parse(userCookie)); // You can store more data if needed
    }
  }, []);

  const logout = () => {
    // Clear cookies and update user state
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear user cookie
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};

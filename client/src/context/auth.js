import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState("hello");

  // taking in data from the user form
  const register = async (userData) => {
    const res = await axios("http://localhost:4000/users", {
      method: "POST",
      data: userData,
    });

    console.log(res);
  };

  const value = {
    loggedInUser,
    setLoggedInUser,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useGlobalContext };

// get the data from the form into register / log in functions
// send the request and set local storage
// if local storage already has token, fetch user data and add to logged in state

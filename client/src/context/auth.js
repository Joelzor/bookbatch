import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // const navigate = useNavigate();

  // taking in data from the user form
  const register = async (userData) => {
    const res = await axios("http://localhost:4000/api/v1/users", {
      method: "POST",
      data: userData,
    });

    if (res?.data?.newUser) {
      return true;
    }
  };

  const userLogin = async (userData) => {
    const { data } = await axios("http://localhost:4000/api/v1/login", {
      method: "POST",
      data: userData,
    });

    console.log(data);
  };

  const value = {
    loggedInUser,
    setLoggedInUser,
    register,
    userLogin,
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

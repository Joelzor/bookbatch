import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");

    if (accessToken && !token) {
      setToken(accessToken);
      const { id } = jwt_decode(accessToken);
      axios(`${baseUrl}/users/${id}`).then((data) => {
        setLoggedInUser(data.data);
      });
    }
  }, [token, baseUrl]);

  // taking in data from the user form
  const register = async (userData) => {
    const res = await axios(`${baseUrl}/users`, {
      method: "POST",
      data: userData,
    });

    if (res?.data?.newUser) {
      return true;
    }
  };

  const userLogin = async (userData) => {
    const { data } = await axios(`${baseUrl}/login`, {
      method: "POST",
      data: userData,
    });

    localStorage.setItem("access-token", data.token);
    setLoggedInUser(data.user);
    setToken(data.token);
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

import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
      axios(`${baseUrl}/users/${id}`)
        .then((data) => {
          setLoggedInUser(data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [token, baseUrl]);

  // taking in data from the user form
  const register = async (userData) => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { status: "fail", message: data.msg };
    }

    return { status: "success", message: "You have registered successfully!" };
  };

  const userLogin = async (userData) => {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { status: "fail", message: data.msg };
    }

    localStorage.setItem("access-token", data.token);
    setLoggedInUser(data.user);
    setToken(data.token);
    return { status: "success", message: "You have logged in successfully!" };
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    setToken(null);
    setLoggedInUser(null);
  };

  const getUser = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`
    );

    const data = await response.json();

    return data;
  };

  const value = {
    loggedInUser,
    setLoggedInUser,
    register,
    userLogin,
    logout,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
  const { token } = useGlobalContext();

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return <div>{children}</div>;
};

export { AuthProvider, useGlobalContext, ProtectedRoute };

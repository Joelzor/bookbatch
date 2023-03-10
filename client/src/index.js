import React from "react";
import ReactDOM from "react-dom/client";
import "bootswatch/dist/minty/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { BatchProvider } from "./context/batch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BatchProvider>
          <App />
        </BatchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

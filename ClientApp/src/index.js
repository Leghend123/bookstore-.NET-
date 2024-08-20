import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { GlobalContextProvider } from "./GlobalContext/GlobalContext";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Find the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <Router>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    <ToastContainer />
  </Router>
);

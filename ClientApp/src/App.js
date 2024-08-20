// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddNewBook from "./components/AddNewBook";
import Books from "./components/Books";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./components/Index";

function App() {
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/Token/validate`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.message == true) {
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, [token, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/add_new_book" element={<AddNewBook />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;

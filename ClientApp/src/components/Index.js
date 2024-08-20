import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { FaUsers } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const Index = () => {
  const [total_books, setTotalBooks] = useState(0);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/Books/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalBooks(response.data.count);
      } catch (error) {
        console.error("Error fetching book count:", error);
      }
    };

    fetchBookCount();
  }, [token]); // Include token as a dependency

  return (
    <div>
      <DashboardLayout>
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-blue-500">
              <div className="flex items-center">
                <FaUsers className="text-3xl text-blue-500 mr-4" />
                <div>
                  <p className="text-2xl font-semibold">{total_books}</p>
                  <p className="text-gray-600">Total Books</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Index;

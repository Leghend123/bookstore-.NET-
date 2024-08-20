// src/components/Dashboard.js
import React, { useEffect, useState } from "react";

import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {
  useEffect(() => {}, []);

  const [books, setBooks] = useState([{ name: "fff", id: "23" }]);

  return (
    <>
      <DashboardLayout>
        <div className="container">
          <h2>Book Store Dashboard</h2>
          
          <ul className="list-group mt-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {book.name}
                <div>
                  <button className="btn btn-warning btn-sm mr-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {  FaHome, FaChartBar, FaUsers } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`w-64 bg-white shadow-md ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Book Store</h2>
        <p className="text-sm text-gray-600"></p>
      </div>
      <nav className="flex-1 p-4">
        <Link
          to="/dashboard"
          className=" py-2.5 px-4 rounded hover:bg-gray-200 flex items-center"
        >
          <FaHome className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/add_new_book"
          className=" py-2.5 px-4 rounded hover:bg-gray-200 flex items-center"
        >
          <FaChartBar className="mr-2" /> Add New Book
        </Link>
        <Link
          to="/books"
          className=" py-2.5 px-4 rounded hover:bg-gray-200 flex items-center"
        >
          <FaUsers className="mr-2" />
          Books
        </Link>
        {/* Add more links here */}
      </nav>
     
    </div>
  );
};

export default Sidebar;

import React, { useState, useContext } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const Header = ({ toggleSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // const {} = useContext(GlobalContext);

  const logoutHandler = () => {
    // Remove the token from cookies
    Cookies.remove("token");
    console.log("Token removed");

    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        <FaBars size="24" />
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <FaBell size="24" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>
        <div className="relative">
          <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
            <FaUserCircle size="24" />
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
              {/* <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link> */}
              <button
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

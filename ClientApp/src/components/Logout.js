import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../GlobalContext/GlobalContext";

const Logout = () => {
  const navigate = useNavigate();

  const { isLoginHandler } = useContext(GlobalStateContext);

  useEffect(() => {
    // Get the token from cookies
    const token = Cookies.get("token");

    if (token) {
      // Remove the token from cookies
      Cookies.remove("token");
      console.log("Token removed:", token);
      isLoginHandler(false);
    }

    // Redirect to login page immediately
    // navigate("/login");
  }, [navigate]);

  // This component does not render anything directly, since the redirect happens immediately
  return null;
};

export default Logout;

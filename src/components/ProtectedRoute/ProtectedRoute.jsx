import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.loginSlice.currentUser);

  const navigate = useNavigate();
  const location = useLocation();

  if (currentUser && location.pathname === "/company/register") {
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;

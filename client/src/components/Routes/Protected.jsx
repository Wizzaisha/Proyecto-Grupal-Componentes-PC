import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const Protected = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  // const auth = JSON.parse(sessionStorage.getItem("user"));

  return auth?.user.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Protected;

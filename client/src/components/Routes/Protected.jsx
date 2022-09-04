import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/authContext"
const Protected = (typeRole) =>
{
  const auth = useAuth()
  const location = useLocation();
  // const auth = JSON.parse(sessionStorage.getItem("user"));
  switch (typeRole)
  {
  case "user": return  auth.user? ( <Outlet />)
  : (<Navigate to={"/signup"} state={{ from: location }} replace/>)

  case "admin": return auth.admin? ( <Outlet /> )
  : auth.user ?
  ( <Navigate to="/unauthorized" state={{ from: location }} replace /> ) 
  : ( <Navigate to="/signup" state={{ from: location }} replace />  );

  case "user-admin":
  if( auth.user || auth.admin ) {return ( <Outlet />)}
  else {return(<Navigate to={"/signup"} state={{ from: location }} replace/>)}

  default: break;
  }
};
export default Protected;
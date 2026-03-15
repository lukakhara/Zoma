import React, { useState } from 'react'
import {Navigate,Outlet} from "react-router-dom";
import ProfileSideNavbar from '../pages/ProfileSideNavbar';

const ProtectedRoute = () => {
    const [isAuthenticated,setisAuthenticated] = useState(false);

  // If not authenticated, redirect to sign-in page

  if (!isAuthenticated) {
    return <Navigate to="/sign-in"  replace />;
  }

  // If authenticated, render the child routes
  <ProfileSideNavbar/>
  return <Outlet />;
};

export default ProtectedRoute;
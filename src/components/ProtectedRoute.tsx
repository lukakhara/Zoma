import React, { useState } from 'react'
import {Navigate,Outlet} from "react-router-dom";
import ProfileSideNavbar from '../pages/ProfileSideNavbar';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth();
 

  // If not authenticated, redirect to sign-in page

  if (!isAuthenticated) {
    return <Navigate to="/sign-in"  replace />;
  }

  // If authenticated, render the child routes
  <ProfileSideNavbar/>
  return <Outlet />;
};

export default ProtectedRoute;
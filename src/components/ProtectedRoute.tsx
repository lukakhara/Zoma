import React, { useState } from 'react'
import {Navigate,Outlet} from "react-router-dom";
import ProfileSideNavbar from '../pages/ProfileSideNavbar';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = () => {
 const { isAuthenticated, isLoading } = useAuth();
 

  // If not authenticated, redirect to sign-in page
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    return <Navigate to="/sign-in"  replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
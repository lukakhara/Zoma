import React from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileSideNavbar from "./ProfileSideNavbar";
import { useAuth } from "../context/AuthProvider";

function Profile() {
  const {user} = useAuth()

  return (
    <div className="min-h-screen  py-8 ">
      <h1 className="text-xl font-bold text-gray-800 mb-6">{user?.firstname}, {user?.lastname}</h1>
      <div className="flex gap-6 ">
        <ProfileSideNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;

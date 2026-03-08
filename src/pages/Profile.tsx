import React from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileSideNavbar from "./ProfileSideNavbar";

function Profile() {
  return (
    <div className="min-h-screen  p-8 ">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Name, Surname</h1>
      <div className="flex gap-6 justify-center ">
        <ProfileSideNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;

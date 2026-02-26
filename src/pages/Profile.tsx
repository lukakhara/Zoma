import React from "react";
import { Link,Outlet } from "react-router-dom";
import ProfileSideNavbar from "./ProfileSideNavbar";

function Profile() {
  return (
    <div className="min-h-screen  p-8 ">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Name, Surname</h1>

        {/* Sidebar */}
      <div className="flex gap-6 justify-center ">
        {/* <aside className="w-52 flex-shrink-0 flex flex-col gap-3">
          <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
            <Link className="px-5 py-3 text-sm font-bold text-gray-900 cursor-pointer hover:bg-[#e6e6e6]"
                to="/Profile">
              Profile
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
                to="/orders">
              My Orders
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
                to="/password-change">
              Change Password
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
            to='/delivery-address'>
              Delivery Address
            </Link>
          </div>

          <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
            Log Out
          </button>
        </aside> */}
        <ProfileSideNavbar/>
        <Outlet/>

        
      </div>
  </div>
  );
}

export default Profile;

import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="min-h-screen  p-8 ">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Name, Surname</h1>

      <div className="flex gap-6 justify-center test">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 flex flex-col gap-3">
          <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
            <Link className="px-5 py-3 text-sm font-bold text-gray-900 cursor-pointer hover:bg-[#e6e6e6]"
                to="Profile">
              Profile
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
                to="MyOrders">
              My Orders
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
                to="/ChangePassword">
              Change Password
            </Link>
            <Link className="px-5 py-3 text-sm text-gray-600 cursor-pointer hover:bg-[#e6e6e6]"
            to='DeliveryAddress'>
              Delivery Address
            </Link>
          </div>

          <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
            Log Out
          </button>
        </aside>

        {/* Form */}
        <div className="flex-1 max-w-md  md:flex flex-col gap-4 hidden">
          {[
            "First Name",
            "Last Name",
            "Phone",
            "Email",
            "Password",
            "Repeat Password",
          ].map((label) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">{label}*</span>
              <input
                readOnly
                placeholder={label}
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>
          ))}

          <button className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

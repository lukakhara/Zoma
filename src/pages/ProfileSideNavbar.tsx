import { NavLink } from "react-router-dom";

const ProfileSideNavbar = () => {
  const linkClass = ({ isActive } : {isActive:boolean}) =>
    `px-5 py-3 text-sm cursor-pointer hover:bg-[#e6e6e6] ${
      isActive ? "font-bold text-gray-900" : "text-gray-600"
    }`;

  return (
    <div className="flex gap-6 justify-center">
      <aside className="w-52 flex-shrink-0 flex flex-col gap-3">
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
          <NavLink className={linkClass} to="/user/profile">
            Profile
          </NavLink>
          <NavLink className={linkClass} to="/user/orders">
            My Orders
          </NavLink>
          <NavLink className={linkClass} to="/user/password-change">
            Change Password
          </NavLink>
          <NavLink className={linkClass} to="/user/delivery-address">
            Delivery Address
          </NavLink>
        </div>
        <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
          Log Out
        </button>
      </aside>
    </div>
  );
};

export default ProfileSideNavbar;
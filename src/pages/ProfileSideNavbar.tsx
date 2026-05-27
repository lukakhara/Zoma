import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProfileSideNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `pl-4 py-3 text-sm cursor-pointer hover:bg-[#e6e6e6] ${
      isActive ? "font-bold text-gray-900" : "text-gray-600"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="flex gap-6 justify-center  ">
      <aside className="md:w-96.25 w-97.5 shrink-0 flex flex-col gap-3 ">
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm ">
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
        <button
          className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium cursor-pointer hover:opacity-90"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </aside>
    </div>
  );
};

export default ProfileSideNavbar;

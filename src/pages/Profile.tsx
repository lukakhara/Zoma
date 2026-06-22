import { Outlet } from "react-router-dom";
import ProfileSideNavbar from "./ProfileSideNavbar";
import { useAuth } from "../context/AuthProvider";
import { Suspense } from "react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-4  py-8 ">
      <h1 className="text-xl font-bold text-gray-800 mb-6 hidden md:block">
        {user?.firstname}, {user?.lastname}
      </h1>
      <div className="flex gap-6 ">
        <ProfileSideNavbar />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Profile;

import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function PasswordChange() {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    setError("");
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // First verify current password
      const response = await fetch(`/api/users?email=${encodeURIComponent(user?.email ?? "")}`);
      const users = await response.json();

      if (users.length === 0) throw new Error("User not found");
      if (users[0].password !== currentPassword) {
        setError("Current password is incorrect");
        return;
      }

      // Update with new password
      const update = await fetch(`/api/users/${user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!update.ok) throw new Error("Failed to update password");

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { label: "Current Password",     value: currentPassword, setter: setCurrentPassword },
    { label: "New Password",         value: newPassword,     setter: setNewPassword     },
    { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword },
  ];

  return (
    <div className="min-h-screen py-6 md:py-14">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Change Password</h1>

      <div className="md:flex md:justify-center md:items-center md:mt-16">
        <div className="w-full md:max-w-xs">
          <p className="text-sm text-gray-400 mb-4">
            Please fill in the information to change password
          </p>

          <div className="flex flex-col gap-4">
            {fields.map(({ label, value, setter }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-sm text-gray-700">{label}*</span>
                <input
                  type="password"
                  value={value}
                  placeholder={label}
                  onChange={(e) => {
                    setter(e.target.value);
                    setError("");
                    setSuccess(false);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
                />
              </div>
            ))}

            {error   && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">Password changed successfully!</p>}

            <button
              onClick={handleChange}
              disabled={isLoading}
              className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
                hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
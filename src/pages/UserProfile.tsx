import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const UserProfile = () => {
  const { user, logout } = useAuth();

  const [firstname, setFirstname] = useState(user?.firstname ?? "");
  const [lastname, setLastname] = useState(user?.lastname ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    if (password && password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const body: Record<string, string> = {
        firstname,
        lastname,
        phone,
        email,
      };
      if (password) body.password = password;

      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setSuccess(true);
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { label: "First Name", value: firstname, setter: setFirstname, type: "text" },
    { label: "Last Name",  value: lastname,  setter: setLastname,  type: "text" },
    { label: "Phone",      value: phone,     setter: setPhone,     type: "tel"  },
    { label: "Email",      value: email,     setter: setEmail,     type: "email"},
    { label: "Password",   value: password,  setter: setPassword,  type: "password" },
    { label: "Repeat Password", value: repeatPassword, setter: setRepeatPassword, type: "password" },
  ];

  return (
    <div className="flex-1 max-w-md md:flex flex-col gap-4 hidden">
      {fields.map(({ label, value, setter, type }) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">{label}*</span>
          <input
            type={type}
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
      {success && <p className="text-green-500 text-sm text-center">Profile updated successfully!</p>}

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
          hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default UserProfile;
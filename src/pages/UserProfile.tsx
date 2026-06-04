import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const {t} = useTranslation();

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
    {
      label: t("firstName"),
      value: firstname,
      setter: setFirstname,
      type: "text",
    },
    { label:  t("lastName"), value: lastname, setter: setLastname, type: "text" },
    { label:  t("phone"), value: phone, setter: setPhone, type: "tel" },
    { label:  t("email"), value: email, setter: setEmail, type: "email" },
    {
      label:  t("password"),
      value: password,
      setter: setPassword,
      type: "password",
    },
    {
      label:  t("repeatPassword"),
      value: repeatPassword,
      setter: setRepeatPassword,
      type: "password",
    },
  ];

  return (
    <div className="flex-1 max-w-full  md:flex     flex-col  px-5 md:px-0 ">
      <h1 className="text-[26px] text-[#1A1A1A] font-helvetocaMedium leading-[100%] pb-4 block md:hidden">
       {t("profile")}
      </h1>
      <ul className="flex flex-col gap-4 pb-5  ">
        {fields.map(({ label, value, setter, type }) => (
          <li key={label} className="flex flex-col  gap-2 ">
            <span className="text-sm text-[#797979]">{label}*</span>
            <input
              type={type}
              value={value}
              placeholder={label}
              onChange={(e) => {
                setter(e.target.value);
                setError("");
                setSuccess(false);
              }}
              className="w-full md:w-[75%] lg:w-1/2 px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
            />
          </li>
        ))}
      </ul>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">
          Profile updated successfully!
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full md:w-1/2 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
          hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity
          "
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default UserProfile;

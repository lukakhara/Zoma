import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import { getCsrfToken } from "../lib/csrf";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
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

    if (!user?.id) {
      setError("You must be logged in to update your profile.");
      return;
    }

    // client-side pre-checks mirroring the backend schema, so the
    // most common mistakes get a clear message before hitting the network
    if (firstname.trim().length < 1) {
      setError("First name is required.");
      return;
    }
    if (lastname.trim().length < 1) {
      setError("Last name is required.");
      return;
    }
    if (phone.trim().length < 5) {
      setError("Phone number must be at least 5 characters.");
      return;
    }
    if (password) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== repeatPassword) {
        setError("Passwords don't match");
        return;
      }
    }

    setIsLoading(true);
    try {
      const body: Record<string, string> = { firstname, lastname, phone, email };
      if (password) body.password = password;

      const token = await getCsrfToken();
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": token,
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        // surface the backend's field-level details if present, otherwise the generic error
        const detailMsg = data.details
          ? Object.values(data.details).flat().join(" ")
          : data.error;
        throw new Error(detailMsg || "Failed to update profile");
      }

      setUser(data);
      setSuccess(true);
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      label: t("firstName"),
      hint: "Required.",
      value: firstname,
      setter: setFirstname,
      type: "text",
    },
    {
      label: t("lastName"),
      hint: "Required.",
      value: lastname,
      setter: setLastname,
      type: "text",
    },
    {
      label: t("phone"),
      hint: "At least 5 characters.",
      value: phone,
      setter: setPhone,
      type: "tel",
    },
    {
      label: t("email"),
      hint: "Must be a valid email address, e.g. name@example.com.",
      value: email,
      setter: setEmail,
      type: "email",
    },
    {
      label: t("password"),
      hint: "Leave blank to keep your current password. At least 8 characters if changing it.",
      value: password,
      setter: setPassword,
      type: "password",
    },
    {
      label: t("repeatPassword"),
      hint: "Must match the password above.",
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
        {fields.map(({ label, hint, value, setter, type }) => (
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
            <span className="text-xs text-[#a0a0a0]">{hint}</span>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">
          {t("profileUpdatedSuccessfully")}
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
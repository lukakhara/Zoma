import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

export default function PasswordChange() {
  const { user } = useAuth();
  const { t } = useTranslation();

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
      setError(t("pleaseFillInAllFields"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("newPasswordsDontMatch"));
      return;
    }
    if (newPassword.length < 6) {
      setError(t("newPasswordMustBeAtLeast6Characters"));
      return;
    }

    setIsLoading(true);
    try {
      // First verify current password
      const response = await fetch(
        `/api/users?email=${encodeURIComponent(user?.email ?? "")}`,
      );
      const users = await response.json();

      if (users.length === 0) throw new Error(t("UserNotFound"));
      if (users[0].password !== currentPassword) {
        setError(t("CurrentPasswordIsIncorrect"));
        return;
      }

      // Update with new password
      const update = await fetch(`/api/users/${user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!update.ok) throw new Error(t("FailedToUpdatePassword"));

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(t("FailedToChangePasswordPleaseTryAgain"));
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      label: t("currentPassword"),
      value: currentPassword,
      setter: setCurrentPassword,
    },
    { label: t("newPassword"), value: newPassword, setter: setNewPassword },
    {
      label: t("confirmNewPassword"),
      value: confirmPassword,
      setter: setConfirmPassword,
    },
  ];

  return (
    <div className="min-h-screen w-full ">
      <div className="md:flex md:justify-start md:items-center px-5 md:px-0 md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1  md:hidden">
          {t("changePassword")}
        </h1>
        <div className="flex-1 max-w-full block md:flex md:max-w-[75%%]  flex-col  px-5 md:px-0 ">
          <p className="text-sm text-gray-400 mb-4">
            {t("PleaseFillInTheInformationToChangePassword")}
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

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">
                {t("PasswordChangedSuccessfully")}
              </p>
            )}

            <button
              onClick={handleChange}
              disabled={isLoading}
              className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
                hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? t("Changing") : t("changePassword")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";
import { getCsrfToken } from "../lib/csrf";

function AddressForm({ title }: { title: string }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [city, setCity] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    const token = await getCsrfToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-csrf-token": token,},
         credentials: "include",
        body: JSON.stringify({
          user_id: user?.id,
          city,
          full_address: fullAddress,
          zip_code: zipCode,
        })
      });

      if (!response.ok) throw new Error('Failed to save address');

    } catch (err) {
      setError('Failed to save address');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { label: t("city"), placeholder: "City", required: false, value: city, onChange: setCity },
    { label: t("fullAddress"), placeholder: "Full Address", required: true, value: fullAddress, onChange: setFullAddress },
    { label: t("zipCode"), placeholder: "Zip Code", required: true, value: zipCode, onChange: setZipCode },
  ];

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <h1 className="text-2xl font-bold text-gray-900 md:hidden">{title}</h1>
      )}
      {fields.map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">
            {f.label}{f.required && "*"}
          </span>
          <input
            placeholder={f.placeholder}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium disabled:opacity-60"
      >
        {isLoading ? t("saving") : t("save")}
      </button>
    </div>
  );
}

export default AddressForm;
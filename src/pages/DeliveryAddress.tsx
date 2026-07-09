import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import editIcon from '/public/assets/Vector.png'

interface Address {
  id: string;
  user_id: string;
  city: string;
  full_address: string;
  zip: string;
}

const API = import.meta.env.VITE_API_URL;

const AddressForm = ({
  initial,
  onSave,
  isLoading,
}: {
  initial?: Address;
  onSave: (city: string, fullAddress: string, zip: string) => void;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();
  const [city, setCity] = useState(initial?.city ?? "");
  const [fullAddress, setFullAddress] = useState(initial?.full_address ?? "");
  const [zip, setZip] = useState(initial?.zip ?? "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!fullAddress.trim() || !zip.trim()) {
      setError(t("pleaseFillInAllRequiredFields"));
      return;
    }
    setError("");
    onSave(city, fullAddress, zip);
  };

  return (
    <div className="flex flex-col gap-4">
      {[
        {
          label: t("city"),
          value: city,
          setter: setCity,
          required: false,
          placeholder: "City",
        },
        {
          label: t("fullAddress"),
          value: fullAddress,
          setter: setFullAddress,
          required: true,
          placeholder: "Full Address",
        },
        {
          label: t("zipCode"),
          value: zip,
          setter: setZip,
          required: true,
          placeholder: "Zip Code",
        },
      ].map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <span className="text-sm text-[#797979]">
            {f.label}
            {f.required && "*"}
          </span>
          <input
            value={f.value}
            placeholder={f.placeholder}
            onChange={(e) => {
              f.setter(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity "
      >
        {isLoading ? t("saving") : t("save")}
      </button>
    </div>
  );
};

export default function DeliveryAddress() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.id) fetchAddresses();
  }, [user?.id]);

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${API}/api/addresses`, {
        credentials: "include", // sends the auth cookie — no user_id param needed anymore
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchAddresses failed:", err);
    }
  };

  const handleSave = async (city: string, fullAddress: string, zip: string) => {
    setIsLoading(true);
    try {
      if (editingAddress) {
        const res = await fetch(`${API}/api/addresses/${editingAddress.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            city,
            full_address: fullAddress,
            zip,
          }),
        });
        if (!res.ok) throw new Error("Failed to update address");
        setSuccess(t("addressUpdatedSuccessfully"));
      } else {
        const res = await fetch(`${API}/api/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // no user_id in body — backend derives it from the auth cookie
          body: JSON.stringify({
            city,
            full_address: fullAddress,
            zip,
          }),
        });
        if (!res.ok) throw new Error("Failed to create address");
        setSuccess(t("addressAddedSuccessfully"));
      }

      await fetchAddresses();
      setEditingAddress(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("handleSave failed:", err);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete address");
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("handleDelete failed:", err);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
  };

  const AddressList = () => (
    <div className="flex flex-col gap-3">
      {addresses.map((a) => (
        <div
          key={a.id}
          className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm"
        >
          <span className="text-sm text-gray-700">
            {[a.city, a.full_address, a.zip].filter(Boolean).join(", ")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(a)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <img src={editIcon} alt="edit icon" />
            </button>
            <button
              onClick={() => handleDelete(a.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-200"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-6 md:py-14 w-full">
      {/* Mobile */}
      <div className="md:hidden flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">
          {t("deliveryAddress")}
        </h1>
        {success && (
          <p className="text-green-500 text-sm text-center mb-3">{success}</p>
        )}
        <AddressForm
          initial={editingAddress ?? undefined}
          onSave={handleSave}
          isLoading={isLoading}
        />
        <AddressList />
        <button
          onClick={() => setEditingAddress(null)}
          className="mt-3 w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">⊕</span>
          {t("addNewAddress")}
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex-1 max-w-md flex flex-col gap-4">
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <AddressForm
            initial={editingAddress ?? undefined}
            onSave={handleSave}
            isLoading={isLoading}
          />
          <AddressList />
          {addresses.length > 0 && (
            <button
              onClick={() => setEditingAddress(null)}
              className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <span className="text-lg leading-none">⊕</span>
              {t("addNewAddress")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
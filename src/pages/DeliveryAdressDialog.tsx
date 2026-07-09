import { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { dividerClasses } from "@mui/material/Divider";

interface Address {
  id: number;
  city: string;
  full_address: string;
  zip: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAddressConfirmed: (addressId: number) => void;
}

const DeliveryAdressDialog = ({ open, onClose, onAddressConfirmed }: Props) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newzip, setNewZip] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchAddresses = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/addresses`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.addresses ?? []);
        setAddresses(list);
        if (list.length > 0 && selectedId == null) setSelectedId(list[0].id);
      })
      .catch((err) => {
        console.error("fetchAddresses failed:", err); // <-- log this and check your console
        setError("Could not load addresses.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!open) return;
    fetchAddresses();
    // reset transient UI state each time dialog opens
    setShowAddForm(false);
    setNewCity("");
    setNewAddress("");
    setNewZip("");
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleSaveNewAddress = async () => {
    if (!newCity.trim() || !newAddress.trim() || !newzip.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          city: newCity,
          full_address: newAddress,
          zip: newzip,
        }),
      });
      if (!res.ok) throw new Error("Failed to save address");
      const created: Address = await res.json();
      setAddresses((prev) => [...prev, created]);
      setSelectedId(created.id);
      setShowAddForm(false);
      setNewCity("");
      setNewAddress("");
      setNewZip("");
    } catch (err) {
      console.error("handleSaveNewAddress failed:", err);
      setError("Could not save the new address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[90%] bg-white rounded-lg shadow-xl p-8 md:w-full max-w-md flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Delivery Address</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading addresses...</p>
        ) : (
          <div>
            <h3>Your Addresses:</h3>
            {addresses.length === 0 && !showAddForm && (
              <p className="text-gray-500 text-sm">No saved addresses yet.</p>
            )}
            <RadioGroup
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(Number(e.target.value))}
            >
              {addresses.length <= 0 ? (
                <div className="text-gray-500">
                  you havn't added adresses yet
                </div>
              ) : (
                addresses.map((address) => (
                  <FormControlLabel
                    key={address.id}
                    value={address.city}
                    control={<Radio />}
                    label={`${address.city} - ${address.full_address}`}
                  />
                ))
              )}
            </RadioGroup>
          </div>
        )}

        {showAddForm ? (
          <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-3 ">
            <input
              type="text"
              placeholder="City (Tbilisi,Kutaisi)"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Full address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Zip code"
              value={newzip}
              onChange={(e) => setNewZip(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNewAddress}
                disabled={saving}
                className="flex-1 bg-blue-500 text-white rounded-md py-2 text-sm cursor-pointer hover:opacity-80 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                disabled={saving}
                className="flex-1 border rounded-md py-2 text-sm cursor-pointer hover:bg-gray-50 "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="text-blue-500 text-center cursor-pointer"
          >
            add new Address
          </button>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={selectedId == null}
          onClick={() => {
            if (selectedId != null) onAddressConfirmed(selectedId);
          }}
          className="bg-blue-500 text-white rounded-md text-xl py-2 cursor-pointer hover:opacity-80 disabled:opacity-50"
        >
          Confirm Address
        </button>
      </div>
    </div>
  );
};

export default DeliveryAdressDialog;

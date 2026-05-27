import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

interface Address {
  id: string;
  userId: string;
  city: string;
  fullAddress: string;
  zipCode: string;
}

const AddressForm = ({
  initial,
  onSave,
  isLoading,
}: {
  initial?: Address;
  onSave: (city: string, fullAddress: string, zipCode: string) => void;
  isLoading: boolean;
}) => {
  const [city, setCity] = useState(initial?.city ?? "");
  const [fullAddress, setFullAddress] = useState(initial?.fullAddress ?? "");
  const [zipCode, setZipCode] = useState(initial?.zipCode ?? "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!fullAddress.trim() || !zipCode.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    onSave(city, fullAddress, zipCode);
  };

  return (
    <div className="flex flex-col gap-4">
      {[
        { label: "City",         value: city,        setter: setCity,        required: false, placeholder: "City"         },
        { label: "Full Address", value: fullAddress, setter: setFullAddress, required: true,  placeholder: "Full Address" },
        { label: "Zip Code",     value: zipCode,     setter: setZipCode,     required: true,  placeholder: "Zip Code"     },
      ].map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">{f.label}{f.required && "*"}</span>
          <input
            value={f.value}
            placeholder={f.placeholder}
            onChange={(e) => { f.setter(e.target.value); setError(""); }}
            className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
          />
        </div>
      ))}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex gap-2">
       
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
            hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default function DeliveryAddress() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.id) fetchAddresses();
  }, [user?.id]);

  const fetchAddresses = async () => {
    const res = await fetch(`/api/addresses?userId=${user?.id}`);
    const data = await res.json();
    setAddresses(data);
  };

  const handleSave = async (city: string, fullAddress: string, zipCode: string) => {
    setIsLoading(true);
    try {
      if (editingAddress) {
        // Update existing
        const res = await fetch(`/api/addresses/${editingAddress.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, fullAddress, zipCode }),
        });
        if (!res.ok) throw new Error();
        setSuccess("Address updated successfully!");
      } else {
        // Add new
        const res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Date.now().toString(),
            userId: user?.id,
            city,
            fullAddress,
            zipCode,
          }),
        });
        if (!res.ok) throw new Error();
        setSuccess("Address added successfully!");
      }
      await fetchAddresses();
      setShowForm(false);
      setEditingAddress(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      // error handled in form
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };


  const AddressList = () => (
    <div className="flex flex-col gap-3">
      {addresses.map((a) => (
        <div key={a.id} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm">
          <span className="text-sm text-gray-700">
            {[a.city, a.fullAddress, a.zipCode].filter(Boolean).join(", ")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(a)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >✏️</button>
            <button
              onClick={() => handleDelete(a.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-200"
            >🗑</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-6 md:py-14">
      {/* Mobile */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Delivery Address</h1>

        {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

       
          <AddressForm
            initial={editingAddress ?? undefined}
            onSave={handleSave}
           
            isLoading={isLoading}
          />
      
         
            <AddressList />
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <span className="text-lg leading-none">⊕</span> Add new Address
            </button>
         
       
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex-1 max-w-md flex flex-col gap-4">
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

      
            <AddressForm
              initial={editingAddress ?? undefined}
              onSave={handleSave}
           
              isLoading={isLoading}
            />
          
            
              <AddressList />
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <span className="text-lg leading-none">⊕</span> Add new Address
              </button>
            
        </div>
      </div>
    </div>
  );
}
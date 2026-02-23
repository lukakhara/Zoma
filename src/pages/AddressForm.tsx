import { useState } from "react";

const menuItems = ["Profile", "My Orders", "Change Password", "Delivery Address"];

function AddressForm({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4">
      {title && <h1 className="text-2xl font-bold text-gray-900 md:hidden">{title}</h1>}
      {[
        { label: "City", placeholder: "City", required: false },
        { label: "Full Address", placeholder: "Full Address", required: true },
        { label: "Zip Code", placeholder: "Zip Code", required: true },
      ].map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">
            {f.label}{f.required && "*"}
          </span>
          <input
            readOnly
            placeholder={f.placeholder}
            className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
          />
        </div>
      ))}
      <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
        Save
      </button>
    </div>
  );
}

export default AddressForm;
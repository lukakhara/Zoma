const menuItems = ["Profile", "My Orders", "Change Password", "Delivery Address"];

export default function DeliveryAddress() {
  return (
    <div className="min-h-screen  p-6 md:p-8">

      {/* ── MOBILE ── */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Delivery Address</h1>

        <div className="flex flex-col gap-4">
          {[
            { label: "City", placeholder: "City", required: false },
            { label: "Full Address", placeholder: "Full Address", required: true },
            { label: "Zip Code", placeholder: "Zip Code", required: true },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">{f.label}{f.required && "*"}</span>
              <input readOnly placeholder={f.placeholder} className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none" />
            </div>
          ))}
          <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">Save</button>
        </div>

        <div className="mt-6 flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm">
          <span className="text-sm text-gray-700">City/Village, Address #13, 0180</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500">✏️</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-400">🗑</button>
          </div>
        </div>

        <button className="mt-3 w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2">
          <span className="text-lg leading-none">⊕</span> Add new Address
        </button>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Name, Surname</h1>

        <div className="flex gap-6 items-start justify-center">
          <aside className="w-52 flex-shrink-0 flex flex-col gap-3">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {menuItems.map((item) => (
                <div key={item} className={`px-5 py-3 text-sm ${item === "Delivery Address" ? "font-bold text-gray-900" : "text-gray-600"}`}>
                  {item}
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">Log Out</button>
          </aside>

          <div className="flex-1 max-w-md flex flex-col gap-4">
            {[
              { label: "City", placeholder: "City", required: false },
              { label: "Full Address", placeholder: "Full Address", required: true },
              { label: "Zip Code", placeholder: "Zip Code", required: true },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="text-sm text-gray-700">{f.label}{f.required && "*"}</span>
                <input readOnly placeholder={f.placeholder} className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none" />
              </div>
            ))}
            <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">Save</button>

            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm mt-2">
              <span className="text-sm text-gray-700">City/Village, Address #13, 0180</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500">✏️</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-400">🗑</button>
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium flex items-center justify-center gap-2">
              <span className="text-lg leading-none">⊕</span> Add new Address
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
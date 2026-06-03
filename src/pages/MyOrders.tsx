import { getOrders, type Order } from "../services/orderService";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const statusLabel: Record<Order["status"], string> = {
  pending: "Pending",
  confirmed: "Is Being Delivered",
  delivered: "Delivered",
};

const statusColor: Record<Order["status"], string> = {
  pending: "bg-gray-200 text-gray-700",
  confirmed: "bg-yellow-300 text-gray-900",
  delivered: "bg-green-200 text-green-900",
};

export default function MyOrders() {
  const orders = getOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen py-4 md:py-8 flex items-center justify-center">
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 md:py-8 flex flex-col gap-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* ── DESKTOP ── */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 border-b border-[#C3C3C3]">
              {["Order Number", "Date", "Quantity", "Price", "Status"].map((h) => (
                <div key={h} className="border-r border-[#EEEEEE] px-6 py-4 text-sm font-semibold text-gray-800 text-center">
                  {h}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 border-b border-[#C3C3C3]">
              <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                #{order.id.slice(0, 8).toUpperCase()}
              </div>
              <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                {formatDate(order.date)}
              </div>
              <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                {order.items.length} product{order.items.length !== 1 ? "s" : ""}
              </div>
              <div className="px-6 py-4 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                {order.total.toFixed(2)} ₾
              </div>
              <div className="px-6 py-4 text-center">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusColor[order.status]}`}>
                  {statusLabel[order.status]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5">
              {["Image", "Product", "Quantity", "Price", "Total"].map((h) => (
                <div key={h} className="px-6 py-3 text-sm font-semibold text-gray-800 text-center border-r border-[#EEEEEE]">
                  {h}
                </div>
              ))}
            </div>

            {order.items.map((item, i) => (
              <div key={i} className="grid grid-cols-5 items-center border-t border-[#EEEEEE]">
                <div className="px-6 py-5 flex justify-center border-r border-[#EEEEEE]">
                  <img src={item.image} alt={item.name} className="w-[54px] h-[54px] object-cover" />
                </div>
                <div className="px-6 py-5 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                  {item.name} {item.label && `(${item.label})`}
                </div>
                <div className="px-6 py-5 text-sm text-gray-700 text-center border-r border-[#EEEEEE]">
                  {item.quantity}
                </div>
                <div className="px-6 py-5 text-sm text-center border-r border-[#EEEEEE] flex flex-col items-center">
                  <span className="line-through text-gray-400">{item.price.toFixed(2)} ₾</span>
                  <span className="text-gray-700">{item.finalPrice.toFixed(2)} ₾</span>
                </div>
                <div className="px-6 py-5 text-sm text-gray-700 text-center">
                  {(item.finalPrice * item.quantity).toFixed(2)} ₾
                </div>
              </div>
            ))}
          </div>

          {/* ── MOBILE ── */}
          <div className="md:hidden">
            {[
              { label: "Order Number", value: `#${order.id.slice(0, 8).toUpperCase()}` },
              { label: "Date", value: formatDate(order.date) },
              { label: "Quantity", value: `${order.items.length} product${order.items.length !== 1 ? "s" : ""}` },
              { label: "Price", value: `${order.total.toFixed(2)} ₾` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-800">{row.label}</span>
                <span className="text-sm text-gray-700">{row.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-800">Status</span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusColor[order.status]}`}>
                {statusLabel[order.status]}
              </span>
            </div>

            {order.items.map((item, i) => (
              <div key={i} className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-start px-5 py-4 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Image</span>
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                </div>
                <div className="flex justify-between items-start px-5 py-3.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Product</span>
                  <span className="text-sm text-gray-700 text-right max-w-[55%]">
                    {item.name} {item.label && `(${item.label})`}
                  </span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Quantity</span>
                  <span className="text-sm text-gray-700">{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Price</span>
                  <div className="flex gap-2 text-sm">
                    <span className="line-through text-gray-400">{item.price.toFixed(2)} ₾</span>
                    <span className="text-gray-700">{item.finalPrice.toFixed(2)} ₾</span>
                  </div>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-sm font-semibold text-gray-800">Total</span>
                  <span className="text-sm text-gray-700">{(item.finalPrice * item.quantity).toFixed(2)} ₾</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
export default function TransactionSuccessful() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="flex flex-col items-center gap-3">

        {/* Green shopping bag icon with checkmark */}
        <div className="relative w-14 h-14">
          {/* Bag body */}
          <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
            {/* Handle */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-3 border-2 border-green-500 border-b-0 rounded-t-full bg-transparent" style={{background:'transparent'}} />
            <span className="text-white text-xl">✓</span>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-bold text-gray-900">Transaction Successful</p>
          <p className="text-sm text-gray-400">Order Number #123456</p>
        </div>

        {/* Button */}
        <button className="w-64 py-2.5 rounded-lg bg-[#2f4a9c] text-white text-sm font-medium">
          My Orders
        </button>

      </div>
    </div>
  );
}
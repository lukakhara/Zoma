export default function TransactionFailed() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="flex flex-col items-center gap-3">

        {/* Red X icon */}
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xl font-bold">✕</span>
        </div>

        {/* Message */}
        <p className="text-base font-medium text-gray-800">Transaction Failed</p>

        {/* Button */}
        <button className="w-64 py-2.5 rounded-lg bg-[#2f4a9c] text-white text-sm font-medium">
          Back to Cart
        </button>

      </div>
    </div>
  );
}
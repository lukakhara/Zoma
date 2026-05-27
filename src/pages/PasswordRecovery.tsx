export default function PasswordRecovery() {
  const email = "";

  return (
    <div className="min-h-screen py-6 md:py-8   ">
      {/* Title — top left on both */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1 ">
        Password Recovery
      </h1>

      {/* Desktop: centered form | Mobile: full width below title */}
      <div className="md:flex md:justify-center md:items-center md:mt-16">
        <div className="w-full md:max-w-xs">
          {/* <p className="text-sm text-gray-400 mb-4">
            Please fill in the information to recover password
          </p> */}

          <div className="flex flex-col gap-4">
            <div key={email} className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">email*</span>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* Button: full width on mobile, full width on desktop too */}
            <button className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium cursor-pointer hover:opacity-90">
              Password Recovery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

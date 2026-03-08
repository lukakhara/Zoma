import React from 'react'

const UserProfile = () => {
  return (
    // Form
        <div className="flex-1 max-w-md  md:flex flex-col gap-4 hidden">
          {[
            "First Name",
            "Last Name",
            "Phone",
            "Email",
            "Password",
            "Repeat Password",
          ].map((label) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">{label}*</span>
              <input
             
                placeholder={label}
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>
          ))}

          <button className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
            Save
          </button>
        </div> 
  )
}

export default UserProfile
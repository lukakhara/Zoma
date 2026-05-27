// import { useState } from "react";

// const SignIn = () => {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   return (
//     <>
//       <div className="flex flex-col justify-center px-5 ">
//         <h1>Sign in</h1>
//         <div>
//           <h2>E-mail*</h2>
//           <input
//             className="bg-white w-full p-2 rounded-md "
//             placeholder="E-mail"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <div className="flex justify-between">
//             <h2>Password*</h2>
//             <h2>Forgot Yout Password?</h2>
//           </div>

//           <input
//             className="bg-white w-full p-2 rounded-md "
//             placeholder="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button className="bg-blue-50 text-white">Sign in</button>
//         <p className="text-center">if you are not registered, register now</p>
//       </div>
//     </>
//   );
// };

// export default SignIn;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signIn = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        await login(email, password);
        navigate("/", { replace: true });
      } catch (error) {
        setError("Invalid email or password");
      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-8  ">
      <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>

      {/* Desktop: centered | Mobile: full width below title */}
      <div className="md:flex md:justify-center md:items-center md:mt-16">
        <div className="w-full md:max-w-sm mt-6  ">
          <form
            className=" flex flex-col gap-4 "
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">E-mail*</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Password*</span>
                <span className="text-sm text-gray-400 cursor-pointer">
                  Forgot Your Password?
                </span>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer hover:opacity-90 py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium active:bg-black"
            >
              Sign in
            </button>
          </form>
          {/* Register link */}
          <p className="text-center text-sm text-gray-400">
            If you are not registered,{" "}
            <Link
              className="font-semibold text-gray-600 cursor-pointer"
              to="/registration"
            >
              register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState("luka@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) setError("");
  };

  const signIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/user/profile", { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>

      <div className="md:flex md:justify-center md:items-center md:mt-16">
        <div className="w-full md:max-w-sm mt-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); signIn(); }}
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">E-mail*</span>
              <input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                placeholder="E-mail"
                className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Password*</span>
                <Link to="/password-recovery" className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                  Forgot Your Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange(setPassword)}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-11 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.96 9.96 0 015.657 1.757M15 12a3 3 0 01-4.875 2.337M3 3l18 18" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
                hover:opacity-90 active:bg-black cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            If you are not registered,{" "}
            <Link className="font-semibold text-gray-600 hover:text-gray-900" to="/registration">
              register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
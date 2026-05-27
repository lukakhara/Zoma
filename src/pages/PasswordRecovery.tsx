import { useState } from "react";
import { Link } from "react-router-dom";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRecovery = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      const users = await res.json();

      // Always show success regardless of whether email exists
      // (security best practice — don't reveal which emails are registered)
      if (users.length === 0) {
        setSubmitted(true);
        return;
      }

      // In a real app you'd send an email here.
      // With json-server we just simulate success.
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-14 test">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Password Recovery
      </h1>

      <div className="md:flex md:justify-center md:items-center md:mt-16">
        <div className="w-full md:max-w-xs">

          {submitted ? (
            // ── Success state ──
            <div className="flex flex-col gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
                ✉️
              </div>
              <p className="text-gray-700 text-sm">
                If <span className="font-medium text-gray-900">{email}</span> is
                registered, you'll receive password reset instructions shortly.
              </p>
              <p className="text-xs text-gray-400">
                Didn't receive anything? Check your spam folder or try again.
              </p>
              <button
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="w-full py-3 mt-1 rounded-2xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Try a different email
              </button>
              <Link
                to="/sign-in"
                className="text-sm text-[#2f4a9c] font-medium hover:opacity-80"
              >
                Back to Sign in
              </Link>
            </div>
          ) : (
            // ── Form state ──
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">
                Enter your registered email and we'll send you instructions to
                reset your password.
              </p>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-700">Email*</span>
                <input
                  type="email"
                  value={email}
                  placeholder="E-mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleRecovery()}
                  className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleRecovery}
                disabled={isLoading}
                className="w-full py-3 mt-1 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium
                  cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {isLoading ? "Sending..." : "Recover Password"}
              </button>

              <Link
                to="/sign-in"
                className="text-center text-sm text-gray-400 hover:text-gray-600"
              >
                Back to Sign in
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
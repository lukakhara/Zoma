import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { register } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim() !== repeatPassword.trim()) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    await register(firstName, lastName, phone, email, password);
  }

  return (
    <>
      <div className="mt-14 mb-37  flex-1 shrink-0  justify-center flex flex-col gap-4">
        <h1 className="text-[26px] text-[#1A1A1A]    w-full">Registration</h1>
        <form
          onSubmit={handleSubmit}
          className="grid xl:gap-14 gap-4   grid-cols-1 gap-9.75 xl:gap-x-5 xl:gap-y-4  md:grid-cols-2 lg:grid-cols-3 align-items-center
        "
        >
          <div className="">
            <label htmlFor="firstName" className="text-[#797979] text-sm">
              First Name*
            </label>
            <input
              id="firstName"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="">
            <label htmlFor="lastName" className="text-[#797979] text-sm">
              Last Name*
            </label>
            <input
              id="lastName"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-[#797979] text-sm">
              Phone*
            </label>
            <input
              id="phone"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-[#797979] text-sm">
              Email*
            </label>
            <input
              id="email"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex  justify-between items-center">
              <label htmlFor="password" className="text-[#797979] text-sm">
                Password*
              </label>
             {passwordError ? <p className="text-red-500 ">passwords arn't same </p> : ''} 
            </div>

            <input
              id="password"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="">
            <div className="flex  justify-between items-center">
              <label
                htmlFor="repeatPassword"
                className="text-[#797979] text-sm"
              >
                Repeat Password*
              </label>
              {passwordError ?<p className="text-red-500">passwords arn't same </p> : ''}
            </div>

            <input
              id="repeatPassword"
              className="bg-white w-full p-4 rounded-[10px]"
              placeholder="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          <div className=" gap-5  grid place-items-center xl:col-start-2C xl:col-end-3 ">
            <label className="terms-toggle">
              <input type="checkbox" id="terms" />
              <span className="radio-visual"></span>
              <p>Please agree to terms & conditions</p>
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded-[10px] mt-4 hover:bg-blue-600 w-full "
              onSubmit={handleSubmit}
            >
              Register
            </button>
            <p>
              Already registered?
              <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;

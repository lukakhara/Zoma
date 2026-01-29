import { useState } from "react";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleSubmit() {
    password.trim();
    repeatPassword.trim();
    if (password !== repeatPassword) {
        return window.alert('passwords arent same');
    }
  }

  return (
    <>
      <div className="px-5">
        <h1 className="text-[26px] text-[#1A1A1A]">Registration</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
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

          <div>
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
              <label
                htmlFor="password"
                className="text-[#797979] text-sm"
              >
                Password*
              </label>
              <p className="text-red-500 ">passwords arn't same </p>
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

          <div>
            <div className="flex  justify-between items-center">
              <label
                htmlFor="repeatPassword"
                className="text-[#797979] text-sm"
              >
                Repeat Password*
              </label>
              <p className="text-red-500">passwords arn't same </p>
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

          <button
            type="submit"
            className="bg-blue-500 text-white p-4 rounded-[10px] mt-4 hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;

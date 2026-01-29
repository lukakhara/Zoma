import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
    

  return (
    <>
      <div className="test flex flex-col justify-center px-5 ">
        <h1>Sign in</h1>
        <div>
          <h2>E-mail*</h2>
          <input
            className="bg-white w-full p-2 rounded-md "
            placeholder="E-mail"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h2>Password*</h2>
            <h2>Forgot Yout Password?</h2>
          </div>

          <input
            className="bg-white w-full p-2 rounded-md "
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-50 text-white"
                >Sign in</button>
        <p className="text-center">if you are not registered, register now</p>
      </div>
    </>
  );
};

export default SignIn;

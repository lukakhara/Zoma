import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const {t} = useTranslation();

  const [firstName, setFirstName] = useState("luka");
  const [lastName, setLastName] = useState("xara");
  const [phone, setPhone] = useState("123");
  const [email, setEmail] = useState("luka@gmail.com");
  const [password, setPassword] = useState("123");
  const [repeatPassword, setRepeatPassword] = useState("123");
  const [passwordError, setPasswordError] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim() !== repeatPassword.trim()) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    await register(firstName, lastName, phone, email, password);
    navigate("/sign-in");   
  }

  return (
    <>
      <div className="mt-14 mb-37  flex-1 shrink-0  justify-center flex flex-col gap-4">
        <h1 className="text-[26px] text-[#1A1A1A] w-full">{t('registration')}</h1>
        <form
          onSubmit={handleSubmit}
          className="grid xl:gap-14 gap-4   grid-cols-1 gap-9.75 xl:gap-x-5 xl:gap-y-4  md:grid-cols-2 lg:grid-cols-3 align-items-center
        "
        >
          <div className="">
            <label htmlFor="firstName" className="text-[#797979] text-sm">
              {t('firstName')}*
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
              {t('lastName')}*
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
              {t('phone')}*
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
            {t('email')}*
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
               {t('password')}*
              </label>
             {passwordError ? <p className="text-red-500 ">{t('passwordsArntSame')}  </p> : ''} 
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
              {t('repeatPassword')}*
              </label>
              {passwordError ?<p className="text-red-500"> {t('passwordsArntSame')} </p> : ''}
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

          <div className=" gap-5  grid place-items-center xl:col-start-2 xl:col-end-3 ">
            <label className="terms-toggle">
              <input type="checkbox" id="terms" required/>
              <span className="radio-visual"></span>
              <p>{t('PleaseAgreeToTermsAndConditions')}</p>
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded-[10px] mt-4 hover:bg-blue-600 w-full cursor-pointer "
            >
             {t('register')}
            </button>
            <p>
             {t('alreadyRegistered')}? 
              <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
                {t('logIn')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;

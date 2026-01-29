import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Layout from "./Layout";
import Contact from "./pages/Contact";
import News from "./pages/News";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import UserMenu from "./pages/UserMenu";
import PasswordRecovery from "./pages/PasswordRecovery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryAddress from "./pages/DeliveryAddress";
import PasswordChange from "./pages/PasswordChange";
import NotFound from "./pages/NotFound";

function App() {
  const [languageGeorgian, setLanguageGeorgian] = useState(true);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route
              element={
                <Home
                  languageGeorgian={languageGeorgian}
                  setLanguageGeorgian={setLanguageGeorgian}
                />
              }
              index
            />
            <Route
              path="product"
              element={<ProductPage languageGeorgian={languageGeorgian} />}
            />
            <Route
              path="checkout"
              element={<Checkout languageGeorgian={languageGeorgian} />}
            />
            <Route path="contact" element={<Contact />} />
            <Route path="delivery-address" element={<DeliveryAddress />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="news" element={<News />} />
            <Route path="password-change" element={<PasswordChange />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sing-in" element={<SignIn />} />
            <Route path="registration" element={<Registration />} />
            <Route path="user-menu" element={<UserMenu />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import "./App.css";
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
// import ProfileSideNavbar from "./pages/ProfileSideNavbar";w
import PasswordRecovery from "./pages/PasswordRecovery";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DeliveryAddress from "./pages/DeliveryAddress";
import PasswordChange from "./pages/PasswordChange";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./context/AuthProvider";
import CartContextProdiver from "./context/CartContext";

function App() {
  return (
    <CartContextProdiver>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route element={<Home />} index />
              <Route path="product" element={<ProductPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="news" element={<News />} />

              {/* pages that accessible when NOT logged in */}
              <Route path="sign-in" element={<SignIn />} />
              <Route path="registration" element={<Registration />} />
              <Route path="password-recovery" element={<PasswordRecovery />} />

              {/* Protected routes routes that are avalibe when user is logged in */}
              <Route element={<ProtectedRoute />}>
                <Route path="checkout" element={<Checkout />} />

                <Route path="user" element={<Profile />}>
                  <Route index element={<Navigate to="profile" replace />} />
                  <Route path="profile" element={<UserProfile />} />{" "}
                  {/* ADD THIS */}
                  <Route path="orders" element={<MyOrders />} />
                  <Route
                    path="delivery-address"
                    element={<DeliveryAddress />}
                  />
                  <Route path="password-change" element={<PasswordChange />} />
                </Route>
              </Route>

              <Route />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartContextProdiver>
  );
}

export default App;

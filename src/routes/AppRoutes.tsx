
import {Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense} from "react";
const ProductPage = lazy(() => import("../pages/ProductPage"));
const Home = lazy(() => import("../pages/Home"));
const Checkout = lazy(() => import("../pages/Checkout"));
const SignIn = lazy(() => import("../pages/SignIn"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const Profile = lazy(() => import("../pages/Profile")); // already done
const MyOrders = lazy(() => import("../pages/MyOrders"));
const DeliveryAddress = lazy(() => import("../pages/DeliveryAddress"));
const PasswordChange = lazy(() => import("../pages/PasswordChange"));
const Registration    = lazy(() => import("../pages/Registration"));
const Contact         = lazy(() => import("../pages/Contact"));
const News            = lazy(() => import("../pages/News"));
const PasswordRecovery = lazy(() => import("../pages/PasswordRecovery"));
const NotFound        = lazy(() => import("../pages/NotFound"));
const TransactionResult = lazy(() => import("../pages/TransactionResult"));
import ProtectedRoute from "../components/ProtectedRoute";
import PageLoader from "../pages/PageLoader";
import Layout from "../Layout";


const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<Home />} index />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} />
          <Route path="checkout" element={<Checkout />} />

          {/* pages that accessible when NOT logged in */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="registration" element={<Registration />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />

          {/* Protected routes routes that are avalibe when user is logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="transaction-result" element={<TransactionResult />} />

            <Route path="user" element={<Profile />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserProfile />} />{" "}
              {/* ADD THIS */}
              <Route path="orders" element={<MyOrders />} />
              <Route path="delivery-address" element={<DeliveryAddress />} />
              <Route path="password-change" element={<PasswordChange />} />
            </Route>
          </Route>

          <Route />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

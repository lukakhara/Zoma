import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Listener from "./components/Listener";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col h-full w-full bg-gray-200 ">
        <Header />
        <main className="flex-1 px-2 md:px-10 lg:px-30 sm:px-5 pb-[121px] md:pb-0">
          <Outlet />
        </main>
        <Listener />
        <Footer />
      </div>
    </>
  );
}

export default Layout;

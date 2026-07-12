import "./App.css";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    
  }, [checkAuth]);
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;

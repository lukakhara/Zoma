import "./App.css";
import { HashRouter} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import CartContextProvider from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";



function App() {
  return (
    <CartContextProvider>
      <AuthProvider>
        <HashRouter>
          <AppRoutes/>
        </HashRouter>
      </AuthProvider>
    </CartContextProvider>
  );
}

export default App;

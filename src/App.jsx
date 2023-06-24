import { Toaster } from "react-hot-toast";
import "./App.css";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MyRoutes from "./routes/MyRoutes";

function App() {
  return (
    <>
      <Toaster />
      <CartProvider>
        <AuthProvider>
          <Menu></Menu>
          <MyRoutes></MyRoutes>
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;

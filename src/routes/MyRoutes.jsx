import { Route, Routes } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Stripe from "../components/StripeCom";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/stripe" element={<Stripe />} />

      {/* <Route path="/carrito" element={<Cart />} /> */}
    </Routes>
  );
};

export default MyRoutes;

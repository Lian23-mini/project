import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
// import mySite from "./Domain";
// import Loader3 from "./Loader3";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
const stripePromise = loadStripe(
  "pk_test_51KjBqNA9KCn8yVMOEG2TF4LAS9CZwMVfMuAIHu1opMaabVxmgUri9qkETyQ9Q7DGyB6g9bNxEg62zf6dsqQZGdij00t1hmBwwH"
);

const CheckOut = ({ totalCart, closeModal, handleForm }) => {
  const { user } = useContext(AuthContext);
  const { getCartItems, cartItems } = useContext(CartContext);
  const [loader, setLoader] = useState(false);
  const stripe = useStripe();

  console.log(cartItems);
  const elements = useElements();
  const handleSubmit = async (dataForm) => {
    const amountInDollars = totalCart;
    const amountInCents = Math.round(amountInDollars * 100);
    // e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      setLoader(true);
      console.log(paymentMethod);
      const { id } = paymentMethod;
      axios
        .post(`${api}/checkout`, {
          id_payment: id,
          amount: amountInCents,
          user_id: user.id,
          dataForm,
          cart_items: cartItems,
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Pago realizado con éxito");
          closeModal(false);
          getCartItems();

          // setTimeout(() => {
          //   redirect("/cards/mis-cartas");
          // }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Pago rechazado, intenta de nuevo");
        })
        .finally(() => setLoader(false));
    }
  };
  return (
    <form onSubmit={handleForm(handleSubmit)}>
      <div className="text-lg mb-2 text-white">Datos de pago</div>
      <div className="">
        <CardElement className="bg-gray-100  border-2 border-gray-700 rounded-md p-4" />
      </div>
      <button className="btn btn-success w-full mt-2 ">
        {loader ? "Procesando pago..." : `Pagar $${totalCart}`}
      </button>
    </form>
  );
};

const StripeCom = ({ totalCart, closeModal, handleForm }) => {
  return (
    <div className="w-full text-white">
      <Elements stripe={stripePromise}>
        <CheckOut
          totalCart={totalCart}
          handleForm={handleForm}
          closeModal={closeModal}
        />
      </Elements>
    </div>
  );
};

export default StripeCom;

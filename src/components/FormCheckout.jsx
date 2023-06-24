import { useForm } from "react-hook-form";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import StripeCom from "./StripeCom";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const FormCheckout = ({ isOpen, changeState, totalCart }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "herre");
  };

  return (
    <Modal ariaHideApp={false} style={customStyles} isOpen={isOpen}>
      <OutsideClickHandler onOutsideClick={() => changeState(false)}>
        <div
          className="bg-[#1e2738] max-w-lg p-5 border border-teal-300 text-center mx-auto flex flex-col  items-center  rounded-lg text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 ">
            <label htmlFor="inputField" className="mb-2 text-lg font-bold ">
              Nombre(s):
            </label>
            <input
              id="inputField"
              type="text"
              placeholder="Ingresa tus nombre(s)"
              className="input input-bordered w-full max-w-xs"
              {...register("names", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="inputField" className=" mb-2 text-lg font-bold ">
              Apellidos:
            </label>
            <input
              id="inputField"
              type="text"
              placeholder="Ingresa tus apellidos"
              className="input input-bordered w-full max-w-xs"
              {...register("lastname", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="inputField" className=" mb-2 text-lg font-bold ">
              Dirección:
            </label>
            <input
              id="inputField"
              type="text"
              placeholder="Ingresa tu dirección"
              className="input input-bordered w-full max-w-xs"
              {...register("address", { required: true })}
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="phone" className="mb-2 text-lg font-bold ">
              Número telefonico:
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Ingresa tu numero de celular"
              className="input input-bordered w-full max-w-xs"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="phone" className="mb-2 text-lg font-bold ">
              Correo electronico:
            </label>
            <input
              id="phone"
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered w-full max-w-xs"
              {...register("email", { required: true })}
            />
          </div>

          <StripeCom
            totalCart={totalCart}
            handleForm={handleSubmit}
            closeModal={changeState}
          />
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default FormCheckout;

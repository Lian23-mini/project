import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import ad1 from "../media/ad1.jpg";
import ad2 from "../media/ad2.jpg";
import ad3 from "../media/ad3.jpg";
import Menu from "./Menu";
import Products from "./Products";
import Footer from "./Footer";
import FormCheckout from "./FormCheckout";
const Home = () => {
  return (
    <>
      {/* <Menu></Menu> */}
      <div className="h-screen ">
        <Swiper
          spaceBetween={30}
          // effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="mySwiper h-1/2 sm:w-3/4 mt-1 md:3/6 rounded-md"
          // style={{ height: "40vh" }}
        >
          <SwiperSlide
            style={{ backgroundImage: `url(${ad1})` }}
            className="bg-cover bg-no-repeat  bg-center"
          >
            {/* <img src={ad1} /> */}
          </SwiperSlide>
          <SwiperSlide
            style={{ backgroundImage: `url(${ad2})` }}
            className="bg-cover bg-no-repeat  bg-center"
          ></SwiperSlide>
          <SwiperSlide
            style={{ backgroundImage: `url(${ad3})` }}
            className="bg-cover bg-no-repeat  bg-center"
          ></SwiperSlide>
        </Swiper>
        <div id="location">
          <h1 className=" text-center text-3xl text-white mb-5">Ubicación</h1>
          <p className="text-center text-white text-lg mb-5">
            Nos ubicamos en Lago Zarias con esquina en Lomas a Geo #49
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.506105474515!2d-99.69822352395488!3d19.30383278194827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd8823febb6bad%3A0x4e72bff1a7c9ac30!2sC.%20Fernando%20Montes%20de%20Oca%2079%2C%20Delegaci%C3%B3n%20San%20Mateo%20Oxtotitl%C3%A1n%2C%2050100%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1687553212219!5m2!1ses-419!2smx"
            width="450"
            height="350"
            allowfullscreen=""
            className="rounded-lg mx-auto "
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
        <FormCheckout></FormCheckout>

        <Products />
        <Footer />
      </div>
    </>
  );
};

export default Home;

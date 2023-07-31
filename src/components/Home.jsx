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
            Nos ubicamos en{" "}
            <span className="font-bold">
              Guadalupe Victoria #19 San Lucas Tunco, Metepec, México
            </span>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1695391600438!2d-99.5364515239929!3d19.23144158200541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdf4a5f5c330fd%3A0xa9460a9ed3e7bf89!2sGuadalupe%20Victoria%2019%2C%20San%20Lucas%20Tunco%2C%2052145%20San%20Lucas%20Tunco%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1690836366383!5m2!1ses-419!2smx"
            width="450"
            height="350"
            allowfullscreen=""
            className="rounded-lg mx-auto "
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
        <FormCheckout />

        <Products />
        <Footer />
      </div>
    </>
  );
};

export default Home;

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import Close from "../../assets/close-icon";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default function App() {
  return (
    <div className="h-[50vh] w-full">
      <div className="text-xl">Pricing</div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        className="mySwiper2"
      >
        <SwiperSlide>
          <div className="border-2 border-white bg-blue-600 w-[150%] h-full rounded-lg my-5 grid grid-cols-2 grid-rows-5 items-center text-base">
            <h3 className="col-span-2">FREE</h3>
            <div className="ml-5 col-span-1 text-left">Upload to Cloud</div>
            <div className="col-span-1 end">
                <Close width={20}/>
            </div>
            <div className="ml-5 col-span-1 text-left">Share directly from app</div>
            <div className="ml-5 col-span-1 text-left text-red-600">X</div>
            <div className="ml-5 col-span-1 text-left">
              Copy URL to download later
            </div>
            <div className="col-span-1 text-left text-red-600">X</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-2 border-white bg-red-600 w-full h-full rounded-lg my-5"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

"use client";
import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { BeatCard } from "../Cards/BeatCard";

export const SliderCoverflow = ({ beats }) => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    const swiper = swiperRef.current;
    if (swiper && swiper.autoplay.running) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    const swiper = swiperRef.current;
    if (swiper && !swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  };



  return (
    <Swiper
    ref={swiperRef}

      effect={"coverflow"}
      grabCursor={true}
      slidesPerView={1}
      speed={1000}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 3, // Muestra 1.2 slides en vistas móviles
        },
      }}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper max-w-screen py-10"

      onSlideChange={() => console.log('slide change')}


      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {beats.map((e, index) => (
        <SwiperSlide key={index} className="w-fit bg-transparent">
          <div className="flex justify-center ">
            <BeatCard
              user={e.owner}
              name={e.title}
              price={e.licenses && e.licenses[0] ? e.licenses[0].price : "N/A"}
              owner={e.owner}
              audioUrl={e.file.url}
              fileType={e.file.fileType}
              licenses={e.licenses}
              image={e.image}
              priceArs={
                e.licenses && e.licenses[0] ? e.licenses[0].priceArs : "N/A"
              }
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

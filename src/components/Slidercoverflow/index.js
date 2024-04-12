"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { BeatCard } from "../Cards/BeatCard";

export const SliderCoverflow = ({ beats }) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      slidesPerView={1}
      speed={1000}
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
      className="mySwiper w-12/12 py-10"
    >
      {beats.map((e, index) => (
        <SwiperSlide key={index} className="w-fit bg-transparent">
          <div className="flex justify-center ">
            <BeatCard
              user={e.owner}
              name={e.title}
              price={e.licenses[0].price}
              owner={e.owner}
              audioUrl={e.file.url}
              fileType={e.file.fileType}
              licenses={e.licenses}
              image={e.image}
              priceArs={e.licenses[0].priceArs}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

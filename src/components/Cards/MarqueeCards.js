import React from "react";
import { ReproductorCard } from "./ReproductorCard";
import Marquee from "react-fast-marquee";

export const MarqueeCards = ({ cards }) => {
  return (
    <div className="w-screen">
      <Marquee autoFill>
        {cards.map((beat, index) => (
          <div className="" key={index}>
            <ReproductorCard beat={beat} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

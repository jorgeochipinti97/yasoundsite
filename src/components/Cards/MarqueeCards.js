import React from "react";

import Marquee from "react-fast-marquee";
import { BeatCard } from "./BeatCard";

export const MarqueeCards = ({ beats }) => {
  return (
    <div className="w-screen">
      <Marquee autoFill pauseOnHover>
        {beats.map((e, index) => (
          <div key={index} className="flex w-full justify-center">
            <BeatCard
              user={e.owner}
              name={e.title}
              price={e.licenses[0].price}
              owner={e.owner}
              audioUrl={e.file.url}
              fileType={e.file.fileType}
              licenses={e.licenses}
              image={e.image}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

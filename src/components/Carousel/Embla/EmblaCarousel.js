import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

const EmblaCarousel = ({ images, heigh }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla rounded-xl  ">
      <div className="embla__viewport  " ref={emblaRef}>
        <div className="embla__container ">
          {images.map((e, index) => (
            <div
              className="embla__slide embla__class-names rounded-xl  "
              key={index}
              style={{
                backgroundImage: `url(${e}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img src={e} alt="" className="rounded-xl px-2"/>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls  ">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

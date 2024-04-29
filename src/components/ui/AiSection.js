import React, { useEffect } from "react";
import { Badge } from "./badge";
import { useInView } from "react-intersection-observer";
import gsap, { Power1 } from "gsap";

export const AiSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Asegura que la animación se dispare solo una vez
    threshold: 0.1, // Define qué porcentaje del elemento debe estar visible para considerarse en vista
  });

  useEffect(() => {
    if (inView) {
      gsap.to(".span-1", { opacity: 1, delay: 0.5, ease: Power1.easeIn });
      gsap.to(".span-2", { opacity: 1, delay: 1.0, ease: Power1.easeIn });
      gsap.to(".span-3", { opacity: 1, delay: 1.5, ease: Power1.easeIn });
      gsap.to(".span-4", { opacity: 1, delay: 2.0, ease: Power1.easeIn });
      gsap.to(".span-5", { opacity: 1, delay: 2.5, ease: Power1.easeIn });
      gsap.to(".span-6", { opacity: 1, delay: 3.0, ease: Power1.easeIn });
    }
  }, [inView]);

  return (
    <div className=" min-h-screen max-w-screen flex items-start md:items-center flex-col justify-start md:mb-10 relative">
      <p className="text-5xl font-semibold text-center tracking-tighter mt-10 md:mt-0 md:mb-5">
        Creá, generá y revolucioná
      </p>
      <span
        style={{ opacity: 0 }}
        className="hidden md:flex span-1 p-2 bg-yellow-300 rounded-xl h-fit tracking-tighter absolute left-20 top-20 text-2xl border-2 border-yellow-500 font-semibold font-geist"
      >
        Creatividad con IA
      </span>
      <span
        style={{ opacity: 0 }}
        className="hidden md:flex span-2 p-2 rounded-xl h-fit tracking-tighter bg-lime-200 absolute right-20 top-96  text-2xl border-2 border-lime-500 font-semibold font-geist"
      >
        Asistencia digital
      </span>
      <span
        style={{ opacity: 0 }}
        className=" hidden md:flex span-3 p-2 rounded-xl h-fit tracking-tighter absolute left-7 top-96 text-2xl border-2 border-cyan-500 bg-cyan-300 font-semibold font-geist"
      >
        Explora melodías únicas
      </span>
      <span
        style={{ opacity: 0 }}
        className=" hidden md:flex span-4 p-2 rounded-xl h-fit tracking-tighter absolute right-20  top-20  text-2xl border-2 border-purple-500 bg-purple-300  font-semibold font-geist"
      >
        Innovación Musical
      </span>
      <span
        style={{ opacity: 0 }}
        className=" hidden md:flex span-5 p-2 rounded-xl h-fit tracking-tighter absolute  right-20 bottom-28 text-2xl border-2 border-pink-500 bg-pink-300 font-semibold font-geist"
      >
        Evolucion
      </span>

      <span
        style={{ opacity: 0 }}
        className=" hidden md:flex span-6 p-2 rounded-xl h-fit tracking-tighter absolute left-20 bottom-36 text-2xl border-2 border-emerald-500 bg-emerald-300 font-semibold font-geist"
      >
        Sonidos exclusivos
      </span>
      <div className="flex justify-center mt-5  " ref={ref}>
        <video
          src="/ia.mp4"
          className="w-11/12 md:w-8/12 rounded-xl shadow-xl shadow-black"
          autoPlay
          loop
          playsInline
          muted
        />
      </div>
      <div className="flex  flex-col items-center md:mt-20 mt-10 w-full justify-center  ">
        <p className="font-geist mb-2 font-bold text-4xl  tracking-tighter ">
          {" "}
          Resultado
        </p>

        <audio src="/track.wav" controls />
      </div>
      <div className="flex justify-around mt-5 md:hidden flex-wrap">
        <Badge className=" bg-yellow-300  m-1 text-black hover:bg-yellow-500  rounded-xl h-fit tracking-tighter  text-2xl border-2 border-yellow-500 font-semibold font-geist">
          Creatividad con IA
        </Badge>
        <Badge className=" rounded-xl h-fit m-1 text-black hover:bg-lime-500   tracking-tighter bg-lime-200   text-2xl border-2 border-lime-500 font-semibold font-geist">
          Asistencia digital
        </Badge>
        <Badge className=" rounded-xl h-fit m-1 text-black hover:bg-cyan-500   tracking-tighter   text-2xl border-2 border-cyan-500 bg-cyan-300 font-semibold font-geist">
          Explora melodías únicas
        </Badge>
        <Badge className=" rounded-xl h-fit m-1 text-black hover:bg-purple-500   tracking-tighter   text-2xl border-2 border-purple-500 bg-purple-300  font-semibold font-geist">
          Innovación Musical
        </Badge>
        <Badge className=" rounded-xl h-fit m-1 text-black hover:bg-pink-500   tracking-tighter  text-2xl border-2 border-pink-500 bg-pink-300 font-semibold font-geist">
          Evolucion
        </Badge>
        <Badge className=" rounded-xl h-fit m-1 text-black hover:bg-emerald-500   tracking-tighter  text-2xl border-2 border-emerald-500 bg-emerald-300 font-semibold font-geist">
          Sonidos exclusivos
        </Badge>
      </div>
    </div>
  );
};

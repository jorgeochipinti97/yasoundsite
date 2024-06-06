import React, { useEffect } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap, { Power1 } from "gsap";
import EmblaCarousel from "../Carousel/Embla/EmblaCarousel";
import { useRouter } from "next/navigation";

export const HeroComponent = () => {
  const { push } = useRouter()
  useEffect(() => {
    gsap.to(".logoblack", {
      opacity: 0,
      delay: 0.5,
      ease: Power1.easeIn,
    });
    gsap.to(".logoblack", {
      display: "none",
      delay: 0.7,
      ease: Power1.easeIn,
    });
    gsap.to(".displayvideo", {
      display: "grid",
      delay: 1,
    });
    gsap.to(".displayvideo", {
      opacity: 1,
      delay: 1.5,
    });
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center  items-center flex-col  bg-white"
      style={{ opacity: 1 }}
    >
      <p
        style={{ opacity: 0, display: "none" }}
        className="font-semibold    font-sans  text-center  capitalize text-7xl  mt-20 md:text-9xl   displayvideo  degradado-texto"
      >
        Yasound
      </p>

      <p
        className="  tracking-tighter mb-5 font-geist displayvideo"
        style={{ opacity: 0, display: "none" }}
      >
        La comunidad latina de artistas.
      </p>
      <div className="displayvideo" style={{ opacity: 0, display: "none" }}>
        <EmblaCarousel
          images={['/banner1.JPG','/banner2.JPG','/banner3.JPG']}
        />
      </div>

      <section className="displayvideo" style={{ opacity: 0, display: "none" }}>
        {" "}
        <p className=" text-4xl text-center md:text-6xl font-bold tracking-tighter">Doná y sumá puntos</p>
        <div className="flex justify-center mt-5">
          <Button variant='outline' size='lg' onClick={()=>push('https://link.mercadopago.com.ar/yasound')} className="mx-2">
            <img src="/mercado.svg"  className="w-[35px] mr-2"/>
            Mercadopago</Button>
          <Button variant='outline' size='lg' onClick={()=>push('https://www.paypal.me/yasound')} className="mx-2">
            
          <svg width={20} className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-3.5 0 48 48">
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#022B87" transform="translate(-804 -660)">
            <path d="M838.912 663.62c-2.241-2.534-6.29-3.62-11.472-3.62h-15.035a2.15 2.15 0 00-2.128 1.801l-6.26 39.393a1.284 1.284 0 001.275 1.48h9.282l2.332-14.67-.073.46a2.143 2.143 0 012.12-1.802h4.41c8.668 0 15.452-3.492 17.434-13.593.06-.3.154-.874.154-.874.563-3.738-.004-6.275-2.04-8.576zm4.389 10.488c-2.156 9.945-9.03 15.208-19.937 15.208h-3.956L816.458 708h6.416c.927 0 1.714-.669 1.86-1.576l.075-.396 1.476-9.273.095-.512a1.877 1.877 0 011.858-1.576h1.172c7.58 0 13.516-3.056 15.25-11.89.696-3.547.362-6.52-1.359-8.669z"></path>
          </g>
        </g>
      </g>
    </svg>
            Paypal</Button>
        </div>
      </section>
      <img src="/logoblack.svg" className="w-[40%] logoblack" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 md:mt-10 indexz displayvideo"
        style={{ opacity: 0, display: "none" }}
      >
        <div className="flex  justify-center mt-10 md:mt-0 items-center">
          <div className="div-3d shadow-violet-950 shadow-2xl rounded-xl  w-11/12 md:w-12/12 ">
            <video
              src="/yasoundv.mp4"
              className="w-12/12 rounded-xl"
              controls
              autoPlay
              playsInline
              loop
              muted
            />
          </div>
        </div>
        <div className="flex items-center flex-col md:mt-0 mt-10 justify-center ">
          <Card className="w-10/12 border-violet-500">
            <CardHeader>
              <CardTitle className="text-center mb-2 flex flex-col items-center justify-center">
                <svg
                  width={80}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#c026d3"
                >
                  <path fill="none" d="M0 0H24V24H0z"></path>
                  <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 000 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0020 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path>
                </svg>
                La comunidad líder para la compra y venta de beats e
                instrumentales en Latinoamerica.
              </CardTitle>
              <CardDescription className="text-center ">
                <span className="">
                  Únete, colabora, promociona y gestiona tu carrera
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {" "}
              ¡Transforma tu creatividad en oportunidades!
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={"/register"}>
                <Button className="hover:animate-tilt">
                  <svg
                    width={30}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000"
                    className=" "
                    data-name="Line Color"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path
                        fill="none"
                        stroke="#f5f5f7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.76 10.63L9 21l2.14-8H7.05a1 1 0 01-1-1.36l3.23-8a1.05 1.05 0 011-.64h4.34a1 1 0 011 1.36L13.7 9H17a1 1 0 01.76 1.63z"
                      ></path>
                    </g>
                  </svg>
                  Empezar
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

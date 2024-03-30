"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import gsap, { Power1 } from "gsap";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReproductorCard } from "@/components/Cards/ReproductorCard";
import { MarqueeCards } from "@/components/Cards/MarqueeCards";
import { AlertComponent } from "@/components/ui/AlertComponent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutComponent } from "@/components/ChckoutComponent";

export default function Home() {

  const clientId = `4632397606638218`;
  const redirectUri = encodeURIComponent("https://yasound.site/oauth");

  const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=12312312&redirect_uri=${redirectUri}`;

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
    <>
      <div
        className="min-h-screen flex justify-center
       items-center flex-col w-screen bg-white"
        style={{ opacity: 1 }}
      >
        <p
          style={{ opacity: 0, display: "none" }}
          className="font-semibold    font-sans  text-center  capitalize text-7xl  displayvideo  degradado-texto"
        >
          Yasound
        </p>
        <p
          className="mb-10 font-bold font-geist displayvideo"
          style={{ opacity: 0, display: "none" }}
        >
          La comunidad latina de artistas.
        </p>
        <img src="/logoblack.svg" className="w-[40%] logoblack" />
        <div
          className="grid grid-cols-1 md:grid-cols-2 md:mt-10 indexz displayvideo"
          style={{ opacity: 0, display: "none" }}
        >
          <div className="flex justify-center mt-10 md:mt-0 items-center">
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
            <Card className="w-12/12 border-violet-500">
              <CardHeader>
                <CardTitle>
                  {" "}
                  Únete, colabora, promociona y gestiona tu carrera
                </CardTitle>
                <CardDescription>
                  <span className="font-semibold"> La comunidad líder</span> de
                  habla hispana para la compra y venta de beats e
                  instrumentales.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {" "}
                ¡Transforma tu creatividad en oportunidades!
              </CardContent>
              <CardFooter className="flex justify-center">
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
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-screen mb-10">
        <p
          className="text-center   text-5xl md:text-7xl mt-10   mb-0 md:mb-10 font-bold text-black"
          style={{
            // mixBlendMode: "saturation",
            opacity: 0.4,
            letterSpacing: -4,
          }}
        >
          Beats & Tracks
        </p>
        <div className="overflow-hidden whitespace-nowrap flex">
          <div className=" ">
            <MarqueeCards
              cards={[
                {
                  img: "/chica.png",
                  title: "Track 1 TRAPICHEO",
                  price: "300",
                  gender: "Trap",
                  autor: "Federico Medina",
                },
              ]}
            />
          </div>
        </div>
        <div
          className="flex items-center py-10 justify-around mt-10 rounded-t-xl"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.2)),linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(239, 33, 170, .2)), url('./party.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex  flex-col  w-fit  p-5 justify-start rounded-md">
            <div className="mx-5">
              <p className=" font-bold text-5xl tracking-tighter  text-white ">
                Comunidad Yasound
              </p>
            </div>
            <div className="mx-10 mt-5">
              <ul>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2"
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Conexiones Musicales
                </li>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2 "
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Descubre Talentos Únicos
                </li>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2 "
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Promoción de tu Música
                </li>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2 "
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Asesoramiento y Recursos
                </li>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2 "
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Perfil Avanzado
                </li>
                <li className="font-semibold text-white my-2 flex">
                  <svg
                    className="mr-2 "
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#f5f5f7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 5L8 15l-5-4"
                    ></path>
                  </svg>
                  Soporte VIP
                </li>
              </ul>

              <Button variant="outline" className="mt-5 hover:animate-tilt">
                ¡Únete!
              </Button>
            </div>
          </div>
          <div className="flex  flex-col  w-fit  justify-start p-5 rounded-md">
            <div className="mx-5">
              <p className=" font-bold text-5xl tracking-tighter text-white ">
                Contactanos{" "}
              </p>
            </div>
            <div className="mx-10 mt-5">
              <div className="mb-2">
                <Label className="text-white font-bold ">Nombre</Label>
                <Input />
              </div>
              <div className="mb-2">
                <Label className="text-white font-bold ">Email</Label>
                <Input />
              </div>
              <div className="mb-2">
                <Label className="text-white font-bold ">Celular</Label>
                <Input />
              </div>
              <div className="mb-2">
                <Label className="text-white font-bold ">Mensaje</Label>
                <Textarea />
              </div>
              <Button variant="outline" className="mt-5 hover:animate-tilt">
                <svg
                  width={20}
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M1.265 4.426C1.043 2.872 2.617 1.68 4.053 2.314l17.781 7.857c1.589.702 1.589 2.956 0 3.658l-17.78 7.857c-1.437.635-3.011-.558-2.789-2.112l.726-5.082a1.2 1.2 0 01.897-.995L8.877 12l-5.99-1.497a1.2 1.2 0 01-.896-.995l-.726-5.082zM21.025 12L3.246 4.143l.65 4.55 8.96 2.24c1.11.278 1.11 1.856 0 2.134l-8.96 2.24-.65 4.55L21.025 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div className="h-screen flex justify-center items-center">
          {/* <a href={authorizationUrl}>Autorizar</a> */}
          <CheckoutComponent preferenceId={'APP_USR-4632397606638218-032920-1e901f9cd0ea669a5265c02aeb4193fc-196620874'} />
        </div>
      </div>
    </>
  )
}
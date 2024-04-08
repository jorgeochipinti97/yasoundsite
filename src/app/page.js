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
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { signOut } from "next-auth/react";

import { MarqueeCards } from "@/components/Cards/MarqueeCards";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { formatCurrency } from "@/utils/utils";
import { useUsers } from "@/hooks/useUsers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutComponent } from "@/components/CheckoutComponent";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SliderCoverflow } from "@/components/Slidercoverflow";
export default function Home() {
  const { push } = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true, // Asegura que la animación se dispare solo una vez
    threshold: 0.1, // Define qué porcentaje del elemento debe estar visible para considerarse en vista
  });
  const { user, users } = useUsers();
  const [beats_, setBeats_] = useState([]);

  const getBeats = async () => {
    const data = await axios.get("/api/products");
    data && setBeats_(data.data.data);
  };

  useEffect(() => {
    getBeats();
  }, []);

  useEffect(() => {
    if (inView) {
      // Si el contenedor está en vista, dispara las animaciones
      gsap.to(".span-1", { opacity: 1, delay: 0.5, ease: Power1.easeIn });
      gsap.to(".span-2", { opacity: 1, delay: 1.0, ease: Power1.easeIn });
      gsap.to(".span-3", { opacity: 1, delay: 1.5, ease: Power1.easeIn });
      gsap.to(".span-4", { opacity: 1, delay: 2.0, ease: Power1.easeIn });
      gsap.to(".span-5", { opacity: 1, delay: 2.5, ease: Power1.easeIn });
      gsap.to(".span-6", { opacity: 1, delay: 3.0, ease: Power1.easeIn });
      // Repite para los demás elementos
    }
  }, [inView]);

  const getPremium = async () => {
    try {
      const preference = {
        items: [
          {
            title: "USUARIO PREMIUM",
            quantity: 1,
            unit_price: 10000,
          },
        ],
        back_urls: {
          success: `https://www.yasound.site/premium`,
          failure: "https://www.yasound.site/",
          pending: "https://www.yasound.site/",
        },
      };

      const data = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer APP_USR-4632397606638218-032916-dc3ba4771030c1d50169159d35498d8c-743465031`,
          },
        }
      );

      data && push(data.data.init_point);
    } catch (err) {
      console.log(err);
    }
  };

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
      <section className="md:hidden fixed bottom-16 right-2 z-50">
        {!user && (
          <>
            <Link href={"/login"}>
              <Button variant="" className="tracking-tighter font-geist">
                <svg
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f5f5f7"
                  version="1.1"
                  viewBox="0 0 499.1 499.1"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M0 249.6c0 9.5 7.7 17.2 17.2 17.2h327.6l-63.9 63.8c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l93.1-93.1c6.7-6.7 6.7-17.6 0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3 0-6.7 6.7-6.7 17.6 0 24.3l63.8 63.8H17.2c-9.5 0-17.2 7.6-17.2 17.1z"></path>
                    <path d="M396.4 494.2c56.7 0 102.7-46.1 102.7-102.8V107.7C499.1 51 453 4.9 396.4 4.9H112.7C56 4.9 10 51 10 107.7V166c0 9.5 7.7 17.1 17.1 17.1 9.5 0 17.2-7.7 17.2-17.1v-58.3c0-37.7 30.7-68.5 68.4-68.5h283.7c37.7 0 68.4 30.7 68.4 68.5v283.7c0 37.7-30.7 68.5-68.4 68.5H112.7c-37.7 0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10 324.3 10 333.8v57.6c0 56.7 46.1 102.8 102.7 102.8h283.7z"></path>
                  </g>
                </svg>
              </Button>
            </Link>
          </>
        )}
      </section>
      {user && (
        <div className="md:hidden fixed bottom-16 left-2 z-50">
          <DropdownMenu className="">
            <DropdownMenuTrigger>
              <div>
                {" "}
                <div>
                  {user.profilePicture.length >= 5 ? (
                    <img
                      src={`${user.profilePicture}?${new Date().getTime()}`}
                      alt="Profile"
                      className="block  md:hidden shadowLow h-10 w-10 rounded-full border-2 border-violet-500"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full border-6 border-violet-500  cursor-pointer shadowLow bg-black flex items-center justify-center text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2">
              <DropdownMenuLabel>
                {" "}
                <Badge
                  variant={"outline"}
                  className={"border-violet-500 text-violet-500"}
                >
                  {" "}
                  PLAN FREE
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => push("/music")}>
                  Tu música
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => push(`/perfil/${user.username}`)}
                >
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => push("/settings")}>
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem className="font-bold font-geist text-xs bg-gray-200">
                  Yasound IA{" "}
                  <Badge className="ml-5 bg-gray-600">
                    {" "}
                    {/* <svg
                    width={15}
                    className="mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <g fill="#f5f5f7">
                    <path d="M7.453 2.713c.375-.95 1.72-.95 2.094 0l1.162 2.944c.114.29.344.52.634.634l2.944 1.162c.95.375.95 1.72 0 2.094l-2.944 1.162c-.29.114-.52.344-.634.634l-1.162 2.944c-.375.95-1.72.95-2.094 0L6.29 11.343a1.126 1.126 0 00-.634-.634L2.713 9.547c-.95-.375-.95-1.72 0-2.094L5.657 6.29c.29-.114.52-.344.634-.634l1.162-2.944zM16.924 13.392a.619.619 0 011.152 0l.9 2.283c.063.16.19.286.349.349l2.283.9a.619.619 0 010 1.152l-2.283.9a.619.619 0 00-.349.349l-.9 2.283a.619.619 0 01-1.152 0l-.9-2.283a.619.619 0 00-.349-.349l-2.283-.9a.619.619 0 010-1.152l2.283-.9a.619.619 0 00.349-.349l.9-2.283z"></path>
                    </g>
                  </svg>{" "} */}
                    Próximamente
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => push("/billing")}>
                  Billing
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Invitar Usuarios</DropdownMenuItem>
            
          <DropdownMenuSeparator /> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div
        className="min-h-screen flex justify-center
       items-center flex-col w-screen bg-white"
        style={{ opacity: 1 }}
      >
        <p
          style={{ opacity: 0, display: "none" }}
          className="font-semibold    font-sans  text-center  capitalize text-7xl md:mt-0 mt-20 md:text-9xl   displayvideo  degradado-texto"
        >
          Yasound
        </p>
        <p
          className="  tracking-tighter  font-geist displayvideo"
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
                <Link href={'/register'}>
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
      <div className=" border-2min-h-screen w-screen flex items-start md:items-center flex-col justify-start md:mb-10 relative">
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
            muted
          />
        </div>
      </div>
      <div className="flex mt-10 flex-col items-center md:mt-0 ">
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
      <div className="min-h-screen w-screen ">
        <p
          className="text-center tracking-tighter   text-5xl md:text-7xl mt-10  md:mt-32   mb-5 md:mb-10 font-bold text-black"
          style={{
            opacity: 0.4,
          }}
        >
          Beats & Tracks
        </p>

        {beats_ && (
          <div className=" ">
            <SliderCoverflow beats={beats_} />
          </div>
        )}

        <div className=" w-screen">
          <p className="text-center font-bold text-7xl mt-10 font-geist tracking-tighter">
            Membresias
          </p>
          <div className="flex justify-around items-center md:flex-row flex-col mt-10">
            <div class=" bg-gray-50 border md:mt-0 mt-10 md:w-5/12 w-11/12 border-black p-8 rounded-xl">
              <p className="font-bold  text-black text-center  tracking-tighter text-3xl">
                Usuario Free
              </p>
              <div className="flex flex-col items-start">
                <div className="flex text-black mt-5 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Comisión completa
                </div>
                <div className="flex text-black mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Límite de carga
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-black mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Soporte regular
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-black mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Perfil Estandar
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-black mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Restricción de datos personales
                </div>
              </div>
              <div className="mt-5 flex justify-center ">
                <span className="text-black font-mono  tracking-tighter text-4xl">
                  {formatCurrency(0)}/Gratis
                </span>
              </div>
              <div className="flex justify-center mt-5">
                <Link href={"/login"}>
                  <Button className="hover:animate-tilt">Registrarse</Button>
                </Link>
              </div>
            </div>
            <div class="card bg-black/80  md:mt-0 mt-10 md:w-5/12 w-11/12  rounded-xl p-4">
              <div className="flex justify-center">
                <svg
                  className=""
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f3e8ff"
                  stroke="#f3e8ff"
                  viewBox="0 0 32 32"
                >
                  <path d="M28.553 4.694a1.998 1.998 0 00-1.165 3.622l-3.16 4.962a2.125 2.125 0 01-.992 4.004 2.124 2.124 0 01-.313-4.227l-2.168-5.088a2.158 2.158 0 00-.491-4.257 2.157 2.157 0 00-.76 4.176l-2.777 4.737a2.237 2.237 0 11-1.482.056L12.49 7.894a2.158 2.158 0 00-.74-4.184 2.157 2.157 0 00-.543 4.245l-2.204 5.112a2.124 2.124 0 11-1.328.186L4.505 8.31a1.999 1.999 0 10-1.035.377l2.826 15.312c-1.712.045-1.717 2.507.048 2.507h.415l.004.02h18.364l.004-.02h.475c1.718 0 1.749-2.508 0-2.508h-.013l2.826-15.311a1.998 1.998 0 10.137-3.993z"></path>
                </svg>
              </div>
              <p className="font-bold  text-white text-center  tracking-tighter text-3xl">
                Usuario Premium
              </p>
              <div className="flex flex-col items-start">
                <div className="flex text-white mt-5 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#f3e8ff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Tokens para utilizar la IA
                </div>
                <div className="flex text-white mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#f3e8ff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Comisión bonificada
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-white mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#f3e8ff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Descuentos en Servicios Adicionales
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-white mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#f3e8ff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Perfil Avanzado
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-white mt-2 font-geist tracking-tighter	">
                  <svg
                    width={25}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path
                          stroke="#f3e8ff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12l4.95 4.95L19.557 6.343"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Acceso total a la comunidad para interactuar y colaborar.{" "}
                </div>
              </div>
              <div className="mt-5 flex justify-center ">
                <span className="text-white font-mono  tracking-tighter text-6xl">
                  {formatCurrency(10)}
                  <span className="font-thin">/</span>
                  <span className="text-white tracking-tighter font-thin font-geist text-4xl">
                    Mensual
                  </span>
                </span>
              </div>
              <div className="flex justify-center mt-5">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARfYvZugPUBZcQ2OiJ3DpT51zvYvn0BzyabZWlJNjLy-QdmkzUBFqSc8LvfwCTgp-eb82fSkxz5z6FXX",
                  }}
                >
                  <Dialog>
                    <DialogTrigger asChild className="text-white">
                      <Button className="hover:animate-tilt">
                        <svg
                          width={20}
                          className="mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z"
                              stroke="#ffffff"
                              stroke-width="1.5"
                            ></path>{" "}
                            <path
                              d="M12 17C12 17.8284 11.3284 18.5 10.5 18.5C9.67157 18.5 9 17.8284 9 17C9 16.1716 9.67157 15.5 10.5 15.5C11.3284 15.5 12 16.1716 12 17ZM12 17V10.5C12 12.1569 13.8954 13.5 15 13.5"
                              stroke="#ffffff"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7"
                              stroke="#ffffff"
                              stroke-width="1.5"
                            ></path>{" "}
                            <path
                              d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5"
                              stroke="#ffffff"
                              stroke-width="1.5"
                            ></path>{" "}
                          </g>
                        </svg>
                        Comprar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      {user ? (
                        <>
                          <Card className="m-3  purchaseSelect">
                            <CardHeader>Método de pago</CardHeader>
                            <CardContent className="grid gap-6">
                              <ScrollArea className="h-[40vh]">
                                <div>
                                  <PayPalButtons
                                    createOrder={(data, actions) => {
                                      return actions.order.create({
                                        purchase_units: [
                                          {
                                            amount: {
                                              value: 10,
                                            },
                                          },
                                        ],
                                      });
                                    }}
                                    onApprove={async (data, actions) => {
                                      try {
                                        const details =
                                          await actions.order.capture();

                                        const transactionId = details.id;
                                        const response = await axios.put(
                                          "/api/users",
                                          {
                                            _id: user._id,
                                            transactionId: transactionId,
                                            premium: true,
                                          }
                                        );
                                        response &&
                                          push(
                                            `/premium?payment_id=${transactionId}`
                                          );
                                      } catch (error) {
                                        console.error(
                                          "Error al capturar el pago o al guardar los detalles:"
                                        );
                                        // Manejo de errores
                                      }
                                    }}
                                  />
                                  <div className=" flex justify-center mt-10">
                                    <Button
                                      variant="outline"
                                      className="w-fit"
                                      onClick={getPremium}
                                    >
                                      <img
                                        src="/merca.png"
                                        className="w-1/12 mr-2"
                                      />
                                      Pagar con MercadoPago
                                    </Button>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full">Continue</Button>
                            </CardFooter>
                          </Card>
                        </>
                      ) : (
                        <>
                          <p className="font-geist text-xl text-center tracking-tighter">
                            Debe tener un usuario para ser premium
                          </p>
                          <div className="flex justify-center flex-col items-center">
                            <Link href={"/register"} className="my-2">
                              <Button>Registrarse</Button>
                            </Link>
                            <Link href={"/login"} className="my-2">
                              <Button>Iniciar sesión</Button>
                            </Link>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <Marquee direction="right">
            {users &&
              users.map((e) => (
                <div
                  style={{
                    backgroundImage:
                      e.profilePicture.length > 3
                        ? `url(${e.profilePicture})`
                        : "rgba(0,0,0,1)",
                  }}
                  className="h-[300px] w-[300px] rounded-xl bg-violet-100 mx-2  flex flex-col items-center"
                >
                  <p className="font-geist font-bold text-black tracking-tighter text-center mt-10 text-4xl">
                    {e.username}
                  </p>
                  <div className="flex justify-center mt-5">
                    <div>
                      {e.genders.map((e) => (
                        <Badge key={e} className="w-fit mx-2">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-5">
                    <Link href={`/perfil/${e.username}`}>
                      <Button className="hover:animate-tilt">
                        Visitar perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </Marquee>
        </div>
        <div
          className="flex items-center md:flex-row py-10 flex-col justify-around mt-10 rounded-t-xl"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.2)),linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(239, 33, 170, .2)), url('./party.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex  flex-col  w-fit  p-5 items-center md:items-start justify-start rounded-md">
            <div className="mx-5">
              <p className=" font-bold text-5xl md:text-start text-center tracking-tighter  text-white ">
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
              <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARfYvZugPUBZcQ2OiJ3DpT51zvYvn0BzyabZWlJNjLy-QdmkzUBFqSc8LvfwCTgp-eb82fSkxz5z6FXX",
                  }}
                >
                  <Dialog>
                    <DialogTrigger asChild className="">
                    <Button variant="outline" className="mt-5 hover:animate-tilt">
                ¡Únete!
              </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      {user ? (
                        <>
                          <Card className="m-3  purchaseSelect">
                            <CardHeader>Método de pago</CardHeader>
                            <CardContent className="grid gap-6">
                              <ScrollArea className="h-[40vh]">
                                <div>
                                  <PayPalButtons
                                    createOrder={(data, actions) => {
                                      return actions.order.create({
                                        purchase_units: [
                                          {
                                            amount: {
                                              value: 10,
                                            },
                                          },
                                        ],
                                      });
                                    }}
                                    onApprove={async (data, actions) => {
                                      try {
                                        const details =
                                          await actions.order.capture();

                                        const transactionId = details.id;
                                        const response = await axios.put(
                                          "/api/users",
                                          {
                                            _id: user._id,
                                            transactionId: transactionId,
                                            premium: true,
                                          }
                                        );
                                        response &&
                                          push(
                                            `/premium?payment_id=${transactionId}`
                                          );
                                      } catch (error) {
                                        console.error(
                                          "Error al capturar el pago o al guardar los detalles:"
                                        );
                                        // Manejo de errores
                                      }
                                    }}
                                  />
                                  <div className=" flex justify-center mt-10">
                                    <Button
                                      variant="outline"
                                      className="w-fit"
                                      onClick={getPremium}
                                    >
                                      <img
                                        src="/merca.png"
                                        className="w-1/12 mr-2"
                                      />
                                      Pagar con MercadoPago
                                    </Button>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full">Continue</Button>
                            </CardFooter>
                          </Card>
                        </>
                      ) : (
                        <>
                          <p className="font-geist text-xl text-center tracking-tighter">
                            Debe tener un usuario para ser premium
                          </p>
                          <div className="flex justify-center flex-col items-center">
                            <Link href={"/register"} className="my-2">
                              <Button>Registrarse</Button>
                            </Link>
                            <Link href={"/login"} className="my-2">
                              <Button>Iniciar sesión</Button>
                            </Link>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </PayPalScriptProvider>
        
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
        <div>
          <p className="text-center text-3xl font-bold mt-3  text-gray-600 tracking-tighter font-geist">
            Confian en nosotros
          </p>
          <Marquee autoFill direction="right">
            <div className="flex justify-center mx-2">
              <img src="/lider2.jpeg" />
            </div>
            <div className="flex justify-center mx-2">
              <img src="/ementors.jpeg" />
            </div>
            <div className="flex justify-center mx-2">
              <img src="/jhon.png" />
            </div>
          </Marquee>
        </div>
      </div>
    </>
  );
}

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutComponent } from "@/components/CheckoutComponent";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SliderCoverflow } from "@/components/Slidercoverflow";
import { SliderFlip } from "@/components/SliderFlip";
import { AccordionComponent } from "@/components/Faqs";
import { ContactForm } from "@/components/Forms/ContactForm";
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
    console.log(data)
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
      <section className="md:hidden fixed bottom-16  z-50 w-fit">
        {!user && (
          <div className="w-6/12 ">
            <Link href={"/login"}>
              <div className="">
                <img src="/entrar.png" />
              </div>
            </Link>
          </div>
        )}
      </section>

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

        <p
          className="text-center tracking-tighter   text-5xl md:text-7xl mt-10  md:mt-32   mb-5 md:mb-10 font-bold text-black"
          style={{
            opacity: 0.4,
          }}
        >
          Descubrí Productores
        </p>

        <div className=" flex justify-center">
          <div className="w-12/12 md:w-6/12">
            <Table className=" ">
              <TableCaption>
                Una tabla de nuestros ultimos 6 usuarios registrados.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className=""></TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="text-center">País</TableHead>
                  <TableHead className="text-center hidden md:block">
                    Generos
                  </TableHead>
                  <TableHead className="text-center">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.slice(-6).map((e, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div>
                          {e.profilePicture.length >= 5 ? (
                            <img
                              src={`${
                                e.profilePicture
                              }?${new Date().getTime()}`}
                              alt="Profile"
                              className="  h-10 w-10 rounded-full border-2 border-violet-500"
                            />
                          ) : (
                            <div className=" flex  h-10 w-10 rounded-full border-6 border-violet-500  cursor-pointer  bg-black  items-center justify-center text-white">
                              {e.username[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className=" font-geist text-xs font-bold">
                        {e.username}
                      </TableCell>
                      <TableCell className=" font-geist text-xs font-bold">
                        {e.country}
                      </TableCell>
                      <TableCell className="text-right font-geist text-xs font-bold hidden md:block">
                        {e.genders.map((g) => `${g}, `)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-black"
                          onClick={() => push(`/perfil/${e.username}`)}
                        >
                          {" "}
                          Ver perfil
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button size="lg">Descubrir más</Button>
        </div>

        <div className=" w-screen">
          <p className="text-center font-bold text-5xl mt-10 font-geist tracking-tighter">
            Membresias
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
            <div className="flex justify-center">
              <div class=" bg-gray-50 border md:mt-0  md:w-10/12 w-11/12 border-black p-8 rounded-xl">
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
                    Registro y perfil estandar
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
                    Comisión completa
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
                    Colaboracion basica
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
                <div className="flex flex-col items-start">
                  <div className="flex text-black mt-2 font-geist  tracking-tighter	">
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
                    Publicidad activa
                  </div>
                </div>
                <div className="mt-20 flex justify-center ">
                  <span className="text-black font-mono  tracking-tighter text-4xl md:text-7xl">
                    {formatCurrency(0)}/Gratis
                  </span>
                </div>
                <div className="flex justify-center mt-5">
                  <Link href={"/login"}>
                    <Button className="hover:animate-tilt">Registrarse</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <SliderFlip user={user} />
            </div>
          </div>
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
                    <Button
                      variant="outline"
                      className="mt-5 hover:animate-tilt"
                    >
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
          <ContactForm />
        </div>
        <p className="text-center text-7xl my-10 font-bold tracking-tighter font-geist">
          FAQS
        </p>
        <div className="w-12/12 flex flex-col items-center">
          <div className="w-10/12 md:w-6/12">
            <AccordionComponent
              question={"¿Qué es Yasound y cómo funciona?"}
              answer={
                "Es una plataforma de comercio electrónico diseñada para artistas emergentes que desean vender sus composiciones musicales e instrumentales. Funciona como un mercado en línea donde los artistas pueden cargar y ofrecer sus beats para su venta."
              }
            />

            <AccordionComponent
              question={"¿Cómo puedo registrarme como artista?"}
              answer={
                "Registrarse como artista en Yasound es fácil. Simplemente haz clic en el botón Ingresar, selecciona la opción Registrarme y completa el formulario con tus datos. Asegúrate de aceptar los términos y condiciones como usuario. Una vez hecho esto, estarás listo para comenzar a compartir tus creaciones musicales con el mundo."
              }
            />
            <AccordionComponent
              question={"¿Qué ventajas ofrece la membresía premium de Yasound?"}
              answer={
                "La membresía premium de Yasound ofrece una serie de beneficios exclusivos, como un perfil más completo en la plataforma, participación en descuentos y eventos, acceso a la comunidad, soporte prioritario las 24 horas y descuentos especiales en ventas."
              }
            />
            <AccordionComponent
              question={"¿Cuáles son las tarifas de transacción en Yasound?"}
              answer={
                "Las tarifas de transacción aplicadas en Yasound son las siguientes: Para transacciones a través de MercadoPago: 6,5% + IVA (21%) sobre el total de la venta. Para transacciones mediante PayPal: 5.6% + comisión fija (1,29%) sobre el monto total de la transacción. Estas tarifas se agregan al costo del producto y se deducen automáticamente durante la transacción. Por otra parte los Usuarios Free cuentan con una comisión por el uso de la plataforma del 15%, en cambio los Usuarios Premium poseen una comisión del 3%"
              }
            />
            <AccordionComponent
              question={
                "¿Qué medidas de seguridad implementa Yasound para proteger mis datos personales y financieros?"
              }
              answer={
                "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos las últimas tecnologías y protocolos de seguridad para proteger tanto tu información personal como financiera. Nuestra base de datos está protegida con los más altos estándares de seguridad, garantizando la confidencialidad y la integridad de tus datos en todo momento."
              }
            />
            <AccordionComponent
              question={
                "¿Cómo puedo contactar al equipo de soporte de Yasound si surge algún problema o tengo alguna pregunta?"
              }
              answer={
                "Si necesitas ayuda o tienes alguna pregunta, nuestro equipo de soporte está aquí para ayudarte. Puedes contactarnos a través de diversos canales, como correo electrónico, redes sociales o WhatsApp. Estamos disponibles las 24 horas del día, los 7 días de la semana, para brindarte la asistencia que necesites."
              }
            />
            <AccordionComponent
              question={
                "¿Qué sucede si experimento algún problema con una transacción o una compra en Yasound?"
              }
              answer={
                "Si surge algún problema durante una transacción o compra en Yasound, no te preocupes. Nuestro equipo de soporte está preparado para resolver cualquier inconveniente que puedas tener. Simplemente contáctanos y proporciona detalles sobre el problema, incluyendo capturas de pantalla si es posible. Nos encargaremos de resolver la situación de manera rápida y eficiente para garantizar tu satisfacción."
              }
            />
            <AccordionComponent
              question={
                "¿Ofrece Yasound alguna garantía de calidad para los beats y productos disponibles en la plataforma?"
              }
              answer={
                "En Yasound, nos comprometemos a ofrecer la más alta calidad en todos los beats y productos disponibles en nuestra plataforma. Nuestro equipo trabaja diligentemente para garantizar que cada elemento cumpla con nuestros estándares de excelencia. Además, estamos abiertos a recibir comentarios y sugerencias de nuestros usuarios para seguir mejorando y ofrecer una experiencia aún mejor."
              }
            />
          </div>
        </div>
        <div>
          <p className="text-center text-3xl font-bold mt-20  text-gray-600 tracking-tighter font-geist">
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

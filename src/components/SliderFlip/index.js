"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { formatCurrency } from "@/utils/utils";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { useRouter } from "next/navigation";

export const SliderFlip = ({ user }) => {
  const { push } = useRouter();
  const getPremium = async (anual) => {
    try {
      const preference = {
        items: [
          {
            title: "USUARIO PREMIUM",
            quantity: 1,
            unit_price: anual ? 5000 : 45000,
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

  return (
    <Swiper
      effect={"flip"}
      grabCursor={true}
      pagination={true}
      modules={[EffectFlip, Pagination, Navigation]}
      className="mySwiper w-10/12 "
    >
      <SwiperSlide>
        <div class="shadowLow bg-black  md:mt-0 mt-10 py-10  w-12/12  rounded-xl p-4">
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
              Perfil avanzado
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
              Colaboración Ilimitada
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
              Licencias Flexibles
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
              Comisión Reducida
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
              Acceso Prioritario a Nuevas Funciones
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
              Soporte VIP
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
              Utilización de Inteligencia Artificial
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
              Descuentos en Servicios Adicionales, marcas y tiendas
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
              Eventos Exclusivos{" "}
            </div>
          </div>
          <div className="mt-5 flex justify-center ">
            <span className="text-white font-mono  tracking-tighter text-4xl ">
              <span className="line-through	text-5xl font-light ">
                {formatCurrency(10)}
              </span>
              <span className="ml-2	text-5xl">{formatCurrency(5)}</span>
              <span className="font-thin">/</span>
              <span className="text-white tracking-tighter font-thin font-geist text-3xl">
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
                                          value: 5,
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
                                  onClick={() => getPremium(false)}
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
          <div className="flex mt-5">
            <img
              src="/merca.png"
              className="w-[30px] md:w-[100px] mx-1 rounded-xl grayscale-[90%]"
            />
            <div className="w-[30px] md:w-[100px] bg-white mx-1 rounded-xl grayscale-[90%]">
              <img src="/paypal.png" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="shadowLow bg-black  md:mt-0 mt-10 py-10  w-12/12  rounded-xl p-4">
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
              Perfil avanzado
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
              Colaboración Ilimitada
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
              Licencias Flexibles
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
              Comisión Reducida
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
              Acceso Prioritario a Nuevas Funciones
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
              Soporte VIP
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
              Utilización de Inteligencia Artificial
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
              Descuentos en Servicios Adicionales, marcas y tiendas
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
              Eventos Exclusivos{" "}
            </div>
          </div>
          <div className="mt-5 flex justify-center ">
            <span className="text-white font-mono  tracking-tighter text-6xl">
              {formatCurrency(45)}
              <span className="font-thin">/</span>
              <span className="text-white tracking-tighter font-thin font-geist text-4xl">
                Anual
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
                                          value: 45,
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
                                  onClick={() => getPremium(true)}
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
      </SwiperSlide>
    </Swiper>
  );
};

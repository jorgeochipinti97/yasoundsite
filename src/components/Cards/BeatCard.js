import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ScrollArea } from "../ui/scroll-area";
import { CheckoutComponent } from "../CheckoutComponent";
import { paises } from "@/utils/paises";
import { useForm } from "react-hook-form";
import gsap, { Power1 } from "gsap";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export const BeatCard = ({
  name,
  owner,
  price,
  audioUrl,
  genders,
  licenses,
  image,
  user,
  priceArs,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { push } = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    const response = await axios.post("/api/orders", {
      buyer: data.nombre,
      seller: owner,
      buyerEmail: data.email,
      buyerPhone: data.phone,
      buyerCountry: data.country,
      status: "no paid",
      fileUrl: audioUrl,
      amount: price,
      product: name,
    });
    response && setOrderId(response.data._id);
    setIsSubmit(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      setIsPlaying(!wasPlaying); // Actualizamos el estado inmediatamente para mejorar la respuesta de la UI

      if (wasPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();

        // En navegadores que soportan promesas con play(), hay que manejar el caso de fallo
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // La reproducción inició exitosamente
            })
            .catch((error) => {
              alert("La reproducción de audio falló", error);
              console.log(error);
              setIsPlaying(false); // Revertir el estado si la reproducción falla
              // Aquí puedes manejar el error, por ejemplo, mostrando una interfaz de usuario
              // para que el usuario inicie manualmente la reproducción
            });
        }
      }
    }
  };

  useEffect(() => {
    isSubmit &&
      gsap.to(".formPurchase", {
        opacity: 0,
        ease: Power1.easeIn,
      });
    gsap.to(".formPurchase", {
      display: "none",
      delay: 0.5,
      ease: Power1.easeIn,
    });
    gsap.to(".purchaseSelect", {
      display: "block",
      delay: 0.8,
      ease: Power1.easeIn,
    });
    gsap.to(".purchaseSelect", {
      opacity: 1,
      delay: 1,
      ease: Power1.easeIn,
    });
  }, [isSubmit]);

  const PlayIcon = () => (
    <svg
      onClick={togglePlayPause}
      width={20}
      className="cursor-pointer hover:animate-tilt"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 0 7 7"
    >
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#f5f5f7" transform="translate(-347 -3766)">
            <g transform="translate(56 160)">
              <path d="M296.495 3608.573l-3.994-2.43c-.669-.408-1.501.107-1.501.926v4.862c0 .82.832 1.333 1.5.927l3.995-2.43c.673-.41.673-1.445 0-1.855"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const PauseIcon = () => (
    <svg
      onClick={togglePlayPause}
      width={20}
      className="cursor-pointer hover:animate-tilt"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 0 8 8"
    >
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#f5f5f7" transform="translate(-227 -3765)">
            <g transform="translate(56 160)">
              <path d="M172 3605a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1m5 1v6a1 1 0 01-2 0v-6a1 1 0 012 0"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const mimeType = getMimeType(audioUrl);

  function getMimeType(url) {
    const extension = url.split(".").pop().toLowerCase();
    switch (extension) {
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "ogg":
        return "audio/ogg";
      default:
        return "audio/mpeg"; // Default, por si acaso no se reconoce la extensión
    }
  }
  return (
    <Card
      className=" h-[300px] border-none  mx-2 w-[300px] rounded-xl flex items-start flex-col justify-start"
      style={{
        backgroundImage: `linear-gradient(129deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.4) 34%), url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PayPalScriptProvider
        options={{
          "client-id":
            "ARfYvZugPUBZcQ2OiJ3DpT51zvYvn0BzyabZWlJNjLy-QdmkzUBFqSc8LvfwCTgp-eb82fSkxz5z6FXX",
        }}
      >
        <audio preload="auto" ref={audioRef}>
          <source src={audioUrl} type={mimeType} />
        </audio>

        <CardContent>
          <p className="font-geist font-bold text-white text-xl mt-5">{name}</p>
          <a
            href={`/perfil/${owner}`}
            className="hover:animate-tada flex items-center "
          >
            <svg
              width={20}
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g fill="#fff">
                <path d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304 1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 001.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 101.063-1.058c-1.164-1.168-1.132-3.28.303-4.72l4.848-4.867z"></path>
                <path d="M14.485 9.47a.75.75 0 00-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 00-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838 1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837z"></path>
              </g>
            </svg>
            <p className="mt-2 font-geist text-white font-mono">{owner}</p>
          </a>
          <div className=" my-3" style={{display:genders ?'flex' :'none'}}>
            {genders &&
              genders.map((e, index) => (
                <Badge className="mx-1 bg-slate-300 text-black hover:bg-slate-400" key={index}>
                  {e}
                </Badge>
              ))}
          </div>

          <p className="mt-2 font-geist text-white font-mono">
            USD {formatCurrency(price)}
          </p>
          <p className="mt-2 font-geist text-white font-mono">
            ARS {formatCurrency(priceArs)}
          </p>

          <p className="mt-2 font-geist text-white font-mono"></p>

          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger className="text-white">
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
              <Table>
                <TableCaption>Lista de tus productos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Nombre</TableHead>
                    <TableHead className="text-center">Precio</TableHead>
                    <TableHead className="text-center">Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses &&
                    licenses.map((e) => (
                      <TableRow key={e._id}>
                        <TableCell className="text-center font-geist tracking-tighter font-semibold text-xl">
                          {e.title}
                        </TableCell>
                        <TableCell className="  text-center font-geist flex-col flex tracking-tighter font-semibold ">
                          <span>{formatCurrency(e.price)} USD </span>
                          <span>{formatCurrency(e.priceArs)}ARS</span>
                        </TableCell>
                        <TableCell className="text-center font-geist tracking-tighter font-semibold text-xl">
                          <Dialog>
                            <DialogTrigger>
                              <span className="bg-violet-500 px-2 py-1 rounded-md text-white">
                                Comprar
                              </span>
                            </DialogTrigger>
                            <DialogContent className="">
                              <form
                                className="mx-10 mt-5 formPurchase"
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <div className="my-2">
                                  <Label className="text-black font-bold">
                                    Nombre Completo
                                  </Label>
                                  <Input {...register("nombre")} />
                                </div>
                                <div className="my-2">
                                  <Label className="text-black font-bold">
                                    Email
                                  </Label>
                                  <Input {...register("email")} />
                                </div>
                                <div className="my-2">
                                  <Label className="text-black font-bold">
                                    Celular
                                  </Label>
                                  <Input {...register("celular")} />
                                </div>
                                <div className="mb-2">
                                  <Label className="text-black font-bold">
                                    País
                                  </Label>
                                  <Select
                                    className="my-2"
                                    onValueChange={(e) =>
                                      setValue("country", e)
                                    }
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Elige tu país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {paises.map((e) => (
                                        <SelectItem
                                          key={e.country}
                                          value={e.country}
                                        >
                                          {e.country} {e.emoji}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button
                                  type="submit"
                                  variant="outline"
                                  className="mt-5 hover:animate-tilt"
                                >
                                  Enviar
                                </Button>
                              </form>
                              <Card
                                className="m-3  purchaseSelect"
                                style={{ display: "none", opacity: 0 }}
                              >
                                <CardHeader>Método de pago</CardHeader>
                                <CardContent className="grid gap-6">
                                  <ScrollArea className="h-[40vh]">
                                    {orderId && (
                                      <div>
                                        <PayPalButtons
                                          createOrder={(data, actions) => {
                                            return actions.order.create({
                                              purchase_units: [
                                                {
                                                  amount: {
                                                    value: e.price,
                                                  },
                                                },
                                              ],
                                            });
                                          }}
                                          onApprove={async (data, actions) => {
                                            try {
                                              const details =
                                                await actions.order.capture();

                                              if (orderId) {
                                                const response =
                                                  await axios.put(
                                                    "/api/orders",
                                                    {
                                                      _id: orderId,
                                                      transactionId: details.id,
                                                      status: "approved",
                                                      provider: "paypal",
                                                    }
                                                  );
                                                console.log(response);
                                                response &&
                                                  push(
                                                    `/success?orderID=${orderId}`
                                                  );
                                              }
                                            } catch (error) {
                                              console.error(
                                                "Error al capturar el pago o al guardar los detalles:",
                                                orderId
                                              );
                                              // Manejo de errores
                                            }
                                          }}
                                        />
                                        <CheckoutComponent
                                          user={user}
                                          product={e}
                                          _id={orderId}
                                        />
                                      </div>
                                    )}
                                  </ScrollArea>
                                  {/* <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="First Last" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="number">Card number</Label>
                                    <Input id="number" placeholder="" />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="month">Expires</Label>
                                      <Select>
                                        <SelectTrigger id="month">
                                          <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="1">
                                            January
                                          </SelectItem>
                                          <SelectItem value="2">
                                            February
                                          </SelectItem>
                                          <SelectItem value="3">
                                            March
                                          </SelectItem>
                                          <SelectItem value="4">
                                            April
                                          </SelectItem>
                                          <SelectItem value="5">May</SelectItem>
                                          <SelectItem value="6">
                                            June
                                          </SelectItem>
                                          <SelectItem value="7">
                                            July
                                          </SelectItem>
                                          <SelectItem value="8">
                                            August
                                          </SelectItem>
                                          <SelectItem value="9">
                                            September
                                          </SelectItem>
                                          <SelectItem value="10">
                                            October
                                          </SelectItem>
                                          <SelectItem value="11">
                                            November
                                          </SelectItem>
                                          <SelectItem value="12">
                                            December
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="year">Year</Label>
                                      <Select>
                                        <SelectTrigger id="year">
                                          <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from(
                                            { length: 10 },
                                            (_, i) => (
                                              <SelectItem
                                                key={i}
                                                value={`${
                                                  new Date().getFullYear() + i
                                                }`}
                                              >
                                                {new Date().getFullYear() + i}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="cvc">CVC</Label>
                                      <Input id="cvc" placeholder="CVC" />
                                    </div>
                                  </div> */}
                                </CardContent>
                                <CardFooter>
                                  <Button className="w-full">Continue</Button>
                                </CardFooter>
                              </Card>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </PayPalScriptProvider>
    </Card>
  );
};

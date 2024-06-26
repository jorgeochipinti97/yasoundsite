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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUsers } from "@/hooks/useUsers";

export const BeatCard = ({
  name,
  owner,
  price,
  audioUrl,
  genders,
  licenses,
  image,
  priceArs,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { user } = useUsers(owner);
  const [isSubmit, setIsSubmit] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { push } = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    const response = await axios.post("/api/orders", {
      buyer: data.nombre,
      seller: user._id,
      buyerEmail: data.email,
      buyerPhone: data.phone,
      buyerCountry: data.country,
      status: "no paid",
      fileUrl: audioUrl,
      amount: price,
      product: name,
    });
    response && setOrderId(response.data._id);
    response && setIsSubmit(true);
  };

  const handleCheckboxChange = (event) => {
    setAcceptTerms(event.target.checked);
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
      className=" h-[300px]  border-none  mx-2 w-[300px] rounded-xl flex items-start flex-col justify-start"
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
          <div className="flex flex-col items-around">
            <p
              className={`font-geist font-bold uppercase text-white ${
                name.length > 10 ? "text-xs" : " text-md"
              } mt-5`}
            >
              {name}
            </p>
            <a
              href={`/perfil/${owner}`}
              className="hover:animate-tada w-fit flex items-center px-2 mt-2 rounded-xl  bg-white/70"
            >
         <svg
         width={20}
         className="mr-2"
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <g
        stroke="#292929"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M11 4H4v14a2 2 0 002 2h12a2 2 0 002-2v-5M9 15L20 4M15 4h5v5"></path>
      </g>
    </svg>
              <p className=" font-geist text-black font-mono ">
                {user && user.username}{" "}
                <span className="text-2xl">
                  {" "}
                  {user &&
                    paises.map((e) => e.country == user.country && e.emoji)}
                </span>
              </p>
            </a>
            <div
              className=" my-3"
              style={{ display: genders ? "flex" : "none" }}
            >
              {genders &&
                genders.map((e, index) => (
                  <Badge
                    className=" bg-slate-300 mx-1 text-black hover:bg-slate-400"
                    key={index}
                  >
                    {e}
                  </Badge>
                ))}
            </div>

            <p className="mt-2 font-geist text-white font-mono">
              USD {formatCurrency(price)}
            </p>
            {priceArs > 0 && (
              <p className="mt-2 font-geist text-white font-mono">
                ARS {formatCurrency(priceArs)}
              </p>
            )}
            <div className="mt-3">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
            <div className="">
              <Dialog>
                <DialogTrigger className="text-white">
                  <Button className="hover:animate-tilt mt-3">
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
                    Ver más
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <Table>
                    <TableCaption>Lista de tus productos</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Nombre</TableHead>
                        <TableHead className="text-center">Precio</TableHead>
                        <TableHead className="text-center">-</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {licenses &&
                        licenses.map((e) => (
                          <TableRow key={e._id}>
                            <TableCell className="text-center font-geist tracking-tighter font-semibold text-md md:text-md">
                              {e.title}
                            </TableCell>
                            <TableCell className="  text-center font-geist items-center tracking-tighter font-semibold ">
                              <div className="flex flex-col items-center justify-center">
                                <span className="text-md">
                                  {formatCurrency(e.price)} USD{" "}
                                </span>

                                {!e.priceArs ||
                                  (e.priceArs != 0 && (
                                    <span className="text-md">
                                      {formatCurrency(e.priceArs)} ARS{" "}
                                    </span>
                                  ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-geist tracking-tighter font-semibold text-xl">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="flex justify-center">
                                    <Button>
                                      <svg
                                        width={20}
                                        className="mr-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="#f5f5f7"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M3 9h18M7 15h2m-2.8 4h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C21 17.48 21 16.92 21 15.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C3 6.52 3 7.08 3 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C4.52 19 5.08 19 6.2 19z"
                                        ></path>
                                      </svg>
                                      Comprar
                                    </Button>
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="">
                                  <div className="flex justify-start capitalize flex-col">
                                    <p className="font-geist tracking-tighter font-semibold text-md">
                                      {e.title}
                                    </p>
                                    <div className="flex justify-start my-5">
                                      <div>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button size="sm">Ver info</Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Descripción
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                <p className="font-geist tracking-tighter font-semibold text-xs">
                                                  {e.description}
                                                </p>
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>
                                                Volver
                                              </AlertDialogCancel>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </div>
                                    </div>
                                  </div>
                                  <form
                                    className="mx-2 formPurchase"
                                    onSubmit={handleSubmit(onSubmit)}
                                  >
                                    <div className="my-2">
                                      <Label className="text-black font-bold">
                                        Nombre Completo
                                      </Label>
                                      <Input
                                        {...register("nombre", {
                                          required: true,
                                        })}
                                      />
                                    </div>
                                    <div className="my-2">
                                      <Label className="text-black font-bold">
                                        Email
                                      </Label>
                                      <Input
                                        {...register("email", {
                                          required: true,
                                        })}
                                      />
                                    </div>
                                    <div className="my-2">
                                      <Label className="text-black font-bold">
                                        Celular
                                      </Label>
                                      <Input
                                        {...register("celular", {
                                          required: true,
                                        })}
                                      />
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

                                    <div className="flex mt-5">
                                      <input
                                        checked={acceptTerms}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 focus:bg-fuchsia-400"
                                        type="checkbox"
                                        id="cbox2"
                                        value="second_checkbox"
                                      />
                                      <p className="text-xs tracking-tighter font-bold ">
                                        Para continuar debes aceptar nuestras
                                        políticas y los terminos y condiciones.
                                      </p>
                                    </div>

                                    <Button
                                      disabled={!acceptTerms}
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
                                              onApprove={async (
                                                data,
                                                actions
                                              ) => {
                                                try {
                                                  const details =
                                                    await actions.order.capture();

                                                  if (orderId) {
                                                    const response =
                                                      await axios.put(
                                                        "/api/orders",
                                                        {
                                                          _id: orderId,
                                                          transactionId:
                                                            details.id,
                                                          status: "approved",
                                                          provider: "paypal",
                                                        }
                                                      );
                                                  
                                                    response &&
                                                      push(
                                                        `/success?orderID=${orderId}`
                                                      );
             response && await updatePoints(user,2)

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
            </div>
          </div>
        </CardContent>
      </PayPalScriptProvider>
    </Card>
  );
};

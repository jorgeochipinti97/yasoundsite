import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatCurrency, updatePoints } from "@/utils/utils";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SliderCoverflow } from "@/components/Slidercoverflow";
import { SliderFlip } from "@/components/SliderFlip";
import { AccordionComponent } from "@/components/Faqs";
import { ContactForm } from "@/components/Forms/ContactForm";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { paises } from "@/utils/paises";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "./separator";

export const BeatHomeSection = ({ beats, users, user }) => {
  const { push } = useRouter();
  const [usersTable, setUsersTable] = useState([]);
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

  const getFlagEmoji = (countryName) => {
    const countryObject = paises.find(
      (pais) => pais.country.toLowerCase() === countryName.toLowerCase()
    );
    return countryObject ? countryObject.emoji : "";
  };

  const getUsersWithProducts = async () => {
    try {
      const data = await axios.get("/api/products");
      const userIDs = data.data.data.map((product) => product.owner);

      // Verificar que 'users' existe y es un array antes de filtrar
      if (Array.isArray(users)) {
        // Filtrar usuarios que son owners de productos
        const filteredUsers = users.filter((user) =>
          userIDs.includes(user._id) && user.profilePicture
        );

        // Ordenar por 'updatedAt' descendente y tomar los últimos 8
        const lastEightUpdatedUsers = filteredUsers
          .slice(-8);

        setUsersTable(lastEightUpdatedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
    }
  };

  useEffect(() => {
    // Llamar a getUsersWithProducts sólo si 'users' existe y es un array
    if (Array.isArray(users) && users.length > 0) {
      getUsersWithProducts();
    }
  }, [users]);
  return (
    <div className="min-h-screen max-w-screen ">
      <p
        className="text-center tracking-tighter   text-5xl md:text-7xl mt-10  md:mt-32   mb-5 md:mb-10 font-bold text-black"
        style={{
          opacity: 0.4,
        }}
      >
        Beats & Tracks
      </p>

      {beats && (
        <div className="max-w-screen ">
          <SliderCoverflow beats={beats} />
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
        <div className="w-12/12 md:w-5/12">
          <Table className=" ">
            <TableCaption>
              Una tabla de nuestros ultimos 6 usuarios registrados.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className=""></TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead className="text-center">País</TableHead>
                <TableHead className="text-center hidden md:table-cell ">
                  Generos
                </TableHead>
                <TableHead className="text-center ">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                usersTable.map((e, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div>
                        {e.profilePicture.length >= 5 ? (
                          <img
                            src={`${e.profilePicture}?${new Date().getTime()}`}
                            alt="Profile"
                            className="h-10 w-10 rounded-full border-2 border-violet-500"
                          />
                        ) : (
                          <div className="flex h-10 w-10 rounded-full border-6 border-violet-500 cursor-pointer bg-black items-center justify-center text-white">
                            {e.username[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-geist text-xs font-bold">
                      {e.username.length > 12
                        ? `${e.username.slice(0, 12)}...`
                        : e.username}
                    </TableCell>
                    <TableCell className="font-geist text-xs font-bold">
                      {e.country} {e.country && getFlagEmoji(e.country)}
                    </TableCell>
                    <TableCell className="font-geist text-xs tracking-tighter hidden md:table-cell">
                      {e.genders.map((g) => `${g}, `)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-black"
                        onClick={() => push(`/perfil/${e.username}`)}
                      >
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
        <Button size="lg" onClick={() => push("/descubre")}>
          Descubrir más
        </Button>
      </div>

      <div className=" w-full">
        <p className="text-center font-bold md:text-7xl text-5xl mt-20 font-geist tracking-tighter">
          Membresias
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen mt-10">
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
      <p className="mt-20 text-center font-bold font-geist text-4xl md:text-7xl opacity-55 tracking-tighter">
        Partners exclusivos{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center w-full">
          <video
            src="/videourban.mp4"
            loop
            autoPlay
            playsInline
            muted
            className="w-10/12 rounded-xl my-5"
          />
        </div>
        <div className="flex items-center justify-center">
          <div
            className="w-full"
            style={{ backgroundImage: "url('/fmsbackground.jpeg')" }}
          >
            <p className="font-geist font-bold tracking-tighter text-4xl text-center mt-5">
              Descubrí más sobre ellos
            </p>
            <div className="flex justify-center mb-20 mt-5">
              <Link
                href={"https://urbanroosters.com/"}
                className=" mx-2  w-5/12 md:w-2/12"
              >
                <img
                  src="/urban.jpeg"
                  className="rounded-xl w-full hover:animate-tilt "
                />
              </Link>

              <Link
                href={"https://fms.tv/"}
                className=" mx-2  w-5/12 md:w-2/12"
              >
                <img
                  src="/fms.png"
                  className="rounded-xl w-full hover:animate-tilt"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex justify-center">
        <a href="https://www.passline.com">
          <img src="https://home.passline.com/assets/img/logo.svg"  className=" p-2 bg-gray-950 rounded-xl" />
        </a>
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

                                      response && await updatePoints(user,7)
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

      <div className="flex justify-center">
        <div className="max-w-8/12 md:w-6/12 flex justify-center flex-col items-center">
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
    </div>
  );
};

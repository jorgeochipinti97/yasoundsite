"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import axios from "axios";

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

const Page = () => {
  const { push } = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState(false);

  const { session, status, users } = useUsers();
  useEffect(() => {
    status != "loading" && setIsLoad(true);
  }, [status]);

  useEffect(() => {
    // session && push("/");
  }, [session]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    result.error && setIsError(true);
    if (!result.error) {
      push("/");
    } else {
      console.error(result.error);
    }
  };

  const onForgotPassword = async () => {
    // Supongo que `users` es un array accesible en este contexto.
    const user = users.find((e) => e.email === email); // Cambiado de filter a find.

    // find retorna `undefined` si no encuentra un elemento, así que se verifica correctamente.
    if (!user) {
      alert("usuario no encontrado");
      return;
    }

    // Supongo que `axios` ya está importado y configurado.
    // `user` es el objeto encontrado, entonces usamos `user._id` para acceder al ID.
    const data = await axios.post("/api/regenerate", {
      email: email,
      _id: user._id,
    });
    alert("Revise su correo electrónico");
  };
  return (
    <div className="w-full flex justify-center items-center h-screen bg-black">
      {isLoad && (
        <>
          <div
            style={{ background: "rgba(255, 255, 255, 1)" }}
            className=" flex flex-col shadow h-fit py-10 mt-20 items-center border-2 w-11/12 md:w-6/12 rounded-xl justify-center "
          >
            <img src="/logo.png" className=" w-[15vw]" />{" "}
            <p className="text-4xl tracking-tighter font-bold mb-2">
              Inicio de sesión
            </p>
            <Separator className="w-6/12  mb-5" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center "
            >
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="my-2"
              />
              <Input
                className="my-2"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
              />
              {isError && (
                <p className="tracking-tighter">
                  Hubo un error con la autenticacion
                </p>
              )}

              <Button type="submit" className="my-2 hover:animate-tilt ">
                Ingresar
              </Button>
            </form>
            <Separator className=" w-6/12 my-2" />
            <p className="font-bold tracking-tighter">
              ¿No estás registrado? ¡Unete a Yasound!
            </p>
            <Link href={"/register"}>
              <Button className="my-2 hover:animate-tilt">Registrarme</Button>
            </Link>
            <div className="mt-5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Olvide mi contraseña</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Olvidaste tu contraseña?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      No te preocupes, ingresa tu mail y te llegaran las
                      instrucciones para restaurarla.
                    </AlertDialogDescription>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email"
                      className="mt-5"
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onForgotPassword}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

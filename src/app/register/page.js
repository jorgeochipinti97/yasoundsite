"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";

const Page = () => {
  const { push } = useRouter();
  const { session, users } = useUsers();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    session && push("/");
  }, [session]);

  function validateUsername(username) {
    return /^[a-zA-Z0-9_-]+$/.test(username);
  }

  const isNewUser = (email, username, users) => {
    const isEmailRepeat = users.some((user) => user.email === email);
    const isUsernameRepeat = users.some((user) => user.username === username);

    return !isEmailRepeat && !isUsernameRepeat;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const email = event.target.email.value;
      const password = event.target.password.value;
      const name = event.target.name.value;
      const phone = event.target.phone.value;
      const username = event.target.username.value;

      if (!validateUsername(username)) {
        setErrorMessage(
          "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos."
        );
        return;
      }
      if (isNewUser(email, username, users)) {
        const result = await axios.post("/api/auth/register", {
          username: username,
          email: email,
          password: password,
          name: name,
          phone: phone,
        });

        result && push("/login");
      } else {
        setErrorMessage("Email o usuario ya existente");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center  min-h-screen bg-black">
      <div className="bg-white flex flex-col shadow h-fit py-20 mt-28 items-center border-2 w-fit px-20 rounded-xl justify-center ">
        <div className="w-full flex">
          <a href="/">
            <Button
              variant="outline"
              className=" bg-gray-900 p-5 hover:bg-gray-700"
            >
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g
                  fill="none"
                  stroke="#f5f5f7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                >
                  <path d="M244 400L100 256 244 112"></path>
                  <path d="M120 256L412 256"></path>
                </g>
              </svg>
            </Button>
          </a>
        </div>
        <img src="/logo.png" className="w-[15vw]" />
        <p className="text-4xl tracking-tighter font-bold mb-2">Registro</p>
        <Separator className="w-6/12  mb-5" />

        <form onSubmit={handleSubmit}>
          <section className="grid grid-cols-2 gap-2">
            <Input
              className="my-2"
              type="name"
              name="name"
              placeholder="john doe"
              required
            />
            <Input
              className="my-2"
              type="phone"
              name="phone"
              placeholder="+555555"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="tumail@mail.com"
              required
              className="my-2"
            />
            <Input
              type="username"
              name="username"
              placeholder="Username"
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
          </section>
          {errorMessage && (
            <p className="mt-5 font-geist tracking-tighter ">{errorMessage}</p>
          )}
          <section className="flex justify-center mt-5  ">
            <Button type="submit" className="my-2 hover:animate-tilt ">
              Registrarme
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Page;

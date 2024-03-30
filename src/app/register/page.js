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
  const { session, status } = useUsers();

  const [useForm, setUseForm] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  useEffect(() => {
    session && push("/");
  }, [session]);


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const email = event.target.email.value;
      const password = event.target.password.value;
      const name = event.target.name.value;
      const phone = event.target.phone.value;
      const username = event.target.username.value;

      const result = await axios.post("/api/auth/register", {
        username: username,
        email: email,
        password: password,

        name: name,
        phone: phone,
      });
      result && push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-black">
      <div className="bg-white flex flex-col shadow h-fit py-10 mt-28 items-center border-2 w-fit px-20 rounded-xl justify-center ">
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

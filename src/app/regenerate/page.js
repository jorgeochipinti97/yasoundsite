"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hashPassword } from "@/lib/auth";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { push } = useRouter();

  const getUsers = async () => {
    const response = await axios.get("/api/users");
    response && console.log(response.data.data.filter((e) => e._id == id)[0]);
  };

  const searchParamas = useSearchParams();

  useEffect(() => {
    searchParamas && setId(searchParamas.get("id"));
  }, []);
  useEffect(() => {
    id && getUsers();
  }, [id]);

  const onClick = () => {
    if (password != password2) {
      alert("Las contraseñas deben coincidir");
      return;
    }
    changePassword();
  };

  const changePassword = async () => {
    const updateUser = await axios.put("/api/users", {
      _id: id,
      password: password,
    });
    updateUser && push("/login");
  };
  return (
    <div
      className="h-screen w-screen flex items-center flex-col justify-center
    "
    >
      <div className="flex justify-center w-screen">
        <p className="font-bold text-center tracking-tighter font-geist text-4xl">
          Recuperación de contraseña
        </p>
      </div>
      <div className="mt-5">
        <Input
          className="my-2"
          placeholder="Nueva contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          className="my-2"
          placeholder="Repite la contraseña"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Button className="mt-2" onClick={onClick}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default Page;

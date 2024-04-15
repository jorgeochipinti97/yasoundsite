"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TermsComponent } from "@/components/Terms/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { paises } from "@/utils/paises";
import { generosList } from "@/utils/generos";
import { Badge } from "../ui/badge";

export const RegisterForm = () => {
  const { push } = useRouter();
  const { session, users } = useUsers();
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [country, setcountry] = useState("");
  const inputFileRef = useRef(null);
  const [selectedGenders, setSelectedGenders] = useState([]);

  const removeGender = (genderToRemove) => {
    const newSelectedGenders = selectedGenders.filter(
      (gender) => gender !== genderToRemove
    );
    setSelectedGenders(newSelectedGenders);
  };

  useEffect(() => {
    if (session) {
      push("/"); // Redirige al inicio si el usuario ya está logueado
    }
  }, [session, push]);

  const validateUsername = (username) => /^[a-zA-Z0-9_-]+$/.test(username);

  const isNewUser = (email, username, users) => {
    const isEmailRepeat = users.some(
      (user) => user.email === email.toLowerCase()
    );
    const isUsernameRepeat = users.some(
      (user) => user.username === username.toLowerCase()
    );
    return !isEmailRepeat && !isUsernameRepeat;
  };
  const handleCheckboxChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    console.log(country);
  }, [country]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password");
    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const username = formData.get("username").trim().toLowerCase();

    if (!validateUsername(username)) {
      setErrorMessage(
        "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos."
      );
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("Debes aceptar los términos y condiciones.");
      return;
    }

    if (!isNewUser(email, username, users)) {
      setErrorMessage("Email o usuario ya existente.");
      return;
    }

    if (!selectedImage) {
      setErrorMessage("Por favor, selecciona una imagen para el perfil.");
      return;
    }
    if (!country) {
      setErrorMessage("Por favor, selecciona una imagen para el perfil.");
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("username", username);
    imageFormData.append("file", selectedImage);

    try {
      const {
        data: { fileUrl },
      } = await axios.post("/api/profilePicture", imageFormData);
      const userData = {
        username,
        email,
        password,
        name,
        phone,
        profilePicture: fileUrl,
        country: country,
        genders: selectedGenders,
      };

      const response = await axios.post("/api/auth/register", userData);
      if (response) {
        resetForm();
        push("/login");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al procesar tu solicitud.");
    }
  };

  const resetForm = () => {
    setErrorMessage("");
    setSelectedImage(null);
    setAcceptTerms(false);
    // Reset additional form fields if necessary
  };
  const handleSelectChange = (selectedValue) => {
    let newSelection = [...selectedGenders];
    if (newSelection.includes(selectedValue)) {
      newSelection = newSelection.filter((value) => value !== selectedValue);
    } else {
      if (newSelection.length < 3) {
        newSelection.push(selectedValue);
      }
    }
    setSelectedGenders(newSelection);
  };
  return (
    <div className="bg-white flex flex-col shadow h-[80vh] py-20 mt-10 items-center border-2 w-fit  rounded-xl justify-center ">
      <ScrollArea className="h-[60vh] w-11/12">
        <input
          type="file"
          ref={inputFileRef}
          onChange={handleChangeImage}
          style={{ display: "none" }}
          accept="image/*" // Asegura que solo se puedan seleccionar imágenes
        />
        <img src="/logo.png" className="w-[20vw] md:w-[10vw]" />
        <p className="text-4xl tracking-tighter font-bold mb-2">Registro</p>
        <Separator className="w-6/12  mb-5" />

        <form onSubmit={handleSubmit} className="w-full">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
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
              placeholder="+541132443355"
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

            <div className="flex justify-center">
              <Select className="my-2" onValueChange={(e) => setcountry(e)}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Elige tu país" />
                </SelectTrigger>
                <SelectContent>
                  {paises.map((e) => (
                    <SelectItem key={e.country} value={e.country}>
                      {e.country} {e.emoji}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="my-2">
              <Select className="my-2" onValueChange={handleSelectChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Elige tus Géneros (3)" />
                </SelectTrigger>
                <SelectContent>
                  {generosList.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={handleClick}
                variant="outlined"
                type="button"
                className={`border-black border shadow-xs tracking-tighter shadow-gray-400`}
              >
                {" "}
                <svg
                  className="mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  width={20}
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
                      d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
                      fill="#292D32"
                    ></path>{" "}
                    <path
                      d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                      fill="#292D32"
                    ></path>{" "}
                  </g>
                </svg>{" "}
                Sube una foto de perfil
              </Button>
            </div>
            <div>
              {selectedGenders.map((e, index) => (
                <Badge key={index} variant={"outline"} className="mx-1">
                  <span
                    onClick={() => removeGender(e)} // Llamada a la función para eliminar el género
                    className="mr-2 text-black border rounded-full px-2 cursor-pointer bg-white"
                  >
                    x
                  </span>{" "}
                  {e}
                </Badge>
              ))}
            </div>
          </section>
          <div className="flex mt-5">
            <input
              checked={acceptTerms}
              onChange={handleCheckboxChange}
              className="mr-2 focus:bg-fuchsia-400"
              type="checkbox"
              id="cbox2"
              value="second_checkbox"
            />

            <Dialog>
              <DialogTrigger className="font-geist font-light">
                {" "}
                Para registrarte debes aceptar nuestras{" "}
                <span className="font-bold ">
                  políticas y los terminos y condiciones
                </span>
              </DialogTrigger>
              <DialogContent className="">
                <ScrollArea className="h-[60vh]">
                  <TermsComponent />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-[30px] my-3">
            {errorMessage && (
              <p className=" font-geist tracking-tighter ">{errorMessage}</p>
            )}
          </div>
          <section className="flex justify-center mt-5  ">
            <Button
              type="submit"
              disabled={acceptTerms ? false : true}
              className="my-2 hover:animate-tilt "
            >
              Registrarme
            </Button>
          </section>
        </form>
      </ScrollArea>
    </div>
  );
};

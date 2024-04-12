import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { generosList } from "@/utils/generos";
import { Badge } from "../ui/badge";
import { paises } from "@/utils/paises";
import { AlertComponent } from "../ui/AlertComponent";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

export const PersonalForm = ({ user }) => {
  const { push } = useRouter();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const { alertProps, showAlert } = useAlert();
  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      email: "",
      name: "",
      username: "",
      phone: "",
      role: "",
      country: "",
      profilePicture: "",
      genders: [],
    },
  });

  const redirectUri = encodeURIComponent("https://yasound.site/oauth");

  const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=4632397606638218&response_type=code&platform_id=mp&state=12312312&redirect_uri=${redirectUri}`;

  useEffect(() => {
    user && setValue("genders", user.genders);
    user && setSelectedGenders(user.genders);
  }, [user]);

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
    setValue("genders", newSelection, { shouldValidate: true });
  };
  const onSubmit = async (data) => {
    const response = await axios.put("/api/users", {
      _id: user._id,
      ...data,
    });

    response.data &&
      showAlert(
        "Usuario actualizado con éxito",
        "¡Gracias por confiar en nosotros!",
        <svg
          width={25}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
  };
  const inputFileRef = useRef(null);

  // Función para manejar el clic en el botón, que activa el input de tipo archivo
  const handleClick = () => {
    inputFileRef.current.click();
  };
  const handleChangeImages = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        alert("No file selected.");
        return;
      }

      if (!user.username) {
        alert("You need to be logged in to change your profile image.");
        return;
      }

      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("file", file);
      const response = await axios.post("/api/profilePicture", formData);
      response &&
        showAlert(
          "Imagen de perfil actualizada con éxito",
          "¡Gracias por confiar en nosotros!",
          <svg
            width={25}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        );
      setValue("profilePicture", response.data.fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const removeGender = (genderToRemove) => {
    // Filtrar el género que se quiere eliminar
    const newSelectedGenders = selectedGenders.filter(
      (gender) => gender !== genderToRemove
    );

    // Actualizar el estado local
    setSelectedGenders(newSelectedGenders);

    // Actualizar el valor en React Hook Form
    setValue("genders", newSelectedGenders, { shouldValidate: true });
  };
  useEffect(() => {
    user && user && setValue("email", user.email);
    user && user.name && setValue("name", user.name);
    user && user.username && setValue("username", user.username);
    user && user.phone && setValue("phone", user.phone);

    user && user.phone && setValue("role", user.role);
    user && user.phone && setValue("country", user.country);
  }, [user]);
  return (
    <ScrollArea className="h-[60vh] md:h-[80vh] flex justify-center flex-col items-center rounded-md  px-1-">
      <div className="flex flex-col justify-center items-center">
        <AlertComponent {...alertProps} />
        <div className="w-full flex justify-center">
          {/* <p className="font-bold tracking-tighter ">
            Si deseas recibir cobros por MercadoPago, conectá tu cuenta.{" "}
          </p> */}
        </div>
        {user && (
          <div className="w-6/12 my-2 flex justify-start  ">
            <div className="w-full flex justify-start">
              <Button
                onClick={() => push(authorizationUrl)}
                className="bg-sky-600 hover:bg-sky-700"
              >
                {user.tokens.access_token
                  ? "Renovar MercadoPago"
                  : "Conectar MercadoPago"}
              </Button>
            </div>
          </div>
        )}
        <form className="w-6/12  " onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleChangeImages}
              style={{ display: "none" }}
              accept="image/*" // Asegura que solo se puedan seleccionar imágenes
            />
            <div className="flex items-center">
              <Button
                onClick={handleClick}
                variant="outlined"
                type="button"
                className={`${
                  user && user.username ? "" : "hidden"
                } border mx-2 border-black shadow-xs tracking-tighter shadow-gray-400`}
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
                Foto de perfil
              </Button>
            </div>
          </div>
          <Input
            className="my-2"
            placeholder="email"
            {...register("email", { required: true })}
          />

          <Input
            className="my-2"
            placeholder="nombre"
            {...register("name", { required: true })}
          />

          <Input
            className="my-2"
            placeholder="username"
            {...register("username", { required: true })}
          />

          <Input
            className="my-2"
            placeholder="celular"
            {...register("phone", { required: true })}
          />

          <div className="my-2">
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  className="my-2"
                  name={name}
                  ref={ref}
                  value={value}
                  onValueChange={onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Elige tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productor">productor</SelectItem>
                    <SelectItem value="musico">musico</SelectItem>
                    <SelectItem value="beatmaker">beatmaker</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="my-2">
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  className="my-2"
                  name={name}
                  ref={ref}
                  value={value}
                  onValueChange={onChange}
                >
                  <SelectTrigger className="w-[180px]">
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
              )}
            />
          </div>
          <div className="my-2">
            <Select className="my-2" onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[200px]">
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
          <div className="mt-5">
            <Button>
              <svg
                width={20}
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f5f5f7"
                  fillRule="evenodd"
                  d="M1.265 4.426C1.043 2.872 2.617 1.68 4.053 2.314l17.781 7.857c1.589.702 1.589 2.956 0 3.658l-17.78 7.857c-1.437.635-3.011-.558-2.789-2.112l.726-5.082a1.2 1.2 0 01.897-.995L8.877 12l-5.99-1.497a1.2 1.2 0 01-.896-.995l-.726-5.082zM21.025 12L3.246 4.143l.65 4.55 8.96 2.24c1.11.278 1.11 1.856 0 2.134l-8.96 2.24-.65 4.55L21.025 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

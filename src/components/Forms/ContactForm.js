import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAlert } from "@/hooks/useAlert";
import { Textarea } from "../ui/textarea";
import { AlertComponent } from "../ui/AlertComponent";

export const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      name: "",
      message: "",
      phone: "",
    },
  });
  const { alertProps, showAlert } = useAlert();

  const onSubmit = async (data) => {
    const response = await axios.post("/api/contact", data);
    response && reset();
    response && alert("mensaje enviado con éxito");
  };
  return (
    <>
      <div className="flex  flex-col  w-fit  justify-start p-5 rounded-md">
        <AlertComponent {...alertProps} />
        <div className="mx-5">
          <p className=" font-bold text-5xl tracking-tighter text-white ">
            Contactanos{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mt-5">
            <div className="mb-2">
              <Label className="text-white font-bold ">Nombre</Label>
              <Input {...register("name")} />
            </div>
            <div className="mb-2">
              <Label className="text-white font-bold ">Email</Label>
              <Input {...register("email")} />
            </div>
            <div className="mb-2">
              <Label className="text-white font-bold ">Celular</Label>
              <Input {...register("phone")} />
            </div>
            <div className="mb-2">
              <Label className="text-white font-bold ">Mensaje</Label>
              <Textarea {...register("message")} />
            </div>
            <Button
              variant="outline"
              type="submit"
              className="mt-5 hover:animate-tilt"
            >
              <svg
                width={20}
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
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
    </>
  );
};

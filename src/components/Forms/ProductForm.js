"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm, useFieldArray } from "react-hook-form";

import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useUsers } from "@/hooks/useUsers";
import { ScrollArea } from "../ui/scroll-area";
import { useAlert } from "@/hooks/useAlert";
import { AlertComponent } from "../ui/AlertComponent";

export const ProductForm = ({ product }) => {
  const { alertProps, showAlert } = useAlert();

  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        file: "",
        owner: "",
        description: "",
        title: "",
        licenses: [{ title: "", description: "", price: 0 }],
      },
    });

  const { user } = useUsers();

  const inputFileRef = useRef(null);
  const inputImgRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleImgChange = (event) => {
    setSelectedImg(event.target.files[0]);
  };

  const handleClickFile = () => {
    inputFileRef.current.click();
    console.log("click");
  };
  const handleClickImage = () => {
    inputImgRef.current.click();
    console.log("click");
  };

  const {
    fields: licenseFields,
    append: appendLicense,
    remove: removeLicense,
  } = useFieldArray({
    control,
    name: "licenses",
  });

  const onSubmit = async (data) => {
    if (!selectedFile && !product) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    const formDataImg = new FormData();
    formData.append("file", selectedFile);
    formData.append("username", user.username);

    formDataImg.append("file", selectedImg);
    formDataImg.append("username", user.username);

    try {
      const response = await axios.post("/api/s3", formData);
      const responseImage = await axios.post("/api/s3", formDataImg);
      const fileUrl = response.data.fileUrl;
      const imageUrl = responseImage.data.fileUrl;

      if (fileUrl && imageUrl) {
        let productData = {
          ...data,
          file: {
            url: fileUrl,
            fileType: getValues("fileType"),
          },
          image: imageUrl,
          owner: user.username,
        };

        const url = "/api/products";
        const method = "post";

        await axios({
          method,
          url,
          data: productData,
        });

        showAlert(
          "Éxito", // Título del alerta
          // `Producto ${product?._id ? "actualizado" : "creado"} con éxito.`, // Mensaje del alerta
          "success" // Tipo de alerta, por ejemplo: success, error, info, etc. Ajusta según tu implementación de showAlert
        );
      }
    } catch (er) {
      console.log(er);
      showAlert("Error", "Hubo un problema al procesar tu solicitud.", "error");
    }
  };

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        file: product.file,
        owner: product.owner,
        licenses: product.licenses,
      });
    }
  }, [product, reset]);

  return (
    <div className="w-full flex justify-center items ">
      <AlertComponent {...alertProps} />
      <div className="w-10/12 md:w-6/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScrollArea className="h-[60vh]">
            <div>
              <Label>Nombre</Label>
              <Input {...register("title")} />
            </div>
            <div className="mt-5">
              <Label>Descripción</Label>
              <Input {...register("description")} />
            </div>
            <div className="mt-5">
              <Select onValueChange={(e) => setValue("fileType", e)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Elige el formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"mp3"}>MP3</SelectItem>
                  <SelectItem value={"wav"}>WAV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-5  flex flex-col">
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".mp3, .wav, .midi"
              />
              <input
                type="file"
                ref={inputImgRef}
                style={{ display: "none" }}
                onChange={handleImgChange}
                accept="image/*"
              />

              <div className="my-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClickFile()}
                >
                  <svg
                    width={20}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g stroke="#1C274C" strokeWidth="1.5">
                      <path d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024.947 1.024.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464-.897.743-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743-.897-.743-1.072-1.983-1.422-4.464l-.422-3z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0v-6.5c0 1.657 1.895 3 3 3"
                      ></path>
                      <path
                        d="M19.562 7a2.132 2.132 0 00-2.1-2.5H6.538a2.132 2.132 0 00-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 00-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 00-1.787 1.993c0 .107.014.237.043.496"
                        opacity="0.5"
                      ></path>
                    </g>
                  </svg>
                  Subir archivo
                </Button>
              </div>
              <div className="my-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClickImage()}
                >
                  <svg
                    width={20}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.264 15.938l-1.668-1.655c-.805-.798-1.208-1.197-1.67-1.343a2 2 0 00-1.246.014c-.458.155-.852.563-1.64 1.379L4.045 18.28m10.22-2.343l.341-.338c.806-.8 1.21-1.199 1.671-1.345a2 2 0 011.248.015c.458.156.852.565 1.64 1.382l.836.842m-5.736-.555l4.011 4.018m0 0c-.357.044-.82.044-1.475.044H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874 1.845 1.845 0 01-.174-.628m14.231 1.676a1.85 1.85 0 00.633-.174 2 2 0 00.874-.874C20 18.48 20 17.92 20 16.8v-.307M4.044 18.28C4 17.922 4 17.457 4 16.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C20 5.52 20 6.08 20 7.2v9.293M17 9a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Subir imagen
                </Button>
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <Separator />
              <p className="text-xl mt-5 font-bold tracking-thiger font-geist">
                Licencias
              </p>
              {licenseFields.map((item, index) => (
                <div key={item.id} className="mt-5">
                  <Label>Titulo</Label>
                  <Input {...register(`licenses.${index}.title`)} />
                  <Label>Description</Label>
                  <Textarea {...register(`licenses.${index}.description`)} />
                  <Label>Price</Label>
                  <Input
                    type="number"
                    {...register(`licenses.${index}.price`)}
                  />
                  <Button
                    variant="destructive"
                    className="mt-2"
                    type="button"
                    onClick={() => removeLicense(index)}
                  >
                    Remove License
                  </Button>
                </div>
              ))}
              <div className="mt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    appendLicense({ type: "", description: "", price: 0 })
                  }
                >
                  Agregar Licencia
                </Button>
              </div>
            </div>
            <div className="mt-10">
              <div className="mt-5">
                <Button type="submit">
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
            </div>
          </ScrollArea>
        </form>
      </div>
    </div>
  );
};

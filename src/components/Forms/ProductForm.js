"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useUsers } from "@/hooks/useUsers";
import { ScrollArea } from "../ui/scroll-area";
import { useAlert } from "@/hooks/useAlert";
import { AlertComponent } from "../ui/AlertComponent";
import gsap, { Power1 } from "gsap";
import { generosList } from "@/utils/generos";
import { Badge } from "../ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RightsComponent from "../Rights/page";

export const ProductForm = ({ product }) => {
  const [isLoading, setIsLoading] = useState();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [tags, setTags] = useState([]);
  const { alertProps, showAlert } = useAlert();

  const { user } = useUsers();
  const inputFileRef = useRef(null);
  const inputImgRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      file: "",
      owner: "",
      description: "",
      genders: [],
      title: "",
      licenses: [
        {
          title: "Licencia Estándar",
          description:
            "Esta licencia permite la grabación y distribución de música con el derecho a producir hasta 3,000 copias físicas y 300,000 transmisiones de audio en línea. Incluye también la creación de un video musical, derechos de transmisión en radio sin límites de estaciones, y la posibilidad de realizar actuaciones en vivo con fines de lucro. Ideal para artistas y productores que buscan ampliar su presencia en el mercado y maximizar el alcance de su música.",
          price: 1,
          priceArs: 0,
        },
        {
          title: "Licencia Premium",
          description:
            "Esta licencia autoriza la grabación y distribución de música, permitiendo hasta 5,000 copias físicas y 500,000 transmisiones de audio en línea. Además, se incluye la producción de un vídeo musical y derechos ilimitados para transmisiones de radio. También se permite la realización de actuaciones en vivo con fines de lucro, brindando una amplia libertad para maximizar la visibilidad y rentabilidad del trabajo musical.",
          price: 1,
          priceArs: 0,
        },
        {
          title: "Licencia VIP",
          description:
            "Esta licencia ofrece derechos ilimitados para la grabación y distribución de música, permitiendo la producción y distribución de un número ilimitado de copias físicas y transmisiones de audio en línea. Incluye la creación de vídeos musicales sin restricciones y derechos de transmisión en radio a través de estaciones ilimitadas. Además, autoriza la realización de actuaciones en vivo con fines de lucro, proporcionando una libertad total para maximizar el alcance y los ingresos del contenido musical.",
          price: 1,
          priceArs: 0,
        },
      ],
    },
  });

  const { fields, remove, update, append } = useFieldArray({
    control,
    name: "licenses",
  });

  const handleCheckboxChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    showAlert(
      "Éxito",
      "Archivo cargado con éxito",
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
  const handleImgChange = (event) => {
    setSelectedImg(event.target.files[0]);
    showAlert(
      "Éxito",
      "Imagen cargado con éxito",
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

  const handleClickFile = () => {
    inputFileRef.current.click();
  };
  const handleClickImage = () => {
    inputImgRef.current.click();
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault(); 
      let value = event.target.value.trim(); 
      if (value) {
        setTags([...tags, value]); 
        setValue("tags", [...tags, value]);
        event.target.value = ""; 
      }
    }
  };

  const standardLicenses = [
    {
      title: "Licencia Estándar",
      description:
        "Esta licencia permite la grabación y distribución de música con el derecho a producir hasta 3,000 copias físicas y 300,000 transmisiones de audio en línea. Incluye también la creación de un video musical, derechos de transmisión en radio sin límites de estaciones, y la posibilidad de realizar actuaciones en vivo con fines de lucro. Ideal para artistas y productores que buscan ampliar su presencia en el mercado y maximizar el alcance de su música.",
      price: 1,
      priceArs: 0,
    },
    {
      title: "Licencia Premium",
      description:
        "Esta licencia autoriza la grabación y distribución de música, permitiendo hasta 5,000 copias físicas y 500,000 transmisiones de audio en línea. Además, se incluye la producción de un vídeo musical y derechos ilimitados para transmisiones de radio. También se permite la realización de actuaciones en vivo con fines de lucro, brindando una amplia libertad para maximizar la visibilidad y rentabilidad del trabajo musical.",
      price: 1,
      priceArs: 0,
    },
    {
      title: "Licencia VIP",
      description:
        "Esta licencia ofrece derechos ilimitados para la grabación y distribución de música, permitiendo la producción y distribución de un número ilimitado de copias físicas y transmisiones de audio en línea. Incluye la creación de vídeos musicales sin restricciones y derechos de transmisión en radio a través de estaciones ilimitadas. Además, autoriza la realización de actuaciones en vivo con fines de lucro, proporcionando una libertad total para maximizar el alcance y los ingresos del contenido musical.",
      price: 1,
      priceArs: 0,
    },
  ];

  const removeTag = (index) => {
    const newTags = tags.filter((tag, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags); // Actualiza el campo en React Hook Form
  };
  const removeGender = (genderToRemove) => {
    const filteredGenders = selectedGenders.filter(
      (gender) => gender !== genderToRemove
    );

    // Actualiza el estado con el nuevo array de géneros seleccionados
    setSelectedGenders(filteredGenders);

    // Actualiza el valor en React Hook Form
    setValue("genders", filteredGenders, { shouldValidate: true });
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
    setValue("genders", newSelection, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      showAlert("Debes aceptar los terminos y condiciones", "", <></>);
      return;
    }

    try {
      if (!product || !product.file || !product.file.url) {
        if (!selectedFile) {
          alert("Por favor, selecciona un archivo primero.");
          return;
        }

        setIsLoading(true);
        showAlert(
          "Estamos procesando la carga del Beat",
          "Por favor sea paciente",
          <></>
        );

        const originalName = selectedFile.name;

        const extension = originalName.split(".").pop();

        const fileName = `${user.username}-${Date.now()}.${extension}`;

        const fileData = {
          fileName: fileName,
          fileType: selectedFile.type,
        };

        const response = await axios.post("/api/getSigned", fileData);
        if (response && response.data && response.data.url) {
          await axios.put(response.data.url, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
            },
          });

          const formDataImg_ = new FormData();
          formDataImg_.append("file", selectedImg);
          formDataImg_.append("username", user.username);
          const responseImage = await axios.post("/api/s3", formDataImg_);
          const imageUrl_ = responseImage.data.fileUrl;

          if (response && imageUrl_) {
            let productData = {
              ...data,
              file: {
                url: `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/${fileName}`,
                fileType: selectedFile.type,
              },
              image: imageUrl_,
              owner: user._id,
            };

            const createProduct = await axios.post(
              "/api/products",
              productData
            );
            createProduct &&
              gsap.to(".pantallacarga", {
                opacity: 0,
                ease: Power1.easeIn,
              });
            createProduct &&
              gsap.to(".pantallacarga", {
                display: "none",
                delay: 1,
              });
            createProduct &&
              showAlert(
                "Éxito",
                "Producto  actualizado con éxito",
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
            createProduct && reset();
            createProduct && setSelectedGenders([]);
            createProduct && setTags([]);
          }
        }
      } else {
        const urlParts = product.image.split("/");
        const fileName_ = urlParts.pop();
        const deleteImage = await axios.put("/api/s3", { fileName: fileName_ });
        deleteImage && console.log("eliminada");
        const formdataUpdateImage = new FormData();
        formdataUpdateImage.append("file", selectedImg);
        formdataUpdateImage.append("username", user.username);
        const responseImage = await axios.post("/api/s3", formdataUpdateImage);
        const imageUrl_ = responseImage.data.fileUrl;

        imageUrl_ &&
          showAlert(
            "Imagen actualizada con éxito",
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

        let productData = {
          _id: product._id,
          description: data.description,
          title: data.title,
          licenses: data.licenses,
          image: imageUrl_,
          genders: selectedGenders,
          tags: tags,
        };

        const response = await axios.put("/api/products", productData);

        response &&
          gsap.to(".pantallacarga", {
            opacity: 0,
            ease: Power1.easeIn,
          });
        response &&
          gsap.to(".pantallacarga", {
            display: "none",
            delay: 1,
          });
        response &&
          showAlert(
            "Éxito",
            "Producto  actualizado con éxito",
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
          response && setIsLoading(false);
        response.data.data._id &&
          (await axios.put("/api/users", {
            _id: user._id,
            products: [...user.products, response.data._id],
          }));
      }
    } catch (er) {
      console.log(er);
      showAlert("Error", "Hubo un problema al procesar tu solicitud.", <></>);
      setIsLoading(false);

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

  useEffect(() => {
    isLoading &&
      gsap.to(".pantallacarga", {
        display: "block",
      });
    isLoading &&
      gsap.to(".pantallacarga", {
        opacity: 1,
        delay: 1,
      });
  }, [isLoading]);

  return (
    <div>
      <AlertComponent {...alertProps} />
      <div
        className="w-screen h-screen bg-white/30 absolute top-0 right-0 z-50 pantallacarga"
        style={{ display: "none", opacity: 0 }}
      >
        <div className="  flex items-center flex-col justify-center h-full w-full">
          <span class="loader z-50"></span>
          <p className="font-geist font-bold tracking-tighter mt-10 text-4xl">
            Por favor sea paciente
          </p>
        </div>
      </div>
      <ScrollArea className="h-[60vh] ">
        <div className="w-full flex justify-center ">
          <div className="w-10/12 md:w-6/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label>Nombre</Label>
                <Input {...register("title")} />
              </div>
              <div className="mt-5">
                <Label>Descripción</Label>
                <Input {...register("description")} />
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
                  {product && product.file.url ? (
                    <p className="font-geist text-xs tracking-tighter font-bold">
                      Ya subiste el archivo de audio
                    </p>
                  ) : (
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
                  )}
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
              <Separator className="my-5" />
              <div>
                <Input
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe las etiquetas y presiona espacio..."
                  {...register("tagInput")} // Registra el input para React Hook Form
                />
                <div className="mt-5">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant={"outline"} className="mx-1">
                      <span
                        className="mr-2 text-black border rounded-full px-2 cursor-pointer bg-white"
                        onClick={() => removeTag(index)}
                      >
                        x
                      </span>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator className="my-5" />
              <div className="my-5">
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
                      onClick={() => removeGender(e)}
                      className="mr-2 text-black border rounded-full px-2 cursor-pointer bg-white"
                    >
                      x
                    </span>{" "}
                    {e}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col mt-5">
                <Separator />
                <p className="text-xl my-5 font-bold tracking-thiger font-geist">
                  Licencias
                </p>

                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Más información</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Nuestras Licencias Estandar</DialogTitle>
                      </DialogHeader>
                      <Accordion type="single" collapsible className="w-full">
                        <div>
                          {standardLicenses.map((e, index) => (
                            <AccordionItem value={index + 1} key={index}>
                              <AccordionTrigger>{e.title}</AccordionTrigger>
                              <AccordionContent>
                                {e.description}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      </Accordion>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="my-5">
                  {fields.map((field, index) => (
                    <div key={index} className="mt-5">
                      <Input
                        {...register(`licenses.${index}.title`)}
                        placeholder="Titulo de la Licencia"
                        className="my-2"
                      />
                      <Textarea
                        {...register(`licenses.${index}.description`)}
                        placeholder="Descripción de la Licencia"
                        className="my-2"
                      />
                      <p className="font-geist tracking-tighter font-bold text-xl mt-5">
                        Precio en USD
                      </p>
                      <Input
                        type="number"
                        min="0" // Ensures the input cannot be negative
                        {...register(`licenses.${index}.price`, {
                          setValueAs: (value) =>
                            value === "" ? null : parseFloat(value),
                          validate: (value) => value >= 0, // Additional validation rule
                        })}
                        placeholder="Price USD"
                        className="my-2"
                      />
                      <p className="font-geist tracking-tighter font-bold text-xl mt-5">
                        Precio en ARS
                      </p>
                      <Input
                        type="number"
                        min="0" // Ensures the input cannot be negative
                        {...register(`licenses.${index}.priceArs`, {
                          setValueAs: (value) =>
                            value === "" ? null : parseFloat(value),
                          validate: (value) => value >= 0, // Additional validation rule
                        })}
                        placeholder="Price ARS"
                        className="my-2"
                      />
                      <Button
                        variant="destructive"
                        type="button"
                        className="mt-5"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </Button>
                      <Separator className="my-5" />
                    </div>
                  ))}
                </div>
                <div>
                  <Button
                    className="bg-black hover:bg-gray-500 text-white"
                    disabled={fields.length >= (user && user.premium ? 5 : 2)}
                    type="button"
                    onClick={() =>
                      append({
                        title: "",
                        description: "",
                        price: 0,
                        priceArs: 0,
                      })
                    }
                  >
                    Agregar licencia
                  </Button>
                </div>
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

                <Dialog>
                  <DialogTrigger className="font-geist text-xs font-light">
                    {" "}
                    Para registrarte debes aceptar nuestras{" "}
                    <span className="font-bold ">
                      políticas y los terminos y condiciones
                    </span>
                  </DialogTrigger>
                  <DialogContent className="">
                    <ScrollArea className="h-[60vh]">
                      <RightsComponent />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-10">
                <div className="mt-5">
                  <Button type="submit" disabled={isLoading || !acceptTerms}>
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
                    Guardar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

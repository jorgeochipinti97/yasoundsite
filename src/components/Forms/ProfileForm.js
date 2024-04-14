import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Textarea } from "../ui/textarea";

import { useUsers } from "@/hooks/useUsers";
import axios from "axios";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useForm } from "react-hook-form";
import { AlertComponent } from "../ui/AlertComponent";
import { useAlert } from "@/hooks/useAlert";

export const ProfileForm = () => {
  const { user } = useUsers();
  const [images, setImages] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const { alertProps, showAlert } = useAlert();

  const [colors, setColors] = useState([
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
  ]);

  const inputFileRef = useRef(null);

  const platforms = [
    "Spotify",
    "Instagram",
    "Web",
    "Apple Music",
    "TikTok",
    "Facebook",
    "X",
    "YouTube",
  ]; // Lista de plataformas

  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      colors: [],
      bio: "",
      videos: [],
      links: [],
      images: [],
    },
  });
  const [youtubeVideos, setYoutubeVideos] = useState([]);

  const handleImageUpload = async (event) => {
    try {
      const response = await axios.post("/api/s3", formData);

      const newImageUrl = response.data.fileUrl;
      console.log(response.data.fileUrl);
      response.data.fileUrl &&
        setImages((prevImages) => {
          const updatedImages = [...prevImages, newImageUrl];
          return updatedImages;
        });
      response.data.fileUrl &&
        setValue("images", [...getValues("images"), newImageUrl]); // Añade la nueva imagen al array existente
    } catch (error) {
      // Manejar error en la subida
      console.error("Error subiendo archivos:", error);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    const fileName = imageUrl.split("/").pop();
    console.log(fileName);
    try {
      await axios.put("/api/s3", JSON.stringify({ fileName: fileName }));
      setImages(images.filter((image) => image !== imageUrl));
      setValue(
        "images",
        getValues("images").filter((image) => image !== imageUrl)
      );
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handleColorChange = (event) => {
    // Supongamos que selectedColorIndex se establece en algún lugar para indicar qué color estamos cambiando
    const newColors = [...colors];
    newColors[selectedColorIndex] = event.target.value;
    setColors(newColors);
    setValue("colors", newColors); // Actualiza el valor en React Hook Form
  };

  const handleClickImage = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    if (user) {
      setValue("bio", user.bio);
      setValue("videos", user.videos);
      setYoutubeVideos(user.videos);
      setValue("links", user.links);
      setValue("images", user.images);
      setImages(user.images);
      user.colors.lenght > 3 && setValue("colors", user.colors);
      user.colors.lenght > 3 && setColors(user.colors);
      user.links.forEach((linkObj) => {
        setValue(`${linkObj.name.toLowerCase()}Link`, linkObj.link);
      });
    }
  }, [user, setValue]);

  const updateLinks = (platformName, newLink) => {
    // Obtiene el array actual de links desde React Hook Form
    let currentLinks = getValues("links") || [];

    // Encuentra el índice del enlace existente para la plataforma dada, si existe
    const existingLinkIndex = currentLinks.findIndex(
      (link) => link.name === platformName
    );

    if (existingLinkIndex !== -1) {
      // Si el enlace ya existe para esta plataforma, actualiza solo el link
      currentLinks[existingLinkIndex].link = newLink;
    } else {
      // Si no existe un enlace para esta plataforma, agrega un nuevo objeto al array
      currentLinks.push({ name: platformName, link: newLink });
    }

    // Actualiza el valor en React Hook Form para el campo 'links' con el array modificado
    setValue("links", currentLinks, { shouldValidate: true });
  };

  const renderLinkInputs = platforms.map((platform) => {
    // Intenta encontrar un link existente para esta plataforma
    const existingLink =
      user?.links?.find((link) => link.name === platform)?.link || "";

    return (
      <div key={platform} className="mt-5">
        <label className="tracking-tighter text-md font-semibold">
          {platform}
        </label>
        <Input
          disabled={user && user.premium ? false : true}
          className="mt-2"
          defaultValue={existingLink} // Usa el link existente como valor por defecto, si lo hay
          {...register(`${platform.toLowerCase()}Link`)}
          onChange={(e) => updateLinks(platform, e.target.value)}
        />
      </div>
    );
  });

  const addVideo = () => {
    const videoLink = getValues("videosLink"); // Suponiendo que "videosLink" es el nombre del campo de entrada para nuevos enlaces de video
    if (videoLink) {
      const currentVideos = getValues("videos"); // Obtiene el array actual de videos
      const updatedVideos = [...currentVideos, videoLink]; // Añade el nuevo enlace al array
      setValue("videos", updatedVideos); // Actualiza el campo 'videos' en el formulario con el nuevo array
      setYoutubeVideos(updatedVideos);
      setValue("videosLink", ""); // Opcional: Limpia el campo de entrada después de añadir el enlace
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("imagenes", data.images); // ¿Incluye esto las nuevas imágenes agregadas?

      const response = await axios.put("/api/users", {
        _id: user._id,
        ...data,
      });

      response.data &&
        showAlert(
          "Perfil actualizado con éxito",
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
    } catch (err) {
      showAlert("Error", "Hubo un problema al procesar tu solicitud.", "error");

      console.log(err);
    }
  };
  const removeVideo = (indexToRemove) => {
    // Obtiene el array actual de videos desde el formulario
    const currentVideos = getValues("videos");

    // Filtra el array para eliminar el video en el índice especificado
    const updatedVideos = currentVideos.filter(
      (_, index) => index !== indexToRemove
    );
    setYoutubeVideos(updatedVideos); // Actualiza el estado local

    // Actualiza el campo 'videos' en el formulario con el nuevo array
    setValue("videos", updatedVideos, { shouldValidate: true });
  };

  return (
    <ScrollArea className=" h-[60vh] w-full rounded-md  px-1-">
      <div className="w-12/12 flex justify-center">
        <AlertComponent {...alertProps} />
        {user && (
          <form
            className="w-10/12 md:w-6/12 mx-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mx-5">
              <div className="my-5 bg-gray-200 w-fit p-2 rounded-xl">
                <label className="tracking-tighter text-md font-semibold ">
                  Personaliza tus ondas
                </label>
                <div className="flex mt-2">
                  <input
                    type="color"
                    id="colorPicker"
                    style={{ display: "none" }}
                    disabled={user.premium ? false : true}
                    onChange={handleColorChange}
                  />
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedColorIndex(index);
                        document.getElementById("colorPicker").click();
                      }}
                      className="color-choice border border-black mx-1 h-[15px] w-[15px] rounded-full "
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                {!user.premium && (
                  <p className="font-geist mt-5 font-bold tracking-tighter">
                    Este servicio es para usuarios premium
                  </p>
                )}
              </div>
              <div className="my-2">
                <label className="tracking-tighter text-md font-semibold ">
                  Tu biografía
                </label>
                <Textarea
                  maxLength="180"
                  className="mt-2"
                  {...register("bio")}
                />
              </div>
              <div className="my-2">
                <div className="mt-5">
                  <label className="tracking-tighter text-md font-semibold">
                    Agrega tus videos de YouTube
                  </label>
                  <Input
                    className="mt-2"
                    {...register("videosLink")}
                    placeholder="Añade un enlace de video"
                    // Registra el campo de entrada para nuevos enlaces de video
                  />
                  <Button
                    disabled={user && user.premium ? false : true}
                    type="button"
                    onClick={addVideo} // Llama a addVideo sin necesidad de acceder directamente al DOM
                    className="mt-2"
                  >
                    Agregar
                  </Button>
                  <div>
                    {youtubeVideos.map((videoUrl, index) => (
                      <div key={index} className="mt-3">
                        <iframe
                          width="300"
                          height="300"
                          src={`https://www.youtube.com/embed/${
                            videoUrl.split("v=")[1]
                          }`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <Button
                          type="button"
                          className="mt-2"
                          variant="destructive"
                          onClick={() => removeVideo(index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                {!user.premium && (
                  <p className="font-geist mt-5 font-bold tracking-tighter">
                    Este servicio es para usuarios premium
                  </p>
                )}
                <div className="mt-5 bg-gray-300 rounded-xl p-3">{renderLinkInputs}</div>
              </div>
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
        )}
      </div>
    </ScrollArea>
  );
};

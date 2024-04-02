"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [musicUrl, setMusicUrl] = useState("");
  const [promt_, setPromt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMusic = async () => {
    try {
      console.log("Creando música...");
      setIsGenerating(true);
      const response = await axios.post("/api/generateMusic", {
        prompt: promt_,
      });

      console.log(response);
      if (response.data) {
        console.log("Archivo de música generado:", response.data);
        setMusicUrl(response.data); // Usando la URL directamente si es accesible públicamente
        // Para descargar el archivo puedes seguir el método de crear un elemento <a> como antes
      } else {
        console.error("No se encontró URL en la respuesta.");
      }
    } catch (error) {
      console.error("Error al generar música:", error.message);
    }
  };

  return (
    <div
      className="bg-black"
      style={{
        backgroundImage:
          "linear-gradient(129deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.5) 34%), url('/backia.jpeg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center flex-col min-h-screen">
        <section className="border-violet-600 p-10 rounded-xl bg-white border-[6px]  w-[40vw]">
          <p className="font-geist font-bold text-4xl text-center tracking-tighter">
            <span className="bg-violet-600 text-white px-3 rounded-xl">IA</span>{" "}
            Yasound
          </p>
          <Separator className='mt-5'/>
          <div className="mt-5">
            <div className="flex justify-center w-full">
              <Label className="font-bold text-xl mb-2">
                {" "}
                ¿Qué melodía tenés en tu mente?{" "}
              </Label>
            </div>
            <div className="flex justify-center">
              <Textarea
                onChange={(e) => setPromt(e.target.value)}
                value={promt_}
                className="mt-2 w-10/12"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              disabled={isGenerating}
              onClick={handleGenerateMusic}
              className="hover:animate-tilt"
            >
              {" "}
              <svg
                width={20}
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g fill="#f5f5f7">
                  <path d="M7.453 2.713c.375-.95 1.72-.95 2.094 0l1.162 2.944c.114.29.344.52.634.634l2.944 1.162c.95.375.95 1.72 0 2.094l-2.944 1.162c-.29.114-.52.344-.634.634l-1.162 2.944c-.375.95-1.72.95-2.094 0L6.29 11.343a1.126 1.126 0 00-.634-.634L2.713 9.547c-.95-.375-.95-1.72 0-2.094L5.657 6.29c.29-.114.52-.344.634-.634l1.162-2.944zM16.924 13.392a.619.619 0 011.152 0l.9 2.283c.063.16.19.286.349.349l2.283.9a.619.619 0 010 1.152l-2.283.9a.619.619 0 00-.349.349l-.9 2.283a.619.619 0 01-1.152 0l-.9-2.283a.619.619 0 00-.349-.349l-2.283-.9a.619.619 0 010-1.152l2.283-.9a.619.619 0 00.349-.349l.9-2.283z"></path>
                </g>
              </svg>
              Generar{" "}
            </Button>
          </div>
          {isGenerating && (
            <div className="mt-2">
              <div className="flex  w-full items-center justify-center">
                <span class="loader"></span>

                <p className="mt-5 font-light tracking-tighter ">
                  {" "}
                  El proceso puede demorar varios segundos.
                </p>
              </div>
            </div>
          )}
          <div className="my-5 flex justify-center">
            {musicUrl && (
              <audio controls src={musicUrl} className="mt-5">
                Tu navegador no soporta el elemento <code>audio</code>.
              </audio>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;

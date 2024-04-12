"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-center">
        <p
          style={{ letterSpacing: -2 }}
          className="font-semibold pt-20 font-sans  text-center  capitalize text-4xl md:text-7xl degradado-texto"
        >
          Comunidad Yasound
        </p>
      </div>

      <div className="my-10">
        <div className="flex justify-center">
          <Card className="w-10/12  p-5 bg-gray-100 border-none">
            <CardTitle className="text-center text-4xl md:text-7xl font-geist tracking-tighter">
              Proximamente
            </CardTitle>
            <CardContent>
              <p className="text-center font-geist font-semibold mt-5 text-xl md:text-4xl tracking-tighter">
                Estamos preparando algo asombrosos para vos.
              </p>
              <div className="flex  justify-around w-full mt-10">
                <Label className="p-2 rounded-xl  text- md:text-4xl text-black">
                  Blog, beneficios Yasound y muchas cosas más..
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-10 text-md md:text-2xl">
        <p
          className="text-11/12 text-center md:w-9/12  md:text-justify text-md font-light font-sans"
          style={{ letterSpacing: -1 }}
        >
          No solo vendemos beats, ¡También creamos conexiones y fomentamos la
          colaboración! Descubre características que te permiten interactuar,
          colaborar en proyectos, recibir retroalimentación valiosa y compartir
          tus conocimientos con otros apasionados de la música.
        </p>
        <p className="mt-5 font-sans text-center font-bold opacity-[80%]">
          ¡Podemos llevar tu música al siguiente nivel!
        </p>
        <div class="shadowSeparator bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[1vh] rounded-full w-9/12 md:w-4/12 my-2"></div>

        <div className="h-fit mt-5 w-screen flex items-center justify-center flex-wrap">
          <img
            src="/twitter.png"
            className=" rounded-full bg-black p-2 border-black w-[40px] md:w-[55px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
          <img
            src="/discord.png"
            className=" rounded-full bg-violet-200 p-2 border-black w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
          <img
            src="/instagram.svg"
            className="w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
          <img
            src="/wpp.svg"
            className="w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
          <img
            src="/telegram.svg"
            className="w-[45px] md:w-[60px]  hover:scale-[1.2] grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </div>

        {/* <div className=" flex flex-col items-center justify-center  ">
            <p
              className="font-sans font-bold text-center md:text-6xl mt-10 text-4xl md:mt-20"
              style={{ letterSpacing: -2 }}
            >
              Nuestras noticias
            </p>
            {blogs && (
              <div className="w-screen mt-5  flex justify-center ">
                <div className="grid-cols-1  grid md:grid-cols-2 w-10/12 ">
                  {blogs.map((e, index) => (
                    <div className="flex w-full justify-center" key={index}>
                      <BlogCard
                        title={e.titulo}
                        subtitle={e.subtitulo}
                        descripcion={e.cuerpo}
                        img={e.imagenes[0] ? e.imagenes[0] : ""}
                        _id={e._id}
                        comentarios={e.comentarios}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default Page;

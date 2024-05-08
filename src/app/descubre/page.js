"use client";

import { BeatCard } from "@/components/Cards/BeatCard";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useBeats } from "@/hooks/useBeats";
import { useUsers } from "@/hooks/useUsers";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
const Page = () => {
  const [query, setQuery] = useState();
  const { beats, popularGenres } = useBeats();

  // const { users } = useUsers();
  // const findUsersWithNoProducts = async () => {
  //   try {
  //     // Hacer llamadas simultáneas para obtener usuarios y productos
  //     const [usersResponse, productsResponse] = await Promise.all([
  //       axios.get("/api/users"),
  //       axios.get("/api/products"),
  //     ]);

  //     // Extraer los datos de las respuestas
  //     const users = usersResponse.data.data;
  //     const products = productsResponse.data.data;

  //     // Crear un conjunto de IDs de los usuarios que tienen productos
  //     const userIdsWithProducts = new Set(
  //       products.map((product) => product.owner)
  //     );

  //     // Filtrar para obtener usuarios que no tienen productos
  //     const usersWithNoProducts = users.filter(
  //       (user) => !userIdsWithProducts.has(user._id)
  //     );
  //     const adjustedData = usersWithNoProducts.map((user) => ({
  //       mail: user.email,
  //       username: user.username,
  //       name: user.name,
  //       phone: user.phone,
  //       country: user.country,
  //     }));

  //     const worksheet = XLSX.utils.json_to_sheet(adjustedData);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
  //     const excelBuffer = XLSX.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });
  //     const dataBlob = new Blob([excelBuffer], {
  //       type: "application/octet-stream",
  //     });
  //     const fileName = "usuarios-sin-producto.xlsx";
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(dataBlob);
  //     link.download = fileName;
  //     link.click();
  //   } catch (error) {
  //     console.error("Error al recuperar usuarios o productos:", error);
  //     return []; // Devolver un array vacío en caso de error
  //   }
  // };
  // useEffect(() => {
  //   users && findUsersWithNoProducts();
  // }, [users]);
  return (
    <>
      <div className="min-h-screen w-screen pt-20">
        <p className="text-center font-bold opacity-40 text-4xl md:text-7xl tracking-tighter font-geist">
          Descubre nueva musica con Yasound
        </p>
        {/* <div className="flex justify-center mt-10">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por género, artista o ritmo "
            className="w-10/12 md:w-6/12 border-black "
          />
        </div> */}
        <div className="mt-10">
          <p className="ml-5 text-7xl font-semibold tracking-tighter degradado-texto">
            Escuchá lo último
          </p>
          <ScrollArea className="w-screen">
            <div className="flex w-screen">
              {beats.slice(-12).map((product, index) => (
                <div className="w-full flex justify-center my-5" key={index}>
                  <BeatCard
                    user={product.owner}
                    name={product.title}
                    price={
                      product.licenses && product.licenses[0]
                        ? product.licenses[0].price
                        : "N/A"
                    }
                    priceArs={
                      product.licenses && product.licenses[0]
                        ? product.licenses[0].priceArs
                        : "N/A"
                    }
                    owner={product.owner}
                    audioUrl={product.file.url}
                    fileType={product.file.fileType}
                    licenses={product.licenses}
                    genders={product.genders}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {popularGenres &&
            popularGenres.map((e) => (
              <div key={e.genre} className="mt-10">
                <Separator className="my-5" />
                <p className="ml-5 text-3xl font-semibold tracking-tighter ">
                  {e.genre.toUpperCase()}
                </p>
                <ScrollArea className="w-screen">
                  <div className="flex w-screen justify-start">
                    {beats
                      .filter((b) => b.genders.includes(e.genre))
                      .map((product) => (
                        <div
                          className="w-fit flex justify-center my-5"
                          key={product.id}
                        >
                          <BeatCard
                            user={product.owner}
                            name={product.title}
                            price={
                              product.licenses && product.licenses.length > 0
                                ? product.licenses[0].price
                                : "N/A"
                            }
                            priceArs={
                              product.licenses && product.licenses.length > 0
                                ? product.licenses[0].priceArs
                                : "N/A"
                            }
                            owner={product.owner}
                            audioUrl={product.file.url}
                            fileType={product.file.fileType}
                            licenses={product.licenses}
                            genders={product.genders}
                            image={product.image}
                          />
                        </div>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;

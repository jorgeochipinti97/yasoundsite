"use client";

import { BeatCard } from "@/components/Cards/BeatCard";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useBeats } from "@/hooks/useBeats";
import { useUsers } from "@/hooks/useUsers";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [query, setQuery] = useState();
  const { beats, popularGenres } = useBeats();

  const { users } = useUsers();

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
                <Separator className='my-5'/>
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

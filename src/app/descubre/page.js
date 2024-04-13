"use client";

import { BeatCard } from "@/components/Cards/BeatCard";
import { Input } from "@/components/ui/input";
import { useBeats } from "@/hooks/useBeats";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [query, setQuery] = useState();
  const { beats } = useBeats();
  const [products, setProducts] = useState([]);

  // Actualizar los productos filtrados cuando los beats o la query cambian
  useEffect(() => {
    onQueryChange(query);
  }, [query]);

  useEffect(() => {
    beats && setProducts(beats);
  }, [beats]);

  const onQueryChange = (query) => {
    if (!query) {
      setProducts(beats); // Si no hay consulta, muestra todos los beats.
      return;
    }
  
    const queryLower = query.toLowerCase();
  
    // Filtra los beats basándose en el propietario, los géneros y el título.
    const filteredBeats = beats.filter(beat => {
      const ownerMatches = beat.owner.toLowerCase().includes(queryLower);
      const genreMatches = beat.genders.some(gender => 
        gender.toLowerCase().includes(queryLower)
      );
      const titleMatches = beat.title.toLowerCase().includes(queryLower);
  
      // Retorna true si cualquiera de las condiciones se cumple
      return ownerMatches || genreMatches || titleMatches;
    });
  
    setProducts(filteredBeats);
  };
  
  return (
    <>
      <div className="min-h-screen w-screen mt-20">
        <p className="text-center font-bold text-4xl md:text-7xl tracking-tighter font-geist">
          Descubre nueva musica con Yasound
        </p>
        <div className="flex justify-center mt-10">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por género, artista o ritmo "
            className="w-10/12 md:w-6/12 border-black "
          />
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {products.slice(-12).map((product,index) => (
              <div className="w-full flex justify-center my-5" key={index}>
                <BeatCard
                  user={product.owner}
                  name={product.title}
                  price={product.licenses[0].price}
                  priceArs={product.licenses[0].priceArs}
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
        </div>
      </div>
    </>
  );
};

export default Page;

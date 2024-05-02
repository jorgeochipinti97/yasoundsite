import axios from "axios";
import { useEffect, useState } from "react";

export function useBeats() {
  const [beats, setBeats] = useState([]); // Inicializa beats como un arreglo vacío
  const [popularGenres, setPopularGenres] = useState([]);
  const [error, setError] = useState(null); // Agrega un estado para manejar errores

  const getBeats = async () => {
    try {
      const response = await axios.get("/api/products");
      const beatsData = response.data;
      if (beatsData) {
        setBeats(beatsData.data);
        const genreCounts = {};

        beatsData.data.forEach((product) => {
          product.genders.forEach((genre) => {
            genreCounts[genre] = genreCounts[genre]
              ? genreCounts[genre] + 1
              : 1;
          });
        });

        const sortedGenres = Object.keys(genreCounts)
          .map((key) => ({
            genre: key,
            count: genreCounts[key],
          }))
          .sort((a, b) => b.count - a.count);

        setPopularGenres(sortedGenres);
        console.log(sortedGenres);
      } else {
        setError("No se encontraron datos."); // Manejo de casos donde no hay datos
      }
    } catch (err) {
      console.error(err);
      setError(err.message); // Actualiza el estado de error para reflejar el error ocurrido
    }
  };

  useEffect(() => {
    getBeats();
  }, []); // El array vacío asegura que getBeats se ejecute solo una vez al montar

  return { beats, error, popularGenres }; // Devuelve tanto los beats como cualquier error que haya ocurrido
}

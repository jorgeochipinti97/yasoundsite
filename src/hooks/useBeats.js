import axios from "axios";
import { useEffect, useState } from "react";

export function useBeats() {
  const [beats, setBeats] = useState([]); // Inicializa beats como un arreglo vacío
  const [error, setError] = useState(null); // Agrega un estado para manejar errores

  const getBeats = async () => {
    try {
      const response = await axios.get("/api/beats");
      // Asegúrate de que esta ruta es correcta y accesible
      const beatsData = response.data.data;
      // Verifica que response.data.data es la estructura correcta según tu API
      if (beatsData) {
        setBeats(beatsData);
      } else {
        setError('No se encontraron datos.'); // Manejo de casos donde no hay datos
      }
    } catch (err) {
      console.error(err);
      setError(err.message); // Actualiza el estado de error para reflejar el error ocurrido
    }
  };

  useEffect(() => {
    getBeats();
  }, []); // El array vacío asegura que getBeats se ejecute solo una vez al montar

  return { beats, error }; // Devuelve tanto los beats como cualquier error que haya ocurrido
}
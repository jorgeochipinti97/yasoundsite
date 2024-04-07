import axios from "axios";
import { useEffect, useState } from "react";

export function useBeats() {
  const [beats, setBeats] = useState([]);
  const [error, setError] = useState(null);

  const getBeats = async () => {
    try {
      const response = await axios.get("/api/beats");
      const beatsData = response.data.data;
      if (beatsData) {
        setBeats(beatsData);
      } else {
        setError("No se encontraron datos.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    getBeats();
  }, []);

  return { beats, error };
}

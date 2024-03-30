"use client";
import { useUsers } from "@/hooks/useUsers";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { user } = useUsers();
  const [code, setCode] = useState("");
  const a = useSearchParams();
  useEffect(() => {
    a && setCode(a.get("code"));
  }, [a]);

  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerTokenOAuthMercadoPago = async () => {
      try {
        const body = {
          client_id: "4632397606638218",
          client_secret: "SG8qXq3lhZMXYAdSbk6cpVGfF2xH9yCT",
          code: code, // Este código lo obtienes en el proceso de autorización
          grant_type: "authorization_code",
          redirect_uri: "https://yasound.site/oauth",
          //   refresh_token: 'TG-XXXXXXXX-241983636', // Opcional, solo para refrescar el token
          test_token: "false", // Cambiar según sea necesario
        };

        const response = await axios.post("/api/tokendata", body);
        console.log(response);
        setTokenData(response.data); // Almacena los datos del token en el estado
      } catch (error) {
        setError(error.response ? error.response.data : error.message); // Almacena el mensaje de error en el estado
      }
    };

    code && obtenerTokenOAuthMercadoPago();
  }, [code]); // El arreglo vacío asegura
  useEffect(() => {
    tokenData &&
      axios.put("/api/users", {
        ...user,
        tokens: tokenData,
      });
  }, [tokenData]);
  return (
    <div className="h-screen flex items-center justify-center">
      <p>{code} </p>
    </div>
  );
};

export default Page;

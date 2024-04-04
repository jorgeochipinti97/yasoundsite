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
          code: code,
          grant_type: "authorization_code",
          redirect_uri: "https://yasound.site/oauth",
          test_token: "false",
        };

        const response = await axios.post("/api/tokendata", body);
        setTokenData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        setError(error.response ? error.response.data : error.message); // Almacena el mensaje de error en el estado
      }
    };

    code && obtenerTokenOAuthMercadoPago();
  }, [code]);

  useEffect(() => {
    if (tokenData && user && user._id) {
      axios.put("/api/users", {
        _id: user._id,
        tokens: tokenData,
      });
    }
  }, [tokenData, user]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>{code} </p>
    </div>
  );
};

export default Page;

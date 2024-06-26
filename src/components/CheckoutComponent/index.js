import {  initMercadoPago } from "@mercadopago/sdk-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const CheckoutComponent = ({ product, user, _id }) => {
  const { push } = useRouter();
  const [isPremium, setIspremiun] = useState(false);
  useEffect(() => {
    try {
      initMercadoPago("APP_USR-56a2873d-f4b9-4e1a-8e55-5a76526cca46");
    } catch (error) {
      console.error("Error al inicializar MercadoPago", error);
    }
  }, []);

  useEffect(() => {
    user && setIspremiun(user.premium);
  }, [user]);

  const getPayment = async () => {
    try {
      const preference = {
        items: [
          {
            title: product.title,
            quantity: 1,
            unit_price: product.priceArs,
          },
        ],
        marketplace_fee: isPremium
          ? product.priceArs * 0.05
          : product.priceArs * 0.15,
        back_urls: {
          success: `https://www.yasound.site/success?orderID=${_id}`,
          failure: "https://www.yasound.site/",
          pending: "https://www.yasound.site/",
        },
      };

      const data = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user && user.tokens.access_token}`,
          },
        }
      );

      data && push(data.data.init_point);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" flex justify-center mt-10">
      {user.tokens.access_token && (
        <Button variant="outline" className="w-fit" onClick={getPayment}>
          <img src="/merca.png" className="w-1/12 mr-2" />
          Pagar con MercadoPago
        </Button>
      )}
    </div>
  );
};

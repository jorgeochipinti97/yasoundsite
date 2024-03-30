import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import React, { useEffect } from "react";

export const CheckoutComponent = () => {
  useEffect(() => {
    initMercadoPago("APP_USR-56a2873d-f4b9-4e1a-8e55-5a76526cca46");
  }, []);
  return (
    <div>
      <Wallet
        initialization={{
          preferenceId:
            "APP_USR-4632397606638218-032916-dc3ba4771030c1d50169159d35498d8c-743465031",
          redirectMode: "blank",
        }}
      />
    </div>
  );
};

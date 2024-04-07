"use client";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  //?orderID=660effc12c2b1665f2fec3a0&collection_id=75600689512&collection_status=approved&payment_id=75600689512&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=17306289685&preference_id=743465031-d887ba61-b9f3-45fc-8c6e-98d30a7645bb&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
  const { user } = useUsers();
  const updateUser = async (_id, paymentId) => {
    const response = await axios.put("/api/users", {
      _id: _id,
      transactionId: paymentId,
      premium: true,
    });
    console.log(response);
  };

  useEffect(() => {
    const mpPaymentId = searchParams.get("payment_id");

    if (user && mpPaymentId) {
      updateUser(user._id, mpPaymentId);
    }
  }, [searchParams, user]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="mx-5 text-7xl font-geist font-bold tracking-tighter">¡Muchas gracias por tu compra!</p>
      <p className="text-4xl font-geist my-5 tracking-tighter">Ahora eres usuario premium </p>
      <div>
        <Link href={"/"}>
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

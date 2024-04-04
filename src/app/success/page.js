"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();

  const getOrder = async (_id) => {
    const response = await axios.get("/api/orders");
    console.log(response.data.filter((e) => e._id == _id));
  };

  const updateTransaction = async (_id, status, paymentId) => {
    const response = await axios.put("/api/orders", {
      _id: _id,
      transactionId: paymentId,
      status: status,
    });
    console.log(response)
  };

  useEffect(() => {
    const mpPaymentId = searchParams.get("payment_id");
    const mpStatus = searchParams.get("status");
    const orderId = searchParams.get("orderID");
  
    if (orderId) {
      getOrder(orderId);
  
      if (mpPaymentId && mpStatus) {
        updateTransaction(orderId, mpStatus, mpPaymentId);
      }
    }
  }, [searchParams]);

  return (
    <div className="h-screen">
      <div>Muchas gracias por tu compra</div>
      <div>Aqui puedes descargar </div>
    </div>
  );
};

export default Page;

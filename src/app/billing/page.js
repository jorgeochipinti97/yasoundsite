"use client";
import { useUsers } from "@/hooks/useUsers";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { user } = useUsers();
  const [transactions, setTransactiosn] = useState([]);
  const [totalArs, setTotalArs] = useState([]);
  const [totalUsd, setTotalUsd] = useState([]);

  const getOrders = async () => {
    const data = await axios.get("/api/orders");

    setTransactiosn(
      data.data.filter(
        (e) =>
          (e.seller == user.username && e.status == "approved") ||
          (e.seller == user._id && e.status == "approved")
      )
    );

    const totalUSD = transactions.reduce((total, transaction) => {
      if (transaction.provider === "paypal") {
        return total + transaction.amount;
      }
      return total;
    }, 0);

    const totalARS = transactions.reduce((total, transaction) => {
      if (transaction.provider === "mercadopago") {
        return total + transaction.amount;
      }
      return total;
    }, 0);

    setTotalArs(totalARS);
    setTotalUsd(totalUSD);
  };
  useEffect(() => {
    user && getOrders();
  }, [user]);



  
  return (
    <div className="min-h-screen w-screen">
      <section className="pt-20">
        <div className="flex justify-center">
          <div className="flex flex-col items-center mx-5">
            <p className="font-bold text-2xl">USD </p>
            <p className="font-bold text-2xl">${totalUsd} </p>
          </div>
          <div className="flex flex-col items-center mx-5">
            <p className="font-bold text-2xl">ARS</p>

            <p className="font-bold text-2xl">${totalArs}</p>
          </div>
        </div>
      </section>

      <div className="flex justify-center w-full mt-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Como retirar saldo PayPal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogDescription>
                El monto mínimo para retiros es de $10. Tenga en cuenta que
                PayPal aplica comisiones adicionales. Para realizar cualquier
                retiro, por favor contáctenos.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <section className="flex justify-center">
        <div className="bg-white w-11/12 md:w-6/12 border-2 mt-10 rounded-xl">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Comprador</TableHead>
                <TableHead className="text-xs">Producto</TableHead>
                <TableHead className="text-xs">Precio</TableHead>
                <TableHead className="text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((e, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs">{e.buyer}</TableCell>
                  <TableCell className="text-xs">{e.product || ""}</TableCell>
                  <TableCell className="text-xs">${e.amount}</TableCell>
                  <TableCell className="text-xs">
                    {e.provider || "mercadopago"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default Page;

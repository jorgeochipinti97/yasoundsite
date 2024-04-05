"use client";
import { useUsers } from "@/hooks/useUsers";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const { user } = useUsers();
  const [transactions, setTransactiosn] = useState([]);

  const getOrders = async () => {
    const data = await axios.get("/api/orders");

    setTransactiosn(
      data.data.filter(
        (e) => e.seller == user.username && e.status == "approved"
      )
    );
  };
  useEffect(() => {
    user && getOrders();
  }, [user]);
  return (
    <div className="min-h-screen w-screen">
      <section className="mt-20">
        <div className="flex justify-center">
          <div className="flex flex-col items-center mx-5">
            <p className="font-bold text-2xl">USD </p>
            <p className="font-bold text-2xl">$100 </p>
          </div>
          <div className="flex flex-col items-center mx-5">
            <p className="font-bold text-2xl">ARS</p>

            <p className="font-bold text-2xl">$100</p>
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="bg-white w-12/12 md:w-6/12 border-2 mt-10 rounded-xl">
          <Table className="">
         
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Comprador</TableHead>
                <TableHead className='text-xs'>Producto</TableHead>
                <TableHead className='text-xs'>Precio</TableHead>
                <TableHead className="text-xs">-</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((e) => (
                <TableRow>
                  <TableCell className="text-xs">{e.buyer}</TableCell>
                  <TableCell className='text-xs'>{e.product || ""}</TableCell>
                  <TableCell className='text-xs'>${e.amount}</TableCell>
                  <TableCell className="text-xs">{e.provider || "mercadopago"}</TableCell>
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

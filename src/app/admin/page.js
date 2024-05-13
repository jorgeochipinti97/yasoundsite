"use client";
import { useUsers } from "@/hooks/useUsers";
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
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [transactions, setTransactios] = useState([]);
  const [totalArs, setTotalArs] = useState([]);
  const [totalUsd, setTotalUsd] = useState([]);
  const getOrders = async () => {
    const data = await axios.get("/api/orders");

    setTransactios(data.data.filter((e) => e.status == "approved"));

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
  const { users } = useUsers();

  useEffect(() => {
    getOrders();
  }, []);
  return (
    //PAISES  / DESCARGA EXCEL  / FILTROS / AGREGAR PARTE DE BEATS
    <div className="pt-20 flex  justify-center w-screen">
      {/* <Tabs defaultValue="users" className="w-10/12 h-[80vh]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="transactions">Transanctions</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions"></TabsContent>
        <TabsContent value="users">
          <div className="flex justify-center">
            <ScrollArea className="w-screen h-[70vh]">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Img</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className=""></TableHead>
                    <TableHead className=""></TableHead>
                    <TableHead className="">RESTANTE DEL PREMIUM</TableHead>
                    <TableHead className="">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users &&
                    users.map((e) => (
                      <TableRow>
                        <TableCell className="font-medium">
                          {
                            <img
                              src={e.profilePicture}
                              className="w-[50px] rounded-xl"
                            />
                          }
                        </TableCell>
                        <TableCell>{e.username}</TableCell>
                        <TableCell>{e.email}</TableCell>
                        <TableCell className="">
                          <Badge>{e.premium ? "PREMIUM" : "FALSE"}</Badge>
                        </TableCell>
                        <TableCell className="">
{e.country}
                        </TableCell>
                        <TableCell className="">
                          {e.premiumTime
                            ? new Date(e.premiumTime).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}{" "}
                        </TableCell>
                        <TableCell className=""
                        >
                          <div className="flex-col flex" >

<Button variant='destructive' className='my-1'>Eliminar</Button>
<Button variant='' className='my-1'>Ver perfil</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default Page;

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePoints } from "@/utils/utils";
import { useAlert } from "@/hooks/useAlert";
import { AlertComponent } from "@/components/ui/AlertComponent";
import { useRouter } from "next/navigation";

const Page = () => {
  const { alertProps, showAlert } = useAlert();
  const [transactions, setTransactios] = useState([]);
  const [totalArs, setTotalArs] = useState([]);
  const [totalUsd, setTotalUsd] = useState([]);
  const [points_, setPoints_] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const { push } = useRouter();
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
  const { users, user } = useUsers();

  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    if (user && user.username.toLowerCase() !== "fedemed" && user.username.toLowerCase() !== "jorgeochipinti") {
        push("/");
    }
}, [user]);
  const onUpdatePoints = async (e) => {
    // await updatePoints(e, points_);
    const updatedUser = {
      ...user,
      points:  points_
    };
    const response = await axios.put(`api/users`, updatedUser);
    response && alert("actualizado");
    setPoints_(0);
  };


  
  return (
    <div className="min-h-screen">
{ user && (user.username.toLowerCase() === "fedemed" || user.username.toLowerCase() === "jorgeochipinti") && (
        <div>
          <AlertComponent {...alertProps} className="z-50" />
          <div className="pt-20 flex  justify-center w-screen">
            <Tabs defaultValue="users" className="w-10/12 h-[80vh]">
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
                          <TableHead className="">Puntos</TableHead>
                          <TableHead className="">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users &&
                          users.map((e,index) => (
                            <TableRow key={index}>
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
                              <TableCell className="">{e.country}</TableCell>
                              <TableCell className="text-center">
                                {/* {e.premiumTime
                            ? new Date(e.premiumTime).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}{" "} */}
                                {e.points}
                              </TableCell>
                              <TableCell className="">
                                <div className="flex-col flex">
                                  {/* <Button variant='outline' className='my-1 text-red-500 border-red-500 hover:'>Eliminar</Button> */}

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="my-1 border-2 border-black"
                                      >
Editar puntos
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <label
                                        htmlFor="username"
                                        className="text-right"
                                      >
                                        Cantidad de puntos
                                      </label>
                                      <Input
                                        id="username"
                                        placeholder="Cantidad de puntos a sumar"
                                        type="number"
                                        className="col-span-3"
                                        value={points_}
                                        onChange={(e) =>
                                          setPoints_(parseInt(e.target.value))
                                        }
                                      />
                                      <DialogFooter>
                                        <div className="flex justify-start w-full">
                                          <Button
                                            onClick={() => onUpdatePoints(e)}
                                          >
                                            Enviar
                                          </Button>
                                        </div>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

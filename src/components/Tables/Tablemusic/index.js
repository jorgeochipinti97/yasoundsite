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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/utils";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

import { ProductForm } from "@/components/Forms/ProductForm";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUsers } from "@/hooks/useUsers";
import { useAlert } from "@/hooks/useAlert";
import { AlertComponent } from "@/components/ui/AlertComponent";

export const TableMusic = () => {
  const { user } = useUsers();
  const [products, setProducts] = useState();
  const { alertProps, showAlert } = useAlert();

  const getProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data.data.filter((e) => user.username == e.owner));
  };
  useEffect(() => {
    user && getProducts();
  }, [user]);

  const deleteProduct = async (e) => {
    try {
      const response = await axios.delete(`/api/products?_id=${e._id}`);
      console.log(response);
      showAlert(
        "Éxito", // Título del alerta
        `Producto eliminado con éxito.` // Mensaje del alerta
      );
    } catch (error) {
      console.error(
        "Hubo un error al eliminar el producto:",
        error.response ? error.response.data : error.message
      );
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <div className="flex justify-center">
      <AlertComponent {...alertProps} />

      <div className="w-8/12">
        <ScrollArea className="h-[60vh]  ">
          <Table className="">
            <TableCaption>Lista de tus productos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Lincencias</TableHead>
                <TableHead className="text-center">Ganancia</TableHead>
                <TableHead className="text-center">-</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {products &&
                products.map((e) => (
                  <TableRow key={e._id}>
                    <TableCell className="text-center font-geist tracking-tighter font-semibold text-md">
                      {e.title}
                    </TableCell>
                    <TableCell className="  text-center font-geist tracking-tighter font-semibold text-md">
                      {e.licenses.length}
                    </TableCell>
                    <TableCell className="  text-center font-geist tracking-tighter font-semibold text-md">
                      {formatCurrency(125)}
                    </TableCell>
                    <TableCell className="text-center font-geist tracking-tighter flex flex-col ">
                      <div>
                        <Drawer>
                          <DrawerTrigger>
                            <span className="flex border items-center p-2 border-black rounded-md text-xs font-semibold">
                              <svg
                                width={15}
                                className="mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                    stroke="#000000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                  <path
                                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                    stroke="#000000"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                </g>
                              </svg>
                              Editar
                            </span>
                          </DrawerTrigger>
                          <DrawerContent>
                            <ProductForm product={e} />
                          </DrawerContent>
                        </Drawer>
                      </div>
                      <div>
                        <Button
                          size="sm"
                          className="my-1"
                          variant="destructive"
                          onClick={() => deleteProduct(e)}
                        >
                          {" "}
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

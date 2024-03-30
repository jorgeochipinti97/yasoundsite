import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Icons } from "@/utils/icons";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ScrollArea } from "../ui/scroll-area";
import { CheckoutComponent } from "../ChckoutComponent";

export const BeatCard = ({
  name,
  owner,
  price,
  audioUrl,
  fileType,
  licenses,
  image,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const PlayIcon = () => (
    <svg
      onClick={togglePlayPause}
      width={20}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 0 7 7"
    >
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#f5f5f7" transform="translate(-347 -3766)">
            <g transform="translate(56 160)">
              <path d="M296.495 3608.573l-3.994-2.43c-.669-.408-1.501.107-1.501.926v4.862c0 .82.832 1.333 1.5.927l3.995-2.43c.673-.41.673-1.445 0-1.855"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const PauseIcon = () => (
    <svg
      onClick={togglePlayPause}
      width={20}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 0 8 8"
    >
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#f5f5f7" transform="translate(-227 -3765)">
            <g transform="translate(56 160)">
              <path d="M172 3605a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1m5 1v6a1 1 0 01-2 0v-6a1 1 0 012 0"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ARfYvZugPUBZcQ2OiJ3DpT51zvYvn0BzyabZWlJNjLy-QdmkzUBFqSc8LvfwCTgp-eb82fSkxz5z6FXX",
      }}
    >
      <Card
        className="h-[100%] px-5 w-[80%] rounded-xl flex items-start flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(129deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.4) 34%), url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
        />

        <CardHeader>
          <p className="font-geist font-bold text-white text-3xl">{name}</p>
          <p className="mt-2 font-geist text-white font-mono">{owner}</p>
          <p className="mt-2 font-geist text-white font-mono">{fileType}</p>
          <p className="mt-2 font-geist text-white font-mono">
            Desde {formatCurrency(price)}
          </p>
        </CardHeader>
        <CardContent>{isPlaying ? <PauseIcon /> : <PlayIcon />}</CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger className="text-white">
              <Button className="hover:animate-tilt">Comprar</Button>
            </DialogTrigger>
            <DialogContent className="">
              <Table>
                <TableCaption>Lista de tus productos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Nombre</TableHead>
                    <TableHead className="text-center">Precio</TableHead>
                    <TableHead className="text-center">Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses &&
                    licenses.map((e) => (
                      <TableRow key={e._id}>
                        <TableCell className="text-center font-geist tracking-tighter font-semibold text-xl">
                          {e.title}
                        </TableCell>
                        <TableCell className="  text-center font-geist tracking-tighter font-semibold text-xl">
                          {formatCurrency(e.price)}
                        </TableCell>
                        <TableCell className="text-center font-geist tracking-tighter font-semibold text-xl">
                          <Dialog>
                            <DialogTrigger>
                              <span className="bg-violet-500 px-2 py-1 rounded-md text-white">
                                Comprar
                              </span>
                            </DialogTrigger>
                            <DialogContent className="">
                              <Card className="m-3">
                                <CardHeader>Método de pago</CardHeader>
                                <CardContent className="grid gap-6">
                                  <ScrollArea className="h-[40vh]">
                                    <PayPalButtons
                                      createOrder={(data, actions) => {
                                        return actions.order.create({
                                          purchase_units: [
                                            {
                                              amount: {
                                                value: "1.99", // Monto de la transacción
                                              },
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={(data, actions) => {
                                        // La lógica para manejar la aprobación del pago
                                        return actions.order
                                          .capture()
                                          .then((details) => {
                                            alert(
                                              "Pago realizado exitosamente por " +
                                                details.payer.name.given_name +
                                                "!"
                                            );
                                          });
                                      }}
                                    />
                                    <CheckoutComponent product={e} />
                                  </ScrollArea>
                                  {/* <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="First Last" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="number">Card number</Label>
                                    <Input id="number" placeholder="" />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="month">Expires</Label>
                                      <Select>
                                        <SelectTrigger id="month">
                                          <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="1">
                                            January
                                          </SelectItem>
                                          <SelectItem value="2">
                                            February
                                          </SelectItem>
                                          <SelectItem value="3">
                                            March
                                          </SelectItem>
                                          <SelectItem value="4">
                                            April
                                          </SelectItem>
                                          <SelectItem value="5">May</SelectItem>
                                          <SelectItem value="6">
                                            June
                                          </SelectItem>
                                          <SelectItem value="7">
                                            July
                                          </SelectItem>
                                          <SelectItem value="8">
                                            August
                                          </SelectItem>
                                          <SelectItem value="9">
                                            September
                                          </SelectItem>
                                          <SelectItem value="10">
                                            October
                                          </SelectItem>
                                          <SelectItem value="11">
                                            November
                                          </SelectItem>
                                          <SelectItem value="12">
                                            December
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="year">Year</Label>
                                      <Select>
                                        <SelectTrigger id="year">
                                          <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from(
                                            { length: 10 },
                                            (_, i) => (
                                              <SelectItem
                                                key={i}
                                                value={`${
                                                  new Date().getFullYear() + i
                                                }`}
                                              >
                                                {new Date().getFullYear() + i}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="cvc">CVC</Label>
                                      <Input id="cvc" placeholder="CVC" />
                                    </div>
                                  </div> */}
                                </CardContent>
                                <CardFooter>
                                  <Button className="w-full">Continue</Button>
                                </CardFooter>
                              </Card>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* <div className="flex justify-around w-full  rounded-xl my-3 border-black">
              <div className="grid grid-cols-4 w-[100%]">
                <div className="flex justify-center items-center">
                  {licenses &&
                    licenses.map((e) => (
                      <div>
                        <p className="text-black text-center font-geist font-semibold">
                          {e.title}
                        </p>
                        <div className="flex justify-center items-center">
                          <p className="text-black font-geist font-bold text-center">
                            {formatCurrency(e.price)}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="default" id="r1" />
                              <Label htmlFor="r1">PayPal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">MercadoPago</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="flex justify-center ml-3">
                          <Button>Comprar</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div> */}
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </PayPalScriptProvider>
  );
};

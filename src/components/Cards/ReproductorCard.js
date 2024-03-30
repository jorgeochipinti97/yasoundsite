import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

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

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const ReproductorCard = ({ beat }) => {
  return (
    <div>
      <div className="inline-block mx-2">
        <Card
          className="h-[350px] px-5 w-[400px] rounded-xl flex items-start flex-col justify-center"
          style={{
            backgroundImage:
              "linear-gradient(129deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.4) 34%), url('/chica.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <CardHeader>
            <p className="font-geist font-bold text-white text-3xl">
              {beat.title}
            </p>
            <p className="mt-2 font-geist text-white font-mono">{beat.autor}</p>
            <p className="mt-2 font-geist text-white font-mono">
              ${beat.price}
            </p>
          </CardHeader>
          <CardContent>
            <svg
              width={35}
              className="border-2 p-1 rounded-xl cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              stroke="#fff"
              viewBox="0 0 32 32"
            >
              <path d="M5.92 24.096q0 1.088.928 1.728.512.288 1.088.288.448 0 .896-.224l16.16-8.064q.48-.256.8-.736T26.08 16t-.288-1.056-.8-.736L8.832 6.144q-.448-.224-.896-.224-.544 0-1.088.288-.928.608-.928 1.728v16.16z"></path>
            </svg>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger className="text-white">
                <Button className="hover:animate-tilt">Comprar</Button>
              </DialogTrigger>
              <DialogContent>
                <Card className="m-3">
                  <CardHeader>Método de pago</CardHeader>
                  <CardContent className="grid gap-6">
                    <RadioGroup
                      defaultValue="card"
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="mb-3 h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                          </svg>
                          Card
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Icons.paypal className="mb-3 h-6 w-6" />
                          Paypal
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="apple"
                          id="apple"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="apple"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <img src="/meli.svg" alt="" className=" h-9 w-9  "/>

                          MercadoPago
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="grid gap-2">
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
                            <SelectItem value="1">January</SelectItem>
                            <SelectItem value="2">February</SelectItem>
                            <SelectItem value="3">March</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="5">May</SelectItem>
                            <SelectItem value="6">June</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                            <SelectItem value="8">August</SelectItem>
                            <SelectItem value="9">September</SelectItem>
                            <SelectItem value="10">October</SelectItem>
                            <SelectItem value="11">November</SelectItem>
                            <SelectItem value="12">December</SelectItem>
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
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={`${new Date().getFullYear() + i}`}
                              >
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="CVC" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                </Card>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

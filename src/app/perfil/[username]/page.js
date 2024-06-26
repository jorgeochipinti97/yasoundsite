"use client";
import React, { useEffect, useState } from "react";
import { BeatCard } from "@/components/Cards/BeatCard";
import { UserLinks } from "@/components/ui/UserLinks";
import { WavyBackground } from "@/components/ui/Waves";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import axios from "axios";
import { useUsers } from "@/hooks/useUsers";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

const Page = () => {
  const params = useParams();
  const { user } = useUsers(params.username.toLowerCase());
  const [productos, setProductos] = useState([]);
  const getBeats = async () => {
    const data = await axios.get("/api/products");
    const productosNoPremium = data.data.data.filter(
      (e) =>
        e.owner.toLowerCase() == user.username.toLowerCase() ||
        e.owner == user._id
    );

    data && user.premium
    ? setProductos(
        data.data.data.filter(
          (e) =>
            e.owner.toLowerCase() === user.username.toLowerCase() ||
            e.owner === user._id
        )
      )
    : setProductos(
        data.data.data.filter(
          (e) =>
            e.owner.toLowerCase() === user.username.toLowerCase() ||
            e.owner === user._id
        ).slice(-3)
      )

  };

  useEffect(() => {
    user && getBeats();
  }, [user]);

  return (
    <div className="  min-h-screen   ">
      {user && (
        <WavyBackground colors={user.colors}>
          <div className="grid grid-cols-1 md:grid-cols-2  mt-28">
            <div>
              <div className="flex justify-center">
                {user.profilePicture ? (
                  <img
                    src={`${user.profilePicture}?${new Date().getTime()}`}
                    className="rounded-xl border-2 shadowLow border-fuchsia-800 w-[200px] md:w-[300px] md:ml-10 "
                  />
                ) : (
                  <>
                    <div className="bg-black text-white font-geist p-5 text-7xl rounded-xl">
                      {user.username[0]}
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-center mt-5 ">
                <Card className="w-11/12 md:w-10/12 bg-white/40">
                  <CardHeader className="">
                    <div className="w-full  flex">
                      <p className="capitalize font-geist font-bold tracking-tighter ">
                        {user.username}
                      </p>
                      <div className="mx-2">-</div>
                      <p className="capitalize font-geist font-bold tracking-tighter ">
                        {user.role}
                      </p>
                    </div>
                    <div className="flex">
                      {user.genders.map((e) => (
                        <Badge key={e} className="w-fit mx-2">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  {user.bio && (
                    <CardContent className="flex items-start font-semibold tracking-tighter font-geist">
                      <svg
                        className="mr-2 w-[60px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <g>
                          <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="none"
                            strokeWidth="1"
                          >
                            <g fill="#000" transform="translate(42.667 42.667)">
                              <path d="M213.333 0c117.822 0 213.334 95.512 213.334 213.333 0 117.82-95.512 213.334-213.334 213.334C95.513 426.667 0 331.154 0 213.333S95.513 0 213.333 0zm21.38 192h-42.666v128h42.666V192zm-21.163-90.667c-15.554 0-26.837 11.22-26.837 26.371 0 15.764 10.986 26.963 26.837 26.963 15.235 0 26.497-11.2 26.497-26.667 0-15.446-11.262-26.667-26.497-26.667z"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      {user.bio}
                    </CardContent>
                  )}
                </Card>
              </div>
              <div className="w-full flex justify-center mt-5">
                {user.links && <UserLinks links={user.links} />}
              </div>
            </div>
            <div className=" ">
              <div className="flex-1 flex justify-start   flex-col pb-10">
                <div className="flex justyfy-center ">
                  <div className="w-full ">
                    <div className=" mt-2 grid grid-cols-1 md:grid-cols-3   ">
                      {productos &&
                        productos.map((e, index) => (
                          <div
                            key={index}
                            className="flex w-full  mt-5  justify-center"
                          >
                            <BeatCard
                              user={user}
                              name={e.title}
                              price={
                                e.licenses && e.licenses[0]
                                  ? e.licenses[0].price
                                  : "N/A"
                              }
                              priceArs={
                                e.licenses && e.licenses[0]
                                  ? e.licenses[0].priceArs
                                  : "N/A"
                              }
                              owner={e.owner}
                              audioUrl={e.file.url}
                              fileType={e.file.fileType}
                              licenses={e.licenses}
                              image={e.image}
                            />
                          </div>
                        ))}
                    </div>
                    <div className="flex justify-center ">
                      {user.videos.length > 0 && (
                        <Carousel className="w-9/12 md:w-10/12 mt-5 ">
                          <CarouselContent className="">
                            {user.videos.map((e) => (
                              <CarouselItem
                                key={e}
                                className=" flex justify-center items-center"
                              >
                                <ReactPlayer
                                  url={e}
                                  controls={true}
                                  style={{
                                    maxWidth: "80vw",
                                  }}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WavyBackground>
      )}
    </div>
  );
};

export default Page;

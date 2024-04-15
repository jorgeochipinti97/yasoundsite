"use client";
import React, { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

export const Navbar = () => {
  const { push } = useRouter();
  const { user } = useUsers();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const pillTabs = ["Home", "Descubre", "Comunidad"];

  const tabsComponents = pillTabs.map((text, i) => {
    return (
      <Button
        variant="secondary"
        // className="p-2   text-black  text-xs font-extralight  md:text-xl font-sans rounded-full bg-white"
        onClick={
          () =>
            (text == "Home" && push("/")) ||
            // (text == "Beats" && push("#")) ||
            // (text == "Tu música" && push("/upload")) ||
            (text == "Comunidad" && push("/comunidad")) ||
            (text == "Descubre" && push("/descubre"))

          // (text == "Modifica tu perfil" && push(`/create/${usuario.username}`))
        }
        key={text}
        onMouseEnter={() => setHoveredIndex(i)}
        style={{
          position: "relative",
        }}
        className="font-geist"
      >
        {hoveredIndex === i && (
          <MagicTabSelect
            id="pillTabs"
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <span
              className="tracking-tighter rounded-md"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: "violet",
                padding: 2,
                opacity: 0.2,
              }}
            />
          </MagicTabSelect>
        )}
        {text}
      </Button>
    );
  });
  return (
    <nav
      style={{ backdropFilter: "blur(4px) ", zIndex: 1000 }}
      className="   h-[7vh]   flex items-center  w-screen   pt-5 absolute indexz inset-0"
    >
      <section className="flex rounded-full">
        <img src="/logo.png" alt="" style={{ height: "70px" }} />
      </section>

      <section
        style={{ display: "flex", gap: "0.75rem", margin: "0.75rem 0" }}
        className="ml-10"
      >
        {tabsComponents}
      </section>

      <div className="flex-1" />
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              {" "}
              {user && (
                <div>
                  {user.profilePicture.length >= 5 ? (
                    <img
                      src={`${user.profilePicture}?${new Date().getTime()}`}
                      alt="Profile"
                      className="hidden md:block shadowLow h-10 w-10 rounded-full border-2 border-violet-500"
                    />
                  ) : (
                    <div className="hidden md:flex  h-10 w-10 rounded-full border-6 border-violet-500  cursor-pointer shadowLow bg-black  items-center justify-center text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <DropdownMenuLabel>
              {" "}
              <Badge
                variant={"outline"}
                className={"border-violet-500 text-violet-500"}
              >
                {" "}
                {user && user.premium ? "PREMIUM" : "PLAN FREE"}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => push("/music")}>
                Tu música
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => push(`/perfil/${user.username}`)}
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => push("/settings")}>
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold font-geist text-xs bg-gray-200">
                Yasound IA{" "}
                <Badge className="ml-5 bg-gray-600">
                  {" "}
                  {/* <svg
                    width={15}
                    className="mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g fill="#f5f5f7">
                      <path d="M7.453 2.713c.375-.95 1.72-.95 2.094 0l1.162 2.944c.114.29.344.52.634.634l2.944 1.162c.95.375.95 1.72 0 2.094l-2.944 1.162c-.29.114-.52.344-.634.634l-1.162 2.944c-.375.95-1.72.95-2.094 0L6.29 11.343a1.126 1.126 0 00-.634-.634L2.713 9.547c-.95-.375-.95-1.72 0-2.094L5.657 6.29c.29-.114.52-.344.634-.634l1.162-2.944zM16.924 13.392a.619.619 0 011.152 0l.9 2.283c.063.16.19.286.349.349l2.283.9a.619.619 0 010 1.152l-2.283.9a.619.619 0 00-.349.349l-.9 2.283a.619.619 0 01-1.152 0l-.9-2.283a.619.619 0 00-.349-.349l-2.283-.9a.619.619 0 010-1.152l2.283-.9a.619.619 0 00.349-.349l.9-2.283z"></path>
                    </g>
                  </svg>{" "} */}
                  Próximamente
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => push("/billing")}>
                Estadísticas
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Invitar Usuarios</DropdownMenuItem>

            <DropdownMenuSeparator /> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Salir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section className="mr-5 hidden md:block">
        {!user && (
          <>
            <Link href={"/login"}>
              <Button variant="outline" className="tracking-tighter font-geist">
                <svg
                  className="mr-2 "
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  version="1.1"
                  viewBox="0 0 499.1 499.1"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M0 249.6c0 9.5 7.7 17.2 17.2 17.2h327.6l-63.9 63.8c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l93.1-93.1c6.7-6.7 6.7-17.6 0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3 0-6.7 6.7-6.7 17.6 0 24.3l63.8 63.8H17.2c-9.5 0-17.2 7.6-17.2 17.1z"></path>
                    <path d="M396.4 494.2c56.7 0 102.7-46.1 102.7-102.8V107.7C499.1 51 453 4.9 396.4 4.9H112.7C56 4.9 10 51 10 107.7V166c0 9.5 7.7 17.1 17.1 17.1 9.5 0 17.2-7.7 17.2-17.1v-58.3c0-37.7 30.7-68.5 68.4-68.5h283.7c37.7 0 68.4 30.7 68.4 68.5v283.7c0 37.7-30.7 68.5-68.4 68.5H112.7c-37.7 0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10 324.3 10 333.8v57.6c0 56.7 46.1 102.8 102.7 102.8h283.7z"></path>
                  </g>
                </svg>
                <span className="hidden md:block"> Ingresar</span>
              </Button>
            </Link>
          </>
        )}
      </section>
    </nav>
  );
};

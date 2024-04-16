"use client";
import { useUsers } from "@/hooks/useUsers";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";



export const FloatMenu = () => {
  const { user } = useUsers();
  const { push } = useRouter();
  return (
    <div>
      {user && (
        <div className="md:hidden fixed bottom-16 left-2 z-50">
          <DropdownMenu className="">
            <DropdownMenuTrigger>
              <div>
                {" "}
                <div>
                  {user.profilePicture.length >= 5 ? (
                    <img
                      src={`${user.profilePicture}?${new Date().getTime()}`}
                      alt="Profile"
                      className="block  md:hidden shadowLow h-10 w-10 rounded-full border-2 border-violet-500"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full border-6 border-violet-500  cursor-pointer shadowLow bg-black flex items-center justify-center text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                  )}
                </div>
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
              <DropdownMenuItem onClick={() => signOut()}>
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

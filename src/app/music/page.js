"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileForm } from "@/components/Forms/ProfileForm";
import { PersonalForm } from "@/components/Forms/PersonalForm";

import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import { TableMusic } from "@/components/Tables/Tablemusic";
import { ProductForm } from "@/components/Forms/ProductForm";

const Page = () => {
  const { push } = useRouter();
  const { session } = useUsers();

  useEffect(() => {
    !session && push("/");
  }, [session]);

  return (
    
    <div className="w-full flex justify-center items-start pt-28 min-h-screen bg-black">
      <div className="bg-[#f5f5f7] flex flex-col shadow py-10 h-[80vh] mb-28 items-center w-11/12 md:w-8/12 rounded-xl justify-start ">
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="flex justify-center">
            <TabsTrigger value="music">Tu música</TabsTrigger>
            <TabsTrigger value="producto">Crea tu producto</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <TableMusic />
          </TabsContent>
          <TabsContent value="producto">
            <ProductForm/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

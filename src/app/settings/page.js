"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/Forms/ProfileForm";
import { PersonalForm } from "@/components/Forms/PersonalForm";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";


const Page = () => {
  const { push } = useRouter();
  const { session, user } = useUsers();
  useEffect(() => {
    !session && push("/");
  }, [session]);


  return (
    <div className="w-full flex justify-center items-center h-screen bg-black">
      <div className="bg-[#f5f5f7] flex flex-col shadow py-10 h-[80vh]  items-center  w-8/12 rounded-xl justify-center ">

        <Tabs defaultValue="info" className="w-full h-full ">
          <TabsList className="flex justify-center">
            <TabsTrigger value="info">Información personal</TabsTrigger>
            <TabsTrigger value="profile">Personaliza tu perfil</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <PersonalForm user={user} />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

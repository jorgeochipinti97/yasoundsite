"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useUsers } from "@/hooks/useUsers";
import { paises } from "@/utils/paises";
import { HeroComponent } from "@/components/ui/HeroComponent";
import { AiSection } from "@/components/ui/AiSection";
import { BeatHomeSection } from "@/components/ui/BeatHomeSection";
import { BottomSection } from "@/components/ui/BottomSection";

export default function Home() {
  const { user, users } = useUsers();
  const [beats_, setBeats_] = useState([]);

  const getBeats = async () => {
    const data = await axios.get("/api/products");
    data && setBeats_(data.data.data);
  };

  useEffect(() => {
    getBeats();
  }, []);

  return (
    <>
      <HeroComponent />
      <AiSection />
      <BeatHomeSection users={users} beats={beats_} user={user} />
      <BottomSection />
    </>
  );
}

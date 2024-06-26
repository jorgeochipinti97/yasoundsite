import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import SessionProvider from "../components/providers";
import { getServerSession } from "next-auth";
import { Navbar } from "@/components/Navbar";
import { FooterComponent } from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import { Analytics } from "@vercel/analytics/react";
import { FloatMenu } from "@/components/FloatMenu";

export const metadata = {
  title: "Yasound",
  description: "Yasound es la plataforma líder para comprar y vender licencias de beats. Conecta a productores de música y artistas de todo el mundo. Encuentra y adquiere el beat perfecto o vende tus creaciones musicales con facilidad y seguridad.",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="max-w-screen">
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Analytics />
          <FloatMenu />
          <FooterComponent />
          <GoogleTagManager />
        </SessionProvider>
      </body>
    </html>
  );
}

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
  description: "Generated by create next app",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
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

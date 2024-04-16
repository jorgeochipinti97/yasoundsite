"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export const FooterComponent = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <footer
      style={{ display: pathname.includes("perfil") ? "none" : "auto" }}
      className="bg-slate-800   justify-center py-10 px-4 md:px-6 flex flex-col items-center text-center"
    >
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-white">
        Estemos conectados.
      </h2>

      <div className="h-fit mt-5 w-screen flex items-center justify-center flex-wrap">
        <a target="_blank" href="https://twitter.com/YasoundSite">
          <img
            src="/twitter.png"
            className=" rounded-full bg-black p-2 border-black w-[40px] md:w-[55px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </a>
        <a
          target="_blank"
          href="https://discord.com/channels/1206058475088519179/1206058475088519181"
        >
          <img
            src="/discord.png"
            className=" rounded-full bg-violet-200 p-2 border-black w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </a>
        <a target="_blank" href="https://www.instagram.com/yasound.beat/">
          <img
            src="/instagram.svg"
            className="w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </a>
        <a
          target="_blank"
          href="https://chat.whatsapp.com/Hvf5XOuCHfEBwITu1PJHBa "
        >
          <img
            src="/wpp.svg"
            className="w-[45px] md:w-[60px] hover:scale-[1.2]  grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </a>
        <a target="_blank" href="https://t.me/+PMdmo_DnbXQxNzUx">
          <img
            src="/telegram.svg"
            className="w-[45px] md:w-[60px]  hover:scale-[1.2] grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            alt=""
          />
        </a>
        <a target="_blank" href="https://www.tiktok.com/@yasound.site">
          <svg
            className="w-[45px] md:w-[60px]  hover:scale-[1.2] bg-gray-400 rounded-full p-2 hover:bg-fuchsia-400 grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            width={45}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025a7.762 7.762 0 002.189 5.213l-.002-.002A8.77 8.77 0 0029 8.45l.028.002v5.036a13.327 13.327 0 01-5.331-1.247l.082.034a15.385 15.385 0 01-2.077-1.196l.052.034c-.012 3.649.012 7.298-.025 10.934a9.513 9.513 0 01-1.707 4.954l.02-.031c-1.652 2.366-4.328 3.919-7.371 4.011h-.014a9.071 9.071 0 01-5.139-1.31l.04.023C5.05 28.185 3.32 25.603 3 22.6l-.004-.041a23.163 23.163 0 01-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476.547 0 1.083.047 1.604.136l-.056-.008c.025 1.849-.05 3.699-.05 5.548a4.29 4.29 0 00-5.465 2.619l-.009.03c-.133.427-.21.918-.21 1.426 0 .206.013.41.037.61l-.002-.024a4.26 4.26 0 004.382 3.586h-.009a4.198 4.198 0 003.451-1.994l.01-.018c.267-.372.45-.822.511-1.311l.001-.014c.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083z"></path>
          </svg>
        </a>
      </div>
      <div className="flex">
        <a href="/terms" className="mx-2 text-white font-bold mt-5">
          Términos y condiciones.
        </a>
      </div>
      <Button onClick={() => push("https://wa.link/vsobjt")} className='mt-5'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      className="mr-2"
      width={25}
      >
      <path
        stroke="#f5f5f7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 11h.01M12 11h.01M16 11h.01M21 20l-3.324-1.662a4.161 4.161 0 00-.51-.234 2.007 2.007 0 00-.36-.085c-.139-.019-.28-.019-.561-.019H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 16.48 3 15.92 3 14.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 5.52 21 6.08 21 7.2V20z"
      ></path>
    </svg>
        Obtené ayuda en linea
      </Button>
      <div className="flex mt-5">
        <img
          src="/merca.png"
          className="w-[70px] md:w-[100px] mx-1 rounded-xl grayscale-[90%]"
        />
        <div className="w-[70px] md:w-[100px] bg-white mx-1 rounded-xl grayscale-[90%]">
          <img src="/paypal.png" />
        </div>
        <div className="w-[70px] md:w-[100px] bg-white flex items-center justify-center mx-1 rounded-xl grayscale-[90%]">
          <img src="/visa.webp" />
        </div>
        <div className="w-[70px] md:w-[100px] bg-white flex items-center justify-center mx-1 rounded-xl grayscale-[90%]">
          <img src="/master.png" />
        </div>
      </div>
    </footer>
  );
};

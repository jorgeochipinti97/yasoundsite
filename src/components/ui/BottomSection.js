import React from 'react'
import Marquee from "react-fast-marquee";

export const BottomSection = () => {
  return (
      <div>
        <p className="text-center text-3xl font-bold mt-20  text-gray-600 tracking-tighter font-geist">
          Confian en nosotros
        </p>
        <Marquee autoFill direction="right" className="max-w-screen">
          <div className="flex justify-center mx-2">
            <img src="/lider2.jpeg" />
          </div>
          <div className="flex justify-center mx-2">
            <img src="/ementors.jpeg" />
          </div>
          <div className="flex justify-center mx-2">
            <img src="/jhon.png" />
          </div>
        </Marquee>
      </div>
  )
}

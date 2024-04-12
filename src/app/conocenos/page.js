import { BackgroundGradient } from "@/components/BackgroundGradient";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="pt-20">
        <div className="flex w-full flex-col items-center justify-center">
          <p
            style={{ letterSpacing: -2 }}
            className="font-semibold    font-geist tracking-tighter md:text-start text-center  capitalize text-5xl  md:text-7xl degradado-texto"
          >
            Sobre nosotros
          </p>
          <div class="shadowLowSeparator bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[1vh]   w-6/12 rounded-full my-2"></div>
        </div>

        <div className="grid grid-cols-1 mt-10">
          <div className="my-2 grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center">
              <div className=" w-10/12">
                {/* <BackgroundGradient className="rounded-[22px]  bg-slate-800 w-[300px] h-[300px]"> */}
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./fondoconocenos.jpeg')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-black hidden  rounded-[22px] shadowLow h-[300px] md:flex flex-col items-center justify-center  border-white "
                >
                  <p
                    style={{ letterSpacing: -1 }}
                    className="font-semibold text-white   text-4xl my-5 text-center flex items-center  font-geist tracking-tighter    "
                  >
                    ¿Qué es Yasound?
                  </p>
                </div>
              </div>
              {/* </BackgroundGradient> */}
            </div>
            <div className="flex justify-center items-center flex-col">
     
              <p
                style={{ letterSpacing: -0.5 }}
                className="text-start text-md font-geist py-5 tracking-tighter  text-black w-10/12  "
              >
                Somos la plataforma digital latina pensada por y para
                productores emergentes que se especializa en la compra y venta
                de beats e instrumentales, así como en la creación de una
                comunidad de profesionales de la industria musical. Los
                productores de música pueden crear perfiles para mostrar y
                vender sus creaciones, mientras que los artistas pueden buscar y
                adquirir instrumentales para usar en sus proyectos. Además de la
                función de venta de beats, también ofrecemos herramientas y
                servicios para ayudar a los productores y artistas como la
                integración propia de INTELIGENCIA ARTIFICIAL y asi elevar el
                nivel de produccion
              </p>
            </div>
          </div>

          <div className=" my-2 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center flex-col justify-center">
              <div className="w-10/12">
                <section className="font-geist tracking-tighter my-2">
                  <h2 className="font-geist tracking-tighter my-2 md:text-6xl text-4xl  font-bold">
                    Nuestra Misión
                  </h2>
                  <p className="font-geist tracking-tighter text-md ">
                    {" "}
                    Liderar la venta y colaboración musical en linea,
                    facilitando la conexión entre artistas y productores
                    musicales, proporcionando una plataforma innovadora y
                    colaborativa que potencie la creatividad y la excelencia en
                    la producción musical.
                  </p>
                </section>
                <div className="font-geist tracking-tighter"></div>
              </div>
            </div>
            {/* <BackgroundGradient className="rounded-[22px] "> */}
            <div className=" justify-center items-center hidden md:flex">
              <div className=" w-10/12">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./fotobscura.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-black rounded-[22px]  h-[300px] shadowLow  flex-col items-center justify-center  border-white "
                >
                  <p
                    style={{ letterSpacing: -1 }}
                    className="font-semibold text-white text-4xl my-5 text-center h-full  flex justify-center items-center  font-geist tracking-tighter  capitalize  "
                  >
                    Misión
                  </p>
                </div>
              </div>
            </div>
            {/* </BackgroundGradient> */}
          </div>
          <div className="my-2 grid grid-cols-1 md:grid-cols-2">
            {/* <BackgroundGradient className="rounded-[22px]  bg-slate-800"> */}
            <div className="md:flex justify-center items-center hidden">
              <div className=" w-10/12">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./visio.jpeg')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-black rounded-[22px] shadowLow h-[300px] flex flex-col items-center justify-center  border-white "
                >
                  <p
                    style={{ letterSpacing: -1 }}
                    className="font-semibold text-white text-4xl my-5 text-center flex items-center  font-geist tracking-tighter  capitalize  "
                  >
                    Visión
                  </p>
                </div>
              </div>
            </div>

            {/* </BackgroundGradient> */}
            <div className="flex justify-center items-center">
              <section className="mt-10 w-10/12">
                <h2 className="font-geist tracking-tighter my-2 text-4xl md:text-6xl font-bold">
                  Nuestra Visión
                </h2>

                <p className="font-geist tracking-tighter text-md">
                  Convertirnos en la plataforma virtual líder para la venta de
                  beats, instrumentales y sonidos musicales, consolidándonos
                  como la comunidad musical más grande de Latinoamérica. Nos
                  esforzamos por ser un Punto de Encuentro Global, buscando
                  trascender fronteras, superando limitaciones geográficas y
                  culturales, donde músicos y productores de todas partes pueden
                  conectarse, colaborar y encontrar inspiración, impulsando la
                  creatividad y el apoyo mutuo para fomentar el crecimiento y la
                  innovación en la industria musical.
                </p>
              </section>
            </div>
          </div>
          <div className="my-2 grid grid-cols-1 md:grid-cols-2 ">
            <div className="flex justify-center items-center">
              <section className="font-geist tracking-tighter my-2 w-10/12">
                <h2 className="font-geist tracking-tighter my-2 text-4xl md:text-6xl font-bold">
                  Valores Fundamentales
                </h2>
                <ul className="font-geist tracking-tighter text-md mt-5">
                  <li>
                    <strong>Diversidad:</strong> Celebramos la diversidad en la
                    música y en nuestra comunidad, valorando diferentes
                    culturas, géneros y estilos musicales para promover un
                    ambiente inclusivo.
                  </li>
                  <li className="font-geist tracking-tighter my-2">
                    <strong>Colaboración:</strong> Creemos en el poder de la
                    colaboración entre artistas, productores y profesionales de
                    la industria musical para impulsar el crecimiento y el éxito
                    de nuestros miembros.
                  </li>
                  <li className="font-geist tracking-tighter my-2">
                    <strong>Calidad:</strong> Nos comprometemos a ofrecer
                    productos y servicios de alta calidad, superando las
                    expectativas de nuestros usuarios en cada paso.
                  </li>
                </ul>
              </section>
            </div>
            {/* <BackgroundGradient className="rounded-[22px] "> */}
            <div className="md:flex justify-center items-center hidden">
              <div className=" w-10/12">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./valores.jpeg')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className=" rounded-[22px]  h-[300px]  shadowLow flex flex-col items-center justify-center  border-white "
                >
                  <p
                    style={{ letterSpacing: -1 }}
                    className="font-semibold text-white text-4xl my-5 text-center h-full   flex items-center  font-geist tracking-tighter  capitalize  "
                  >
                    Valores
                  </p>
                </div>
              </div>
            </div>
            {/* </BackgroundGradient> */}
          </div>
        </div>
      </div>
      <div className="w-screen flex justify-center mt-20">
        <div className="w-11/12 md:w-10/12">
          <p className=" font-geist tracking-tighter text-3xl">
            {" "}
            En <span className="text-fuchsia-800 font-semibold">
              Yasound
            </span>{" "}
            estamos comprometidos con el crecimiento y la innovación constante.
            Nos complace anunciar que nuestros medios de comunicacion abiertas
            para convenios, alianzas y colaboraciones.
          </p>
          <p className="font-geist tracking-tighter mt-5 text-3xl">
            Si estás interesado en explorar oportunidades de trabajo conjunto
            <span className="text-fuchsia-800 font-semibold">
              {" "}
              ¡Contáctanos!
            </span>
          </p>

          <p className="font-geist tracking-tighter mt-2 text-3xl">
            Estamos ansiosos por colaborar contigo y crear juntos nuevas y
            emocionantes oportunidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

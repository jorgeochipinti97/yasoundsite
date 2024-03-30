import { BackgroundGradient } from '@/components/BackgroundGradient'
import React from 'react'

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <div className="flex w-full flex-col items-center justify-center">
          <p
            style={{ letterSpacing: -2 }}
            className="font-semibold    font-sans text-start  capitalize text-7xl degradado-texto"
          >
            Sobre nosotros
          </p>
          <div class="shadowSeparator bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[1vh]   w-6/12 rounded-full my-2"></div>
        </div>

        <div className="grid grid-cols-1 mt-10">
          <div className="my-2 grid grid-cols-2">
            <BackgroundGradient className="rounded-[22px]  bg-slate-800">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./fondoconocenos.jpeg')",

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="bg-black rounded-[22px] h-[100vh]  flex flex-col items-center justify-center  border-white "
              >
                <p
                  style={{ letterSpacing: -1 }}
                  className="font-semibold text-white text-4xl my-5 text-center flex items-center  font-sans  capitalize  "
                >
                  ¿Qué es Yasound?
                </p>
              </div>
            </BackgroundGradient>
            <div className="flex justify-center items-center flex-col">
              <h2 className="font-sans my-2 text-2xl font-bold">Yasound</h2>
              <p
                style={{ letterSpacing: -0.5 }}
                className="text-start font-sans py-5  text-black w-10/12  "
              >
                Es una plataforma digital en habla hispana que se especializa en
                la compra y venta de beats e instrumentales, así como en la
                creación de una comunidad de profesionales de la industria
                musical, como músicos, productores, managers musicales,
                beatmakers y filmmakers, entre otros. Además, ofrece servicios
                para difundir música en plataformas digitales y la posibilidad
                de grabar y crear canciones utilizando su estudio de grabación
                propio. Los productores de música pueden crear perfiles en
                YASOUND para mostrar y vender sus creaciones, mientras que los
                artistas pueden buscar y adquirir instrumentales para usar en
                sus proyectos. Además de la función de venta de beats, YASOUND
                también ofrece herramientas y servicios para ayudar a los
                productores y artistas a colaborar, promocionar su música y
                gestionar su carrera en la industria musical Formando así una
                gran comunidad.
              </p>
            </div>
          </div>

          <div className=" my-2 grid grid-cols-2">
            <div className="flex items-center flex-col justify-center">
              <div className="w-10/12">
                <section className="font-sans my-2">
                  <h2 className="font-sans my-2 text-2xl font-bold">
                    Nuestra Misión
                  </h2>
                  <p>
                    {" "}
                    YASOUND aspira a liderar la venta y colaboración musical en
                    línea. Nos enfocamos en proporcionar herramientas para que
                    los artistas expresen su creatividad, facilitar la
                    monetización del talento a través de la venta de
                    producciones y conectar globalmente a nuestra comunidad,
                    fomentando la colaboración y el intercambio de
                    conocimientos.
                  </p>
                </section>
                <div className="font-sans"></div>
              </div>
            </div>
            <BackgroundGradient className="rounded-[22px] ">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./fotobscura.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="bg-black rounded-[22px]  h-[100vh]  flex flex-col items-center justify-center  border-white "
              >
                <p
                  style={{ letterSpacing: -1 }}
                  className="font-semibold text-white text-4xl my-5 text-center h-full   flex items-center  font-sans  capitalize  "
                >
                  Misión
                </p>
              </div>
            </BackgroundGradient>
          </div>
          <div className="my-2 grid grid-cols-2">
            <BackgroundGradient className="rounded-[22px]  bg-slate-800">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./visio.jpeg')",

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="bg-black rounded-[22px] h-[100vh]    flex flex-col items-center justify-center  border-white "
              >
                <p
                  style={{ letterSpacing: -1 }}
                  className="font-semibold text-white text-4xl my-5 text-center flex items-center  font-sans  capitalize  "
                >
                  Visión
                </p>
              </div>
            </BackgroundGradient>
            <div className="flex justify-center items-center">
              <section className="mt-10 w-10/12">
                <h2 className="font-sans my-2 text-2xl font-bold">
                  Nuestra Visión
                </h2>

                <p>
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
          <div className="my-2 grid grid-cols-2 ">
            <div className="flex justify-center items-center">
              <section className="font-sans my-2 w-10/12">
                <h2 className="font-sans my-2 text-2xl font-bold">
                  Valores Fundamentales
                </h2>
                <ul className="font-sans my-2">
                  <li>
                    <strong>Diversidad:</strong> Celebramos la diversidad en la
                    música y en nuestra comunidad, valorando diferentes
                    culturas, géneros y estilos musicales para promover un
                    ambiente inclusivo.
                  </li>
                  <li className="font-sans my-2">
                    <strong>Colaboración:</strong> Creemos en el poder de la
                    colaboración entre artistas, productores y profesionales de
                    la industria musical para impulsar el crecimiento y el éxito
                    de nuestros miembros.
                  </li>
                  <li className="font-sans my-2">
                    <strong>Calidad:</strong> Nos comprometemos a ofrecer
                    productos y servicios de alta calidad, superando las
                    expectativas de nuestros usuarios en cada paso.
                  </li>
                </ul>
              </section>
            </div>
            <BackgroundGradient className="rounded-[22px] ">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,rgba(0, 0, 0, 0.9),rgba(0, 0, 0, .5)), url('./valores.jpeg')",

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className=" rounded-[22px]  h-[100vh]  flex flex-col items-center justify-center  border-white "
              >
                <p
                  style={{ letterSpacing: -1 }}
                  className="font-semibold text-white text-4xl my-5 text-center h-full   flex items-center  font-sans  capitalize  "
                >
                  Valores
                </p>
              </div>
            </BackgroundGradient>
          </div>
        </div>

        <div className="flex mt-10 items-start text-start flex-col justify-center">
          <div className="flex items-center">
            <svg
              width={60}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className=" hover:scale-[1.2]    grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7l6.94 4.338a2 2 0 002.12 0L20 7M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            <p>contacto@yasound.site</p>
          </div>
          <div className="flex items-center">
            <svg
              width={50}
              className=" hover:scale-[1.2]   grayscale-[100%] hover:grayscale-0 transition-all duration-100 cursor-pointer  mx-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g fill="#0F0F0F">
                <path d="M6.014 8.006c.114-.904 1.289-2.132 2.22-1.996V6.01c.907.172 1.625 1.734 2.03 2.436.286.509.1 1.025-.167 1.243-.361.29-.926.692-.808 1.095C9.5 11.5 12 14 13.23 14.711c.466.269.804-.44 1.092-.804.21-.28.726-.447 1.234-.171.759.442 1.474.956 2.135 1.534.33.276.408.684.179 1.115-.403.76-1.569 1.76-2.415 1.557C13.976 17.587 8 15.27 6.08 8.558c-.108-.318-.08-.438-.066-.552z"></path>
                <path
                  fillRule="evenodd"
                  d="M12 23c-1.224 0-1.9-.131-3-.5l-2.106 1.053A2 2 0 014 21.763V19.5c-2.153-2.008-3-4.323-3-7.5C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.691 16.477 3 14.733 3 12a9 9 0 119 9c-.986 0-1.448-.089-2.364-.396l-.788-.264L6 21.764V18.63z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            <p>113344556677</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
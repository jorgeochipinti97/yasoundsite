import React from "react";
import { AccordionComponent } from "./AccordionComponent";

export const Faqs = () => {
  return (
    <div>
      <p className="text-center text-7xl my-10 font-bold tracking-tighter font-geist">
        FAQS
      </p>

      <div className="flex justify-center">
        <div className="max-w-8/12 md:w-6/12 flex justify-center flex-col items-center">
          <AccordionComponent
            question={"¿Qué es Yasound y cómo funciona?"}
            answer={
              "Es una plataforma de comercio electrónico diseñada para artistas emergentes que desean vender sus composiciones musicales e instrumentales. Funciona como un mercado en línea donde los artistas pueden cargar y ofrecer sus beats para su venta."
            }
          />

          <AccordionComponent
            question={"¿Cómo puedo registrarme como artista?"}
            answer={
              "Registrarse como artista en Yasound es fácil. Simplemente haz clic en el botón Ingresar, selecciona la opción Registrarme y completa el formulario con tus datos. Asegúrate de aceptar los términos y condiciones como usuario. Una vez hecho esto, estarás listo para comenzar a compartir tus creaciones musicales con el mundo."
            }
          />
          <AccordionComponent
            question={"¿Qué ventajas ofrece la membresía premium de Yasound?"}
            answer={
              "La membresía premium de Yasound ofrece una serie de beneficios exclusivos, como un perfil más completo en la plataforma, participación en descuentos y eventos, acceso a la comunidad, soporte prioritario las 24 horas y descuentos especiales en ventas."
            }
          />
          <AccordionComponent
            question={"¿Cuáles son las tarifas de transacción en Yasound?"}
            answer={
              "Las tarifas de transacción aplicadas en Yasound son las siguientes: Para transacciones a través de MercadoPago: 6,5% + IVA (21%) sobre el total de la venta. Para transacciones mediante PayPal: 5.6% + comisión fija (1,29%) sobre el monto total de la transacción. Estas tarifas se agregan al costo del producto y se deducen automáticamente durante la transacción. Por otra parte los Usuarios Free cuentan con una comisión por el uso de la plataforma del 15%, en cambio los Usuarios Premium poseen una comisión del 3%"
            }
          />
          <AccordionComponent
            question={
              "¿Qué medidas de seguridad implementa Yasound para proteger mis datos personales y financieros?"
            }
            answer={
              "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos las últimas tecnologías y protocolos de seguridad para proteger tanto tu información personal como financiera. Nuestra base de datos está protegida con los más altos estándares de seguridad, garantizando la confidencialidad y la integridad de tus datos en todo momento."
            }
          />
          <AccordionComponent
            question={
              "¿Cómo puedo contactar al equipo de soporte de Yasound si surge algún problema o tengo alguna pregunta?"
            }
            answer={
              "Si necesitas ayuda o tienes alguna pregunta, nuestro equipo de soporte está aquí para ayudarte. Puedes contactarnos a través de diversos canales, como correo electrónico, redes sociales o WhatsApp. Estamos disponibles las 24 horas del día, los 7 días de la semana, para brindarte la asistencia que necesites."
            }
          />
          <AccordionComponent
            question={
              "¿Qué sucede si experimento algún problema con una transacción o una compra en Yasound?"
            }
            answer={
              "Si surge algún problema durante una transacción o compra en Yasound, no te preocupes. Nuestro equipo de soporte está preparado para resolver cualquier inconveniente que puedas tener. Simplemente contáctanos y proporciona detalles sobre el problema, incluyendo capturas de pantalla si es posible. Nos encargaremos de resolver la situación de manera rápida y eficiente para garantizar tu satisfacción."
            }
          />
          <AccordionComponent
            question={
              "¿Ofrece Yasound alguna garantía de calidad para los beats y productos disponibles en la plataforma?"
            }
            answer={
              "En Yasound, nos comprometemos a ofrecer la más alta calidad en todos los beats y productos disponibles en nuestra plataforma. Nuestro equipo trabaja diligentemente para garantizar que cada elemento cumpla con nuestros estándares de excelencia. Además, estamos abiertos a recibir comentarios y sugerencias de nuestros usuarios para seguir mejorando y ofrecer una experiencia aún mejor."
            }
          />
        </div>
      </div>
    </div>
  );
};

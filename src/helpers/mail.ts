import { InteraccionInterface } from "../models/interacciones.models";


const nodemailer = require("nodemailer");
// crea un transportador que conecta y hace el envio del mail

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "arturo97@outlook.com",
    pass: "gbodardivnjmigxy",
  },
});

export const enviarCorreoInteraccion = async (interaccion: InteraccionInterface) => {
  try {
    // Configurar el correo electrónico
    const info = await transporter.sendMail({
      from: '"Wilson Arturo Rodriguez" <arturo97@outlook.com>',
      to: "arriendofacil.crm@gmail.com",
      subject: "Nueva Interacción Recibida",
      text: `Nueva interacción recibida:\n\nNombre: ${interaccion.nombre}\nCorreo electrónico: ${interaccion.email}\nMensaje: ${interaccion.mensaje}`,
      html: `<p>Nueva interacción de contacto recibida:</p><ul><li><b>Nombre:</b> ${interaccion.nombre}</li><li><b>Correo electrónico:</b> ${interaccion.email}</li><li><b>Mensaje:</b> ${interaccion.mensaje}</li></ul>`
    });

    console.log("Correo electrónico enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};
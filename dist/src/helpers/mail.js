"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarCorreoInteraccion = void 0;
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
const enviarCorreoInteraccion = (interaccion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configurar el correo electrónico
        const info = yield transporter.sendMail({
            from: '"Wilson Arturo Rodriguez" <arturo97@outlook.com>',
            to: "arriendofacil.crm@gmail.com",
            subject: "Nueva Interacción Recibida",
            text: `Nueva interacción recibida:\n\nNombre: ${interaccion.nombre}\nCorreo electrónico: ${interaccion.email}\nMensaje: ${interaccion.mensaje}`,
            html: `<p>Nueva interacción de contacto recibida:</p><ul><li><b>Nombre:</b> ${interaccion.nombre}</li><li><b>Correo electrónico:</b> ${interaccion.email}</li><li><b>Mensaje:</b> ${interaccion.mensaje}</li></ul>`
        });
        console.log("Correo electrónico enviado: %s", info.messageId);
    }
    catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        throw error;
    }
});
exports.enviarCorreoInteraccion = enviarCorreoInteraccion;
//# sourceMappingURL=mail.js.map
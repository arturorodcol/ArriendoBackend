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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaccionUsuario = void 0;
const interacciones_models_1 = __importDefault(require("../models/interacciones.models"));
const mail_1 = require("../helpers/mail");
const interaccionUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, mensaje } = req.body;
    try {
        // Validar si ya se ha enviado un formulario usando la misma dirección de correo electrónico
        const interaccionExistente = yield interacciones_models_1.default.findOne({ email: email });
        if (interaccionExistente) {
            return res.status(409).json({
                ok: false,
                msg: "Ya se ha enviado un formulario de contacto con la dirección de correo electrónico registrada."
            });
        }
        // Crear un nuevo documento del formulario de contacto
        const nuevaInteraccion = new interacciones_models_1.default({
            nombre,
            email,
            mensaje,
            createdAt: new Date()
        });
        // Guardar el formulario en la base de datos
        const interaccionGuardada = yield nuevaInteraccion.save();
        yield (0, mail_1.enviarCorreoInteraccion)(nuevaInteraccion);
        // Enviar respuesta exitosa al cliente
        res.status(200).json({
            ok: true,
            msg: "Formulario de contacto enviado exitosamente",
            formulario: interaccionGuardada
        });
    }
    catch (error) {
        console.error(error);
        // Manejar errores de forma adecuada
        res.status(500).json({
            ok: false,
            msg: "Ocurrió un error al procesar el formulario de contacto. Por favor, inténtalo de nuevo más tarde."
        });
    }
});
exports.interaccionUsuario = interaccionUsuario;
//# sourceMappingURL=interacciones.controller.js.map
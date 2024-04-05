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
exports.actualizarInmueble = exports.eliminarInmueble = exports.consultarInmueble = exports.crearInmueble = void 0;
const inmueble_models_1 = __importDefault(require("../models/inmueble.models"));
const usuario_models_1 = __importDefault(require("../models/usuario.models"));
const crearInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const idUsuario = body.usuario; // Suponiendo que el ID del usuario se envía en el cuerpo de la solicitud como 'usuario'
    try {
        // Verificar si el usuario existe
        const usuario = yield usuario_models_1.default.findById(idUsuario);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        // solo se agrega con arrendatario
        if (usuario.rol !== 'ARRENDATARIO') {
            return res.status(403).json({
                ok: false,
                msg: "Unicamente se asocian inmuebles a los arrendatarios y eres ADMIN.",
            });
        }
        // aca verificamos que no este asociado 
        const inmuebleExistente = yield inmueble_models_1.default.findOne({ usuario: idUsuario });
        if (inmuebleExistente) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya tiene un inmueble asociado",
            });
        }
        // Verificar si ya existe un inmueble con el mismo tipo
        const inmuebleTipoExistente = yield inmueble_models_1.default.findOne({ tipoInmueble: body.tipoInmueble });
        if (inmuebleTipoExistente) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un inmueble con el mismo tipo",
            });
        }
        //ya creamos el inmubele y lo asociamos con el usuario
        const inmuebleNuevo = new inmueble_models_1.default(Object.assign({ 
            // asocio el suuario con el inmubele
            usuario: idUsuario }, body));
        const inmuebleCreado = yield inmuebleNuevo.save();
        res.status(200).json({
            ok: true,
            msg: "Inmueble registrado satisfactoriamente",
            inmuebleCreado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el inmueble`,
        });
    }
});
exports.crearInmueble = crearInmueble;
const consultarInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inmuebles = yield inmueble_models_1.default.find().populate({
            path: 'usuario',
            //me traigo el nombre el login y el rol
            select: 'nombre login rol'
        });
        res.json({
            ok: true,
            inmuebles,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar inmuebles",
            error,
        });
    }
});
exports.consultarInmueble = consultarInmueble;
const eliminarInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const inmuebleEliminado = yield inmueble_models_1.default.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Inmueble eliminado",
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el inmueble",
        });
    }
});
exports.eliminarInmueble = eliminarInmueble;
const actualizarInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const inmuebleActualizo = yield inmueble_models_1.default.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            ok: true,
            msg: "Inmueble actualizado",
            inmueble: inmuebleActualizo,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            mgs: `Error al actualizar inmueble`,
        });
    }
});
exports.actualizarInmueble = actualizarInmueble;
//# sourceMappingURL=inmueble.controller.js.map
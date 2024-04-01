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
exports.eliminarInmueble = exports.consultarInmueble = exports.crearInmueble = void 0;
const inmueble_models_1 = __importDefault(require("../models/inmueble.models"));
const crearInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    console.log("controlador");
    try {
        const inmuebleNuevo = new inmueble_models_1.default(Object.assign({ usuario: id }, body));
        const inmuebleCreado = yield inmuebleNuevo.save();
        res.status(200).json({
            ok: true,
            msg: "Producto registrado satisfactoriamente",
            inmuebleCreado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `error al crear el inmueble`,
        });
    }
});
exports.crearInmueble = crearInmueble;
const consultarInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inmuebles = yield inmueble_models_1.default.find();
        res.json({
            ok: true,
            inmuebles,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar inmuebles`,
            error,
        });
    }
});
exports.consultarInmueble = consultarInmueble;
const eliminarInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const id = req._id;
        const inmuebleEliminado = yield inmueble_models_1.default.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Inmueble eliminado",
            inmueble: inmuebleEliminado,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al eliminar inmueble`,
        });
    }
});
exports.eliminarInmueble = eliminarInmueble;
//# sourceMappingURL=inmueble.controller.js.map
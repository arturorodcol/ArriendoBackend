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
exports.consultarUsuarioInmueble = void 0;
const inmueble_models_1 = __importDefault(require("../models/inmueble.models"));
const consultarUsuarioInmueble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        // que voy a buscar //
        const usuarioInmueble = yield inmueble_models_1.default.findOne({ usuario: id }).populate({
            path: 'usuario',
            //me traigo el nombre el login y el rol
            select: 'nombre estado'
        });
        console.log(usuarioInmueble);
        res.status(200).json({
            ok: true,
            usuarioInmueble,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar usuario",
        });
    }
});
exports.consultarUsuarioInmueble = consultarUsuarioInmueble;
//get(consultar inmueble con id de usuario)
//# sourceMappingURL=arriendo.controller.js.map
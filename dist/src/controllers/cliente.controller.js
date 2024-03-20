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
exports.eliminarCliente = exports.actualizarEstadoCliente = exports.actualizarCliente = exports.getUnCliente = exports.getClientes = exports.crearCliente = void 0;
const cliente_models_1 = __importDefault(require("../models/cliente.models"));
//crear un cliente//
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const clienteNuevo = new cliente_models_1.default(body);
        const clienteCreado = yield clienteNuevo.save();
        res.status(200).json({
            ok: true,
            msg: "usuario registrado",
            cliente: clienteCreado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: `Error al crear cliente ${error}`,
        });
    }
});
exports.crearCliente = crearCliente;
//consultar todos los clientes//
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield cliente_models_1.default.find();
        res.status(200).json({
            ok: true,
            clientes,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar clientes",
        });
    }
});
exports.getClientes = getClientes;
//consultar un solo cliente//
const getUnCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //busqueda espeficica //
        console.log(id);
        const clientes = yield cliente_models_1.default.findById({ _id: id }); // que voy a buscar //
        res.status(200).json({
            ok: true,
            clientes,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar cliente",
        });
    }
});
exports.getUnCliente = getUnCliente;
const actualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo//
        const clientesActualizado = yield cliente_models_1.default.findByIdAndUpdate(id, body, { new: true }); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            cliente: clientesActualizado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar cliente",
        });
    }
});
exports.actualizarCliente = actualizarCliente;
const actualizarEstadoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo// 
        const clienteEstadoActualizado = yield cliente_models_1.default.findByIdAndUpdate(id, { estado: false }, { new: true }); // actualizar recibe tres parametros id, info que envio y lo que quiero actualizar, en este caso parametro especifico  //
        res.status(200).json({
            ok: true,
            cliente: clienteEstadoActualizado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar cliente",
        });
    }
});
exports.actualizarEstadoCliente = actualizarEstadoCliente;
const eliminarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //busqueda espeficica //
        const eliminarCliente = yield cliente_models_1.default.findByIdAndDelete(id); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            cliente: eliminarCliente,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al eliminar cliente",
        });
    }
});
exports.eliminarCliente = eliminarCliente;
//# sourceMappingURL=cliente.controller.js.map
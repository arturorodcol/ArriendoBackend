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
exports.olvidoContrasena = exports.renewToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_models_1 = __importDefault(require("../models/usuario.models"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login: loginUser, password } = req.body;
    try {
        const usuario = yield usuario_models_1.default.findOne({ login: loginUser });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "credenciales no válidas",
            });
        }
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "credenciales no válidas",
            });
        }
        const token = yield (0, jwt_1.default)(usuario._id, usuario.login);
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "hable con el administrador",
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    try {
        if (typeof id === "undefined") {
            throw new Error("No existe un id");
        }
        const usuario = yield usuario_models_1.default.findById(id);
        const token = yield (0, jwt_1.default)(id.toString());
        res.json({
            ok: true,
            token,
            usuario,
        });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
});
exports.renewToken = renewToken;
const olvidoContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, email } = req.body;
    try {
        const usuarioRegistrado = yield usuario_models_1.default.findOne({
            login,
            email,
        });
        if (!usuarioRegistrado) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales no válidas",
            });
        }
        const id = usuarioRegistrado === null || usuarioRegistrado === void 0 ? void 0 : usuarioRegistrado._id;
        if (id) {
            const token = yield (0, jwt_1.default)(id, login, "1H", process.env.JWT_SECRET_PASS);
            return res.status(200).json({
                ok: true,
                msg: "Exitoso",
                usuario: usuarioRegistrado,
                token,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Problemas con la validacion, comuniquese con el administrador",
        });
    }
});
exports.olvidoContrasena = olvidoContrasena;
//# sourceMappingURL=auth.controller.js.map
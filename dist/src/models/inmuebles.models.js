"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InmueblesSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: "ARRENDATARIO" },
    estado: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
});
//model "NOMBRE DE BASE DE DATOS EN MONGOOSE"
const InmueblesModel = (0, mongoose_1.model)("usuario", UsuarioSchema);
exports.default = UsuarioModel;
//# sourceMappingURL=inmuebles.models.js.map
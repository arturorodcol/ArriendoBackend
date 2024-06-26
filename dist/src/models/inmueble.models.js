"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InmuebleSchema = new mongoose_1.Schema({
    tipoInmueble: { type: String, required: true, unique: true },
    fechaIngreso: { type: Date, required: true },
    fechaPago: { type: Date, required: true },
    valorPago: { type: Number, required: true },
    estado: { type: String, required: true, default: "disponible" },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true }, // Referencia al usuario
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const InmuebleModel = (0, mongoose_1.model)("Inmueble", InmuebleSchema);
exports.default = InmuebleModel;
//  default: () => {       // actualizar automaticamente fecha 
//     const fechaIngreso = new Date();
//     fechaIngreso.setMonth(fechaIngreso.getMonth()+1);
//     return fechaIngreso;
// }
//# sourceMappingURL=inmueble.models.js.map
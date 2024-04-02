"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InmuebleSchema = new mongoose_1.Schema({
    tipoInmueble: { type: String, required: true },
    fechaIngreso: { type: Date, required: true },
    fechaPago: { type: Date, requiered: true },
    valorPago: { type: String, required: true },
    estado: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
});
const InmuebleModel = (0, mongoose_1.model)("inmueble", InmuebleSchema);
exports.default = InmuebleModel;
//  default: () => {       // actualizar automaticamente fecha 
//     const fechaIngreso = new Date();
//     fechaIngreso.setMonth(fechaIngreso.getMonth()+1);
//     return fechaIngreso;
// }
//# sourceMappingURL=inmueble.models.js.map
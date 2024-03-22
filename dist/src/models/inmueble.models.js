"use strict";
// Apto, tamaña, habitaciones, cocina
// Información precios N inmueble 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImmuebleSchema = new mongoose_1.Schema({
    tipoInmueble: { type: String, required: true },
    tamano: { type: Number, required: true },
    habitaciones: { type: Number, required: true },
    banos: { type: Number, required: true },
    cocina: { type: Number, required: true },
    patio: { type: Number, required: true },
    parqueadero: { type: Number, required: true },
    ascensor: { type: Boolean },
    porteria: { type: Boolean },
    createdAd: { type: Date, default: Date.now() },
    estado: { type: Boolean, required: true, default: true },
    ubicacion: { type: Object }, //problema: como hago para inyectar estos datos en postman 
    servicios: { type: Object },
    opiniones: { type: Object },
});
const InmuebleModel = (0, mongoose_1.model)("immueble", ImmuebleSchema);
exports.default = InmuebleModel;
//# sourceMappingURL=inmueble.models.js.map
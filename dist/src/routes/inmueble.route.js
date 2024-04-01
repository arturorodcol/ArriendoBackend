"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const inmueble_controller_1 = require("../controllers/inmueble.controller");
const router = (0, express_1.Router)();
router.post("/", 
// validateJWT,
// [    // permite desde express que datos son obligatorios // 
//     check("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
//     check("fechaIngreso", "La fecha de ingreso es obligatoria").not().isEmpty(),
//     check("fechaPago", "La fecha de pago es obligatoria").not().isEmpty(),
//     check("valorPago", "El valor a pagar es obligatorio").not().isEmpty(),
//     validateFields, 
// ],
inmueble_controller_1.crearInmueble);
// router.get(
//     "/", 
//     consultarInmueble);
router.delete("/:id", validate_jwt_1.default, inmueble_controller_1.eliminarInmueble);
exports.default = router;
//# sourceMappingURL=inmueble.route.js.map
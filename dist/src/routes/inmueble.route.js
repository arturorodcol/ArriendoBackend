"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const validate_fields_1 = require("../middlewares/validate-fields");
const inmueble_controller_1 = require("../controllers/inmueble.controller");
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.default, [
    (0, express_validator_1.check)("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("fechaIngreso", "La fecha de ingreso es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("fechaPago", "La fecha de pago es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("valorPago", "El valor a pagar es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], inmueble_controller_1.crearInmueble);
router.get("/", inmueble_controller_1.consultarInmueble);
router.delete("/:id", 
// validateJWT, 
inmueble_controller_1.eliminarInmueble);
exports.default = router;
//# sourceMappingURL=inmueble.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const immueble_controller_1 = require("../controllers/immueble.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.default, [
    (0, express_validator_1.check)("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], immueble_controller_1.crearImmueble);
router.get("/", immueble_controller_1.getInmuebles);
router.put("/", validate_jwt_1.default, //por customrequest y mi validadorJWT
[
    (0, express_validator_1.check)("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], immueble_controller_1.actualizarImmueble);
exports.default = router;
//# sourceMappingURL=inmueble.route.js.map
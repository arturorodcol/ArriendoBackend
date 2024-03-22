"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const immueble_controller_1 = require("../controllers/immueble.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], immueble_controller_1.crearImmueble);
router.get("/", immueble_controller_1.getInmuebles);
exports.default = router;
//# sourceMappingURL=inmueble.route.js.map
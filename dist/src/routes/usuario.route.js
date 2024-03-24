"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("tipoDocumento", "El  tipoDocumento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numeroDocumento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("login", "El login es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuarios);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.default, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("tipoDocumento", "El  tipoDocumento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numeroDocumento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("login", "El login es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], usuario_controller_1.crearUsuario);
router.get("/", validate_jwt_1.default, usuario_controller_1.getUsuarios);
router.get("/:id", validate_jwt_1.default, usuario_controller_1.getUnUsuario);
router.put("/:id", validate_jwt_1.default, usuario_controller_1.actualizarUsuario);
router.put("/estado/:id", validate_jwt_1.default, usuario_controller_1.actualizarEstadoUsuario);
router.delete("/:id", validate_jwt_1.default, usuario_controller_1.eliminarUsuarios);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map
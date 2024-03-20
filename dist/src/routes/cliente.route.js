"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controllers/cliente.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail,
    validate_fields_1.validateFields,
], cliente_controller_1.crearCliente);
router.get("/", cliente_controller_1.getClientes);
router.get("/:id", cliente_controller_1.getUnCliente);
router.put("/:id", cliente_controller_1.actualizarCliente);
router.put("/estado/:id", cliente_controller_1.actualizarEstadoCliente);
router.delete("/:id", cliente_controller_1.eliminarCliente);
exports.default = router;
//# sourceMappingURL=cliente.route.js.map
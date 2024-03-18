"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controllers/cliente.controller");
const router = (0, express_1.Router)();
router.post("/", cliente_controller_1.crearCliente);
exports.default = router;
//# sourceMappingURL=cliente.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("login", "El login es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.login);
router.get("/", validate_jwt_1.default, auth_controller_1.renewToken);
router.post("/olvidocontrasena", [
    (0, express_validator_1.check)("login", "El login es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.olvidoContrasena);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
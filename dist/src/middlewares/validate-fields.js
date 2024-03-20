"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const validateFields = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req); //envio petición//
    if (!errores.isEmpty()) { //si hay errores muestremelos //
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        }); //si no hay errores continue ejecución//       
    }
    next();
}; //esta cosntante la implento en rutas//
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map
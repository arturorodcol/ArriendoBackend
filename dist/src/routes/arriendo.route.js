"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arriendo_controller_1 = require("../controllers/arriendo.controller");
const router = (0, express_1.Router)();
router.get("/:id", arriendo_controller_1.consultarUsuarioInmueble);
exports.default = router;
//# sourceMappingURL=arriendo.route.js.map
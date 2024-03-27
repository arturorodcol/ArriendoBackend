import { Router } from "express";
import { validateFields } from "../middlewares/validate-fields";
import { cambiarContrasena, login, olvidoContrasena, renewToken } from "../controllers/auth.controller";
import { check } from "express-validator";
import validateJWT, { validateJWTPass } from "../middlewares/validate-jwt";

const router = Router();

router.post(
    "/",
    [   
        check("login", "El login es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields, 
    ],
    login
    );

router.get("/", validateJWT, renewToken);

router.post(
    "/olvidocontrasena",
    [   
        check("login", "El login es obligatorio").not().isEmpty(),
        check("numeroDocumento", "El número de documento es obligatorio").not().isEmpty(),
        validateFields, 
    ],
    olvidoContrasena
    );

router.put(
    "/cambiocontrasena",
    validateJWTPass,
    [
        check("password", "el password es obligatorio").not().isEmpty(),
        validateFields,
    ], 
    cambiarContrasena);

export default router;
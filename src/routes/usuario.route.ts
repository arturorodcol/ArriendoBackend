import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { crearUsuario } from "../controllers/usuario.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post(
    "/",
    validateJWT, //problema: aprece error Token Invalido 
    [    // permite desde express que datos son obligatorios // 
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty().isEmail(),
        check("tipoDocumento", "El  tipoDocumento es obligatorio").not().isEmpty(),
        check("numeroDocumento", "El numeroDocumento es obligatorio").not().isEmpty(),
        check("login", "El login es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields, 
    ],
    crearUsuario);

export default router;
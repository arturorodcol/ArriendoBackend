import { Router } from "express";
import { validateFields } from "../middlewares/validate-fields";
import { login } from "../controllers/auth.controller";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post(
    "/",
    [   
        check("login", "El login es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields, 
    ],
    login);

export default router;
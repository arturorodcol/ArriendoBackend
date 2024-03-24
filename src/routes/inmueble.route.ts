import { Router } from "express";
import { actualizarImmueble, crearImmueble, getInmuebles } from "../controllers/immueble.controller";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post(
    "/",
    validateJWT,
    [
        check("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
        validateFields,
    ],
    crearImmueble
);

router.get("/", getInmuebles);

router.put(   
    "/",
    validateJWT, //por customrequest y mi validadorJWT
    [
        check("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
        validateFields,
    ],
    actualizarImmueble
);

export default router;
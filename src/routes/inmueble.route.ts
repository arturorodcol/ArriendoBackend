import { Router } from "express";
import { crearImmueble, getInmuebles } from "../controllers/immueble.controller";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";

const router = Router();

router.post(
    "/",
    [
        check("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
        validateFields,
    ],
    crearImmueble
);

router.get("/", getInmuebles);

export default router;
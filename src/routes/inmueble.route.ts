import { Router } from "express";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { 
    crearInmueble, 
    consultarInmueble, 
    eliminarInmueble, 
    actualizarInmueble
} from "../controllers/inmueble.controller";

const router = Router();

router.post(
    "/",
    [    // permite desde express que datos son obligatorios // 
        check("tipoInmueble", "El tipoInmueble es obligatorio").not().isEmpty(),
         check("fechaIngreso", "La fecha de ingreso es obligatoria").not().isEmpty(),
         check("fechaPago", "La fecha de pago es obligatoria").not().isEmpty(),
        check("valorPago", "El valor a pagar es obligatorio").not().isEmpty(),
         validateFields, 
    ],
    crearInmueble);

router.get(
    "/", 
    consultarInmueble);

router.delete(
    "/:id",
    // validateJWT, 
    eliminarInmueble);

router.put(
    "/:id",
    // validateJWT, 
actualizarInmueble);

export default router;
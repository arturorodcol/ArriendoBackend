import { Router } from "express";
import { consultarUsuarioInmueble } from "../controllers/arriendo.controller";

const router = Router();

router.get(
    "/:id", 
    consultarUsuarioInmueble);

export default router;
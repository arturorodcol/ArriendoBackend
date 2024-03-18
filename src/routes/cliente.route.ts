import { Router } from "express";
import { crearCliente } from "../controllers/cliente.controller";

const router = Router();

router.post("/", crearCliente);

export default router;
import { Router } from "express";
import { actualizarCliente, actualizarEstadoCliente, crearCliente, eliminarCliente, getClientes, getUnCliente,  } from "../controllers/cliente.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post(
    "/", 
    [    // permite desde express que datos son obligatorios // 
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty().isEmail,
        validateFields, 
    ],
    crearCliente);
router.get("/", getClientes);
router.get("/:id", getUnCliente);
router.put("/:id", actualizarCliente);
router.put("/estado/:id", actualizarEstadoCliente)
router.delete("/:id", eliminarCliente);

export default router;
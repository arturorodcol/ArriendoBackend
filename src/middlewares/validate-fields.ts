import { NextFunction, Request, Response, } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req: Request, res: Response, next: NextFunction ) => {
    const errores = validationResult(req);  //envio petición//
    if (!errores.isEmpty()) {    //si hay errores muestremelos //
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        });   //si no hay errores continue ejecución//       
    } 
    next(); 
}; //esta cosntante la implento en rutas//
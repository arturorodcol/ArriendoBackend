import { Request, Response } from "express";
import ClienteModel from "../models/cliente.models";

export const crearCliente = async(req: Request, res: Response)=> {
    const {body} = req;
    
    try {
    
        console.log(req); 
        console.log(body);
    
        const clienteNuevo = new ClienteModel(body);
        const clienteCreado = await clienteNuevo.save();

        res.status(200).json({
            ok: true,
            msg: "usuario registrado",
            cliente: clienteCreado,
         });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "error al crear el cliente", 
        });
    }
};
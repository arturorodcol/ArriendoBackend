import { Request, Response } from "express";
import InmuebleModel from "../models/inmueble.models";

export const crearImmueble = async (req: Request, res: Response ) => {
    const {body} = req;
    // const id = req._id; // Cuanto implementemos token

    try { 
        // const inmuebleNuevo = new InmuebleModel({ usuario: id, ...body }); //Cuanto implementemos token
        const inmuebleNuevo = new InmuebleModel({...body });
        const inmuebleCreado = await inmuebleNuevo.save();

        res.status(200).json({
            ok: true,
            msg: "Inmueble registrado satifactoriamente",
            inmuebleCreado,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el producto`,
            error,
        });
    }
};

export const getInmuebles = async (req: Request, res: Response) => {
    try {
        const inmuebles = await InmuebleModel.find().populate({
            path: "usuario",
            select: "nombre numeroDocumento email",
        });

        res.json({
            ok: true,
            inmuebles,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
    }
};
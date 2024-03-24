import { Request, Response } from "express";
import InmuebleModel from "../models/inmueble.models";
import { CustomRequest } from "../middlewares/validate-jwt";


export const crearImmueble = async (req: CustomRequest, res: Response ) => {
    const {body} = req;
    const id = req._id; //rep._id problema integrar con validateJWT

    try { 

        const inmuebleNuevo = new InmuebleModel({ usuario: id, ...body });
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
        const inmuebles = await InmuebleModel.find();

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

export const actualizarImmueble = async (req: CustomRequest, res: Response ) => {   //CustomRuquest -> siempre con token (cuando ponga token usarlo)
    const {body} = req;
    const id = req._id;

    try {
        const update = { ...body, updateAd: new Date() }; // justo antes de actualización, actualiza body y agrego fecha de ese momento
        const actualizarImmueble = await InmuebleModel.findByIdAndUpdate(id, body, {new: true});
        res.status(200).json({
            ok: true,
            actualizarImmueble,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
    }

    
}
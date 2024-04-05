import { Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import InmuebleModel from "../models/inmueble.models";


export const consultarUsuarioInmueble = async (req: CustomRequest, res: Response) => {
    try {
        const id = req.params.id; 
        console.log(id);
// que voy a buscar //
        const usuarioInmueble = await InmuebleModel.findOne({usuario: id}).populate({
            path: 'usuario',
            //me traigo el nombre el login y el rol
            select: 'nombre estado' 
        });
        console.log(usuarioInmueble);
        res.status(200).json({
            ok: true,
            usuarioInmueble,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar el usuario", 
        });
    }
}

//get(consultar inmueble con id de usuario)
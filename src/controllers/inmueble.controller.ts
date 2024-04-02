import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import InmuebleModel from "../models/inmueble.models";

export const crearInmueble = async (req: CustomRequest, res: Response) => {
    const { body } = req; 
    const id = req._id;
   
    try { 
     
        const inmuebleNuevo = new InmuebleModel({ usuario: id, ...body
        });
        const inmuebleCreado = await inmuebleNuevo.save();
    console.log("esto es ", inmuebleNuevo);
        res.status(200).json({
            ok: true, 
            msg: "Producto registrado satisfactoriamente", 
            inmuebleCreado,
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `error al crear el inmueble`,
        });
    }
};

export const consultarInmueble = async (req: Request, res: Response) => {
    try {
        const inmuebles = await InmuebleModel.find(); 
        res.json({
            ok: true,
            inmuebles,
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar inmuebles`,
            error,
        });
    }
};

export const eliminarInmueble = async (req: CustomRequest, res: Response) => {
    try {
      const { body } = req;
      const id = req._id;
        
      const inmuebleEliminado = await InmuebleModel.findByIdAndDelete(id);
  
      res.json({
        ok: true,
        msg: "Inmueble eliminado",
        inmueble: inmuebleEliminado,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: `Error al eliminar inmueble`,
      });
    }
};

export const actualizarInmueble = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { body } = req; 

        const inmuebleActualizo = await InmuebleModel.findByIdAndUpdate(id,  body, { new: true});
        res.status(200).json({
            ok: true,
            msg: "Inmueble actualizado",
            inmueble: inmuebleActualizo, 
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mgs: `Error al actualizar inmueble`,
        });
    }
};

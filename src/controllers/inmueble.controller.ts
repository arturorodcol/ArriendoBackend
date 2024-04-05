import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import InmuebleModel from "../models/inmueble.models";
import UsuarioModel from "../models/usuario.models";




export const crearInmueble = async (req: CustomRequest, res: Response) => {
    const { body } = req;
    const idUsuario = body.usuario; // Suponiendo que el ID del usuario se envía en el cuerpo de la solicitud como 'usuario'

    try {
        // Verificar si el usuario existe
        const usuario = await UsuarioModel.findById(idUsuario);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

          // solo se agrega con arrendatario
          if (usuario.rol !== 'ARRENDATARIO') {
            return res.status(403).json({
                ok: false,
                msg: "Unicamente se asocian inmuebles a los arrendatarios y eres ADMIN.",
            });
        }
        // aca verificamos que no este asociado 
        const inmuebleExistente = await InmuebleModel.findOne({ usuario: idUsuario });
        if (inmuebleExistente) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya tiene un inmueble asociado",
            });
        }

                // Verificar si ya existe un inmueble con el mismo tipo
                const inmuebleTipoExistente = await InmuebleModel.findOne({ tipoInmueble: body.tipoInmueble });
                if (inmuebleTipoExistente) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Ya existe un inmueble con el mismo tipo",
                    });
                }
        //ya creamos el inmubele y lo asociamos con el usuario
        const inmuebleNuevo = new InmuebleModel({ 
            // asocio el suuario con el inmubele
            usuario: idUsuario, 
    
            ...body
        });
        
        const inmuebleCreado = await inmuebleNuevo.save();
        
        res.status(200).json({
            ok: true,
            msg: "Inmueble registrado satisfactoriamente",
            inmuebleCreado,
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el inmueble`,
        });
    }
};


export const consultarInmueble = async (req: Request, res: Response) => {
    try {
        const inmuebles = await InmuebleModel.find().populate({
            path: 'usuario',
            //me traigo el nombre el login y el rol
            select: 'nombre login rol' 
        });

        res.json({
            ok: true,
            inmuebles,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar inmuebles",
            error,
        });
    }
};

export const eliminarInmueble = async (req: CustomRequest, res: Response) => {
    try {
      const id = req.params.id;
        
      const inmuebleEliminado = await InmuebleModel.findByIdAndDelete(id);
  
      res.json({
        ok: true,
        msg: "Inmueble eliminado",
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al eliminar el inmueble",
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


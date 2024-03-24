import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.models";
import bycrypt from "bcryptjs";
import { CustomRequest } from "../middlewares/validate-jwt";

export const crearUsuario = async (req: Request, res: Response) => {
    const {body} = req;
    const {login, password } = body; 
    console.log("estoy en el controlador");
    
    try {
        const existeLogin = await UsuarioModel.findOne({
            login: login,
        });

        if(existeLogin) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el login ${login} creado`,
            });
        }
        
        const newUsuario = new UsuarioModel({ // instancia de mi modelo//
            ...body,
        });

        const salt = bycrypt.genSaltSync(10);        //emcriptar mi contraseña//   //saltos aleatorios//
        newUsuario.password = bycrypt.hashSync(password, salt);
        
        const usuarioCreado = await newUsuario.save(); //guardar usuario//

        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuario: usuarioCreado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear usuario",
        }); 
    }
};

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await UsuarioModel.find();
        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar clientes", 
        });
    }
}

export const getUnUsuario = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        console.log(id);

        const usuario = await UsuarioModel.findById({_id: id}); // que voy a buscar //
        res.status(200).json({
            ok: true,
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar usuario", 
        });
    }
}

export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo//

        const UsuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body, {new: true}); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            usuario: UsuarioActualizado, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar usuario", 
        });
    }
}

export const actualizarEstadoUsuario = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo// 

        const usuarioEstadoActualizado = await UsuarioModel.findByIdAndUpdate( id, 
                { estado: false}, 
                {new: true}); 
            res.status(200).json({
            ok: true,
            usuario: usuarioEstadoActualizado, 
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar usuario", 
        });
    }
}

export const eliminarUsuarios = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //

        const eliminarUsuario = await UsuarioModel.findByIdAndDelete(id); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            usuario: eliminarUsuario, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al eliminar usuario", 
        });
    }
}


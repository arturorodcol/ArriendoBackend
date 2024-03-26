import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.models";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";

export const login = async (req: Request, res: Response) => {
    const { login: loginUser, password } = req.body;

    try {
        const usuario = await UsuarioModel.findOne({ login: loginUser });

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "credenciales no válidas",
            });
        }

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "credenciales no válidas",
            });
        }

        const token = await generateJWT(usuario._id, usuario.login);

        res.status(200).json({
            ok: true,
            usuario: usuario,
            token,
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "hable con el administrador",
        });
    }
}; 

export const renewToken = async (req: CustomRequest, res: Response) => {

    const id = req._id;
    console.log("este es el id de renover token", id);
    try {

        if (typeof id === "undefined") {
            throw new Error("No existe un id");
        }

        const usuario = await UsuarioModel.findById(id);

        const token = await generateJWT(id.toString(), "1H");

        res.json({
            ok: true,
            token,
            usuario,
        })
    } catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
};

export const olvidoContrasena = async (req: Request, res: Response) => {
    const { login, numeroDocumento } = req.body;

    try {
        const usuarioRegistrado = await UsuarioModel.findOne({ 
            login: login,
            numeroDocumento: numeroDocumento,
        });

        if (!usuarioRegistrado) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales no válidas",
            });
        }

        const id = usuarioRegistrado?._id;

        if (id) {

            const token = await generateJWT(
                id,
                login,
                "1H",
                process.env.JWT_SECRET_PASS
                );

            return res.status(200).json({
                ok: true,
                msg: "Exitoso",
                usuario: usuarioRegistrado,
                token,
            });
        }

    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Problemas con la validacion, por favor comuniquese con el administrador",
        });
    }
}; 

export const cambiarContrasena = async (req: CustomRequest, res: Response) => {
    
    const id = req._id;
    const { password } = req.body;

    try {
    console.log("este es el ID y Password de cambiar contrasela", id, password);
        if (!password){
            res.status(401).json({
                ok: false,
                msg: "contraseña invalida, dígite nuevamente",
            });
        }
        
        const newPassword = bcrypt.hashSync(password, 10);

        const actalizarPassword = await UsuarioModel.findByIdAndUpdate({
            _id: id,
            password: newPassword,
        });

        if(!actalizarPassword) {
            res.status(401).json({
                ok: false,
                msg: "Error al actualizar contraseña",
            });
        }

        res.status(200).json({
            ok: true,
            msg: "contraseña actualizada con exito",
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Error al actualizar contraseña",
        });
    }
}; 
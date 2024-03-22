import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.models";
import generateJWT from "../helpers/jwt";

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
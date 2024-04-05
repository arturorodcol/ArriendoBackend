import { Request, Response } from "express";
import InteraccionModel from "../models/interacciones.models";
import { enviarCorreoInteraccion } from "../helpers/mail";

export const interaccionUsuario = async (req: Request, res: Response) => {
    const { nombre, email, mensaje } = req.body;

    try {
      // Validar si ya se ha enviado un formulario usando la misma dirección de correo electrónico
      const interaccionExistente = await InteraccionModel.findOne({ email: email });
      if (interaccionExistente) {
        return res.status(409).json({
          ok: false,
          msg: "Ya se ha enviado un formulario de contacto con esta dirección de correo electrónico."
        });
      }

      // Crear un nuevo documento del formulario de contacto
      const nuevaInteraccion = new InteraccionModel({
        nombre,
        email,
        mensaje,
        createdAt: new Date()
      });

      // Guardar el formulario en la base de datos
      const interaccionGuardada = await nuevaInteraccion.save();

      await enviarCorreoInteraccion(nuevaInteraccion);  

      // Enviar respuesta exitosa al cliente
      res.status(200).json({
        ok: true,
        msg: "Formulario de contacto enviado exitosamente",
        formulario: interaccionGuardada
      });
    } catch (error) {
      console.error(error);
      // Manejar errores de forma adecuada
      res.status(500).json({
        ok: false,
        msg: "Ocurrió un error al procesar el formulario de contacto. Por favor, inténtalo de nuevo más tarde."
      });
    }
};
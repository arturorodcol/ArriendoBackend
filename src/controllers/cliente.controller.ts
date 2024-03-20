import { Request, Response } from "express";
import ClienteModel from "../models/cliente.models";


//crear un cliente//
export const crearCliente = async(req: Request, res: Response)=> {
    const {body} = req;
    
    try {
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
            msg: `Error al crear cliente ${error}`, 
        });
    }
};


//consultar todos los clientes//
export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await ClienteModel.find();
        res.status(200).json({
            ok: true,
            clientes,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar clientes", 
        });
    }
}

//consultar un solo cliente//
export const getUnCliente = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        console.log(id);

        const clientes = await ClienteModel.findById({_id: id}); // que voy a buscar //
        res.status(200).json({
            ok: true,
            clientes,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al consultar cliente", 
        });
    }
}

export const actualizarCliente = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo//

        const clientesActualizado = await ClienteModel.findByIdAndUpdate(id, body, {new: true}); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            cliente: clientesActualizado, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar cliente", 
        });
    }
}

export const actualizarEstadoCliente = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //
        const { body } = req; //recuperar la información del modelo// 

        const clienteEstadoActualizado = await ClienteModel.findByIdAndUpdate( id, 
            { estado: false}, 
            {new: true}); // actualizar recibe tres parametros id, info que envio y lo que quiero actualizar, en este caso parametro especifico  //
        res.status(200).json({
            ok: true,
            cliente: clienteEstadoActualizado, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al actualizar cliente", 
        });
    }
}

export const eliminarCliente = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; //busqueda espeficica //

        const eliminarCliente = await ClienteModel.findByIdAndDelete(id); // actualizar recibe tres parametros id, info que envio y revolución de lo que actualize //
        res.status(200).json({
            ok: true,
            cliente: eliminarCliente, 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error al eliminar cliente", 
        });
    }
}
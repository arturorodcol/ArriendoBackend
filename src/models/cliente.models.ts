import { Model, Schema, model } from "mongoose";

//nuevo Schema inmuebleArrendado

const ClienteSchema = new Schema ({
    nombre: { type: String, required: true},
    direccion: { type: String, required: false}, 
    telefono: { type: Number, required: true},
    email: { type: String, required: true},
    tipoDocumento: { type: String, required: true},
    numeroDocumento: { type: Number, required: true},
    estado: { type: Boolean, required: true, default: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
//model "NOMBRE DE BASE DE DATOS EN MONGOOSE"
const ClienteModel: Model<any> = model("cliente", ClienteSchema);
export default ClienteModel; 
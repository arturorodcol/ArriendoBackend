import { Model, Schema, model } from "mongoose";

// Definir la interfaz para el formulario de contacto
export interface InteraccionInterface {
    nombre: string;
    email: string;
    mensaje: string;
    createdAt: Date;
}

// Definir el esquema para el formulario de contacto
const InteraccionSchema = new Schema<InteraccionInterface>({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});   

const InteraccionModel: Model<any> = model("Interaccion", InteraccionSchema);
export default InteraccionModel; 
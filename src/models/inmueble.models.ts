import { Model, Schema, model } from "mongoose";

const InmuebleSchema = new Schema ({
    tipoInmueble: { type: String, required: true, unique: true },
    fechaIngreso: { type: Date, required: true },
    fechaPago: { type: Date, requiered: true},
    valorPago: { type: Number, required: true },
    estado: { type: String, required: true, default: "disponible" },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }, 
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const InmuebleModel: Model<any> = model("Inmueble", InmuebleSchema);
export default InmuebleModel; 

//  default: () => {       // actualizar automaticamente fecha 
//     const fechaIngreso = new Date();
//     fechaIngreso.setMonth(fechaIngreso.getMonth()+1);
//     return fechaIngreso;
// }
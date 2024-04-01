import { Model, Schema, model } from "mongoose";

const InmuebleSchema = new Schema ({
    tipoInmueble: { type: String, required: true },
    fechaIngreso: { type: Date, required: true },
    fechaPago: { type: Date, default: () => {
        const actualizarPago = new Date();
        actualizarPago.setMonth(actualizarPago.getMonth()+1);
        return actualizarPago;
    }},
    valorPago: { type: String, required: true },
    estado: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
});

const InmuebleModel: Model<any> = model("inmueble", InmuebleSchema);
export default InmuebleModel; 
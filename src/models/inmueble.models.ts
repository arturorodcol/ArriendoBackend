// Apto, tamaña, habitaciones, cocina
// Información precios N inmueble 

import { Model, Schema, model } from "mongoose";

interface Ubicación {
    dirección: string;
    barrio: string;
    localidad: string;
    ciudad: string;
    estrato: string;
}

// crear interfaz con datos socioeconomicos (Valor arriendo), (Valor servicios), ()

interface Opiniones {
    comentarios: string;
    fecha?: Date;
}

interface Servicios {
    acueducto: boolean;
    energia: boolean;
    gas: boolean;
    alcantarillado: boolean;
    internet: boolean;
    telefonia: boolean;
    television: boolean;
    administracion: boolean;
}

interface InmuebleInterface {
    tipoInmueble: string;
    tamano: number;
    habitaciones: number;
    banos: number;
    cocina: number;
    patio: number;
    parqueadero: number;
    ascensor: boolean;
    porteria: boolean;
    createdAd: Date;
    // agregar update
    estado: boolean;
    ubicacion: Ubicación;
    servicios: Servicios;
    opiniones: Opiniones;
}

const ImmuebleSchema = new Schema<InmuebleInterface>({
    tipoInmueble: { type: String, required: true },
    tamano: { type: Number, required: true }, 
    habitaciones: { type: Number, required: true },  
    banos: { type: Number, required: true }, 
    cocina: { type: Number, required: true }, 
    patio: { type: Number, required: true }, 
    parqueadero: { type: Number, required: true }, 
    ascensor: { type: Boolean }, 
    porteria: { type: Boolean }, 
    createdAd: { type: Date, default: Date.now() }, 
    //agregar update  updateAd: { type: Date, default: Date.now() }, -> antes de crearlo, controlador cambiar valor 
    estado: { type: Boolean, required: true, default: true },  // arrendado 
    ubicacion: { type: Object },  //problema: como hago para inyectar estos datos en postman 
    servicios: { type: Object },
    opiniones: { type: Object },
    // llamar referencia (modelo usuario)
});

const InmuebleModel: Model<InmuebleInterface> = model<InmuebleInterface>(
  "immueble", 
  ImmuebleSchema  
);

export default InmuebleModel; 
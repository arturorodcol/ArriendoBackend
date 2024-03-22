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
    baños: number;
    cocina: number;
    patio: number;
    parqueadero: number;
    ascensor: boolean;
    porteria: boolean;
    createdAd: Date;
    estado: boolean;
    ubicacion: Ubicación;
    servicios: Servicios;
    opiniones: Opiniones;
}

const ImmuebleSchema = new Schema<InmuebleInterface>({
    tipoInmueble: { type: String, required: true },
    tamano: { type: Number, required: true }, 
    habitaciones: { type: Number, required: true },  
    baños: { type: Number, required: true }, 
    cocina: { type: Number, required: true }, 
    patio: { type: Number, required: true }, 
    parqueadero: { type: Number, required: true }, 
    ascensor: { type: Boolean, required: true }, 
    porteria: { type: Boolean, required: true }, 
    createdAd: { type: Date, default: Date.now() }, 
    estado: { type: Boolean, required: true, default: true }, 
    ubicacion: { type: Object, required: true },
    servicios: { type: Object, required: true },
    opiniones: { type: Object },
})

const InmuebleModel: Model<InmuebleInterface> = model<InmuebleInterface>(
  "immueble", 
  ImmuebleSchema  
);

export default InmuebleModel; 
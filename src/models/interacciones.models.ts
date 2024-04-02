import { Schema } from "mongoose";

const InteraccionSchema = new Schema ({
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    mensaje: { type: String, required: true},
});    
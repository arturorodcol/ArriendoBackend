"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const cliente_route_1 = __importDefault(require("./routes/cliente.route"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const inmueble_route_1 = __importDefault(require("./routes/inmueble.route"));
class Server {
    constructor() {
        this.apiPaths = {
            cliente: "/api/v1/cliente/",
            usuario: "/api/v1/usuario/",
            inmueble: "/api/v1/inmueble/",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        (0, connection_1.dbConnection)(); //conectar con mongoose//
        this.middlewares(); // agregar seguridad//
        this.routes(); //agregar rutas // 
    }
    miPrimeraApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "información" }));
    }
    middlewares() {
        this.app.use(express_1.default.json()); // todo lo conviere a json // 
        this.miPrimeraApi();
    }
    routes() {
        this.app.use(this.apiPaths.cliente, cliente_route_1.default);
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        this.app.use(this.apiPaths.inmueble, inmueble_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
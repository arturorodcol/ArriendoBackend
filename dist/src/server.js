"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const inmueble_route_1 = __importDefault(require("./routes/inmueble.route"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            usuario: "/api/v1/usuario/",
            auth: "/api/v1/auth/",
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
        this.app.use((0, cors_1.default)()); //permisos para consumir api
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        this.app.use(this.apiPaths.auth, auth_route_1.default);
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
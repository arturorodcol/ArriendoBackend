"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const cliente_route_1 = __importDefault(require("./routes/cliente.route"));
class Server {
    constructor() {
        this.apiPaths = {
            cliente: "/api/v1/cliente",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        (0, connection_1.dbConnection)();
        this.middlewares();
        this.routes();
    }
    miPrimeraApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "información" }));
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.miPrimeraApi();
    }
    routes() {
        this.app.use(this.apiPaths.cliente, cliente_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
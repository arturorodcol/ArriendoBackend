import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import clienteRoutes from "./routes/cliente.route";
import usuarioRoutes from "./routes/usuario.route";


class Server{
private app: Application;
private port: string;
private apiPaths = {
    cliente: "/api/v1/cliente/",
    usuario: "/api/v1/usuario/", 
};

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000"; 

        dbConnection(); //conectar con mongoose//
        this.middlewares(); // agregar seguridad//
        this.routes();  //agregar rutas // 
    }

    miPrimeraApi(){
        this.app.get("/", (req: Request, res: Response) =>
        res.status(200).json({msg: "información"})
        );
    }  

    middlewares(){
        this.app.use(express.json()); // todo lo conviere a json // 
        this.miPrimeraApi();
    }

    routes(): void{
        this.app.use(this.apiPaths.cliente, clienteRoutes );
        this.app.use(this.apiPaths.usuario, usuarioRoutes );
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
export default Server;
import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import clienteRoutes from "./routes/cliente.route";


class Server{
private app: Application;
private port: string;
private apiPaths = {
    cliente: "/api/v1/cliente",
};

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000"; 

        dbConnection();
        this.middlewares();
        this.routes();
    }

    miPrimeraApi(){
        this.app.get("/", (req: Request, res: Response) =>
        res.status(200).json({msg: "información"})
        );
    }  

    middlewares(){
        this.app.use(express.json()); 
        this.miPrimeraApi();
    }

    routes(): void{
        this.app.use(this.apiPaths.cliente, clienteRoutes )
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
export default Server;
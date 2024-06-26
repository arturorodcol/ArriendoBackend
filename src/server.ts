import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import usuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.route";
import inmuebleRoutes from "./routes/inmueble.route";
import interaccionRoutes from "./routes/interaccion.route";
import arriendoRoutes from "./routes/arriendo.route";
import cors from "cors";


class Server{
private app: Application;
private port: string;
private apiPaths = {
    usuario: "/api/v1/usuario/",
    auth: "/api/v1/auth/",
    inmueble: "/api/v1/inmueble/",
    interaccion: "/api/v1/interaccion/",
    arriendo: "/api/v1/arriendo/"
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
        this.app.use(cors()); //permisos para consumir api
        
        this.app.use(this.apiPaths.usuario, usuarioRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.inmueble, inmuebleRoutes); 
        this.app.use(this.apiPaths.interaccion, interaccionRoutes); 
        this.app.use(this.apiPaths.arriendo, arriendoRoutes); 
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto", this.port);
        });
    }
}
export default Server; 
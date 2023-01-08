import express from "express";
import cors from "cors";
import colors from "colors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketController } from "../sockets/controller.js";

dotenv.config({ path: "./.env" });

class Servidor {
  constructor() {
    this.app = express(); // Creamos en el servidor la app de express como una propiedad del servidor
    this.port = process.env.PORT || 3000;

    // Aca iniciamos el server con el socket io para nuestra app
    this.server = createServer(this.app);
    // eL IO es toda  la informacion de los sockets conenctados
    this.io = new Server(this.server); // Servidor de sockets (Socket.io)

    this.path = {};

    // Middlewares son funciones que agregan funciones que se ejecutan cuando se levanta el servidor
    this.middlewares();

    // Rutas de mi app
    this.routes();

    // Aca vamos a manejar los eventos por socket para enterarnos cuando pasa algo que modifique el server
    this.sockets();
  }

  middlewares() {
    // Uso del CORS
    this.app.use(cors()); // Es un middlewear porque usa el use!

    // Directorio publico que me permite ver en http://localhost:8080 el index.html ubicado en la carpeta public
    this.app.use(express.static("public"));
  }

  routes() {
    // Mis rutas
    // this.app.use(this.path.auth, routerAuth);
  }

  sockets() {
    // Aca lo que vamos a hacer es detectar cuando un cliente se conecta
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:".bgGreen.white, this.port);
    });
  }
}

export { Servidor };

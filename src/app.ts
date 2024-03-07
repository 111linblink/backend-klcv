import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
const express = require('express');
const { Application } = require('express');



/*
*
*  Karen Linette Cabrera Vidal
* 23 de Junio de 2023
*/


class Server {
  private app: Application;

  //Inicializar clase
  constructor(){
    this.app = express();
    this.config();
    this.routes();
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }

  //Configuración de módulos
  config(): void{
    // configuración del puerto para el servidor
    this.app.set("port",3000);

    //muestra las peticiones en consola
    this.app.use(morgan("dev"));

    //puertos de conexión de la API
    this.app.use(cors());

    //solo se permiten oeticiones en formato JSON
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false, }),
    )
  }

  //Configura las rutas
  routes(){
    this.app.use("/", authRoutes);
    this.app.use('/usuario', usuarioRoutes);
  }
}
const server = new Server();
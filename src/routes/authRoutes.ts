import {Router, RouterOptions} from "express";
import { authController } from "../controllers/authController";

/*
* Karen Linette Cabrera Vidal
* 29 de febrero de 2024
*/

class AuthRoutes{
    
    //Objetode tipo Router
    public router: Router;

    //Inicializa
    constructor(){
        this.router = Router();
        this.config();        
    }

    config(){
        this.router.post('/', authController.iniciarSesion);
        }
    }

const authRoutes = new AuthRoutes();

export default authRoutes.router;
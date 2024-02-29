import {Router, RouterOptions} from "express";

/*
* Karen Linette Cabrera Vidal
* 29 de febrero de 2024
*/

class AuthRoutes{
    
    //Objetode tipo Router
    public router: Router;

    //Inicializa
    constructor(){
    }

    config(){
        this.router.get('/', (req, res) => {
            res.send('Invocando Autenticación')
        });
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
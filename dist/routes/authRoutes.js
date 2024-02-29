"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Karen Linette Cabrera Vidal
* 29 de febrero de 2024
*/
class AuthRoutes {
    //Inicializa
    constructor() {
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Invocando Autenticación');
        });
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("Email y contraseña recibidos:", email, password);
                if (!email || !password) {
                    console.log("Correo electrónico o contraseña faltante en la solicitud.");
                    return res.status(400).json({ message: "El correo electrónico y la contraseña son requeridos", code: 1 });
                }
                const user = yield usuarioModelo_1.default.getUserByEmail(email);
                if (!user) {
                    console.log("Usuario no encontrado con el correo electrónico proporcionado.");
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                const result = yield utils_1.utils.checkPassword(password, user.password);
                if (result) {
                    console.log("Autenticación correcta.");
                    const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, 'secreto', { expiresIn: '1h' });
                    return res.json({ message: "Autenticación correcta", token, code: 0 });
                }
                else {
                    console.log("Contraseña incorrecta.");
                    return res.json({ message: "Contraseña incorrecta", code: 1 });
                }
            }
            catch (error) {
                console.error("Error en el método iniciarSesion:", error);
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map
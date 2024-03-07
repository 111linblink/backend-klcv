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
const validator_1 = __importDefault(require("validator"));
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo")); // Cambia a minúsculas
const utils_1 = require("../utils/utils");
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password);
                if (!email || !password) {
                    return res.status(400).json({ message: "Debe proporcionar tanto el correo electrónico como la contraseña", code: 1 });
                }
                const lstUsers = yield usuarioModelo_1.default.getUserByEmail(email);
                if (lstUsers.length <= 0) {
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                let result = yield utils_1.utils.checkPassword(password, lstUsers[0].password);
                if (result) {
                    return res.json({ message: "Autenticación correcta", code: 0 });
                }
                else {
                    return res.json({ message: "Contraseña incorrecta", code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    registro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!validator_1.default.isEmail(email)) {
                    return res.status(400).json({ message: "Correo electrónico inválido", code: 1 });
                }
                const existingUser = yield usuarioModelo_1.default.getUserByEmail(email);
                if (existingUser.length > 0) {
                    return res.status(400).json({ message: 'Ya existe un usuario con este email', code: 1 });
                }
                // Si pasa las validaciones, registrar el usuari
                return res.json({ message: "Usuario registrado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    resetearContraseña(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lógica para resetear la contraseña
                return res.json({ message: "Contraseña reseteada correctamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    actualizarPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lógica para actualizar el perfil del usuario
                return res.json({ message: "Perfil actualizado correctamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map
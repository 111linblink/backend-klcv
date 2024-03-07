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
exports.usuarioController = void 0;
const validator_1 = __importDefault(require("validator"));
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener la lista de usuarios desde el modelo
                const usuarios = yield usuarioModelo_1.default.list();
                // Enviar la lista de usuarios como parte de la respuesta
                return res.json({ message: "Listado de Usuario", code: 0, usuarios });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                if (!validator_1.default.isEmail(email)) {
                    return res.status(400).json({ message: "Correo electrónico inválido" });
                }
                const existingUser = yield usuarioModelo_1.default.getUserByEmail(email);
                if (existingUser.length > 0) {
                    return res.status(400).json({ message: 'Ya existe un usuario con este email' });
                }
                return res.json({ message: "Usuario agregado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Verificar si el usuario existe antes de actualizar
                const existingUser = yield usuarioModelo_1.default.getUserByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: 'El usuario no existe' });
                }
                return res.json({ message: "Usuario actualizado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Verificar si el usuario existe antes de eliminar
                const existingUser = yield usuarioModelo_1.default.getUserByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: 'El usuario no existe' });
                }
                return res.json({ message: "Usuario eliminado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=authModelo.js.map
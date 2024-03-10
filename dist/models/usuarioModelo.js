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
const connection_1 = __importDefault(require("../config/connection"));
class UsuarioModelo {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield connection_1.default;
                const result = yield connection.query("SELECT email, password, role FROM tbl_usuario");
                return result;
            }
            catch (error) {
                throw new Error(`Error al listar usuarios: ${error.message}`);
            }
        });
    }
    add(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el usuario ya existe
                const existingUser = yield this.getUserByEmail(usuario.email);
                if (existingUser) {
                    throw new Error('Ya existe un usuario con este correo electrónico');
                }
                const connection = yield connection_1.default;
                const result = yield connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
                return result;
            }
            catch (error) {
                throw new Error(`Error al agregar usuario: ${error.message}`);
            }
        });
    }
    update(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el usuario existe antes de actualizar
                const existingUser = yield this.getUserByEmail(usuario.email);
                if (!existingUser) {
                    throw new Error('El usuario no existe');
                }
                const connection = yield connection_1.default;
                let updateQuery = "UPDATE tbl_usuario SET";
                const queryParams = [];
                if (usuario.password) {
                    updateQuery += " password = ?,";
                    queryParams.push(usuario.password);
                }
                if (usuario.role) {
                    updateQuery += " role = ?,";
                    queryParams.push(usuario.role);
                }
                updateQuery = updateQuery.slice(0, -1);
                updateQuery += " WHERE email = ?";
                queryParams.push(usuario.email);
                const result = yield connection.query(updateQuery, queryParams);
                return result;
            }
            catch (error) {
                throw new Error(`Error al actualizar usuario: ${error.message}`);
            }
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.getUserByEmail(email);
                if (!existingUser) {
                    throw new Error('El usuario no existe');
                }
                const connection = yield connection_1.default;
                const result = yield connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
                return result;
            }
            catch (error) {
                throw new Error(`Error al eliminar usuario: ${error.message}`);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield connection_1.default;
                const result = yield connection.query("SELECT * FROM tbl_usuario WHERE email = ?", [email]);
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                throw new Error(`Error al obtener usuario por email: ${error.message}`);
            }
        });
    }
}
const model = new UsuarioModelo();
exports.default = model;
//# sourceMappingURL=usuarioModelo.js.map
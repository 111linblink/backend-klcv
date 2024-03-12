import pool from "../config/connection";

class UsuarioModelo {

    public async list() {
        try {
            const connection = await pool;
            const result = await connection.query("SELECT email, password, role FROM tbl_usuario");
            return result;
        } catch (error) {
            throw new Error(`Error al listar usuarios: ${error.message}`);
        }
    }

    public async add(usuario: { email: string, password: string, role: string }) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await this.getUserByEmail(usuario.email);
            if (existingUser) {
                throw new Error('Ya existe un usuario con este correo electrónico');
            }
    
            // Validar que todos los campos requeridos estén presentes y no estén vacíos
            const requiredFields = ['email', 'password', 'role'];
            const emptyFields = [];
            for (const field of requiredFields) {
                if (!usuario[field] || usuario[field].trim() === '') {
                    emptyFields.push(field);
                }
            }
    
            if (emptyFields.length > 0) {
                throw new Error(`Todos los campos son requeridos.`);
            }
    
            const connection = await pool;
            const result = await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
            return result;
        } catch (error) {
            throw new Error(`Error al agregar usuario: ${error.message}`);
        }
    }    

    public async update(usuario: { email: string, password?: string, role?: string }) {
        try {
            // Verificar si el usuario existe antes de actualizar
            const existingUser = await this.getUserByEmail(usuario.email);
            if (!existingUser) {
                throw new Error('El usuario no existe');
            }
            
            // Verificar si todos los campos están llenos
            if (!usuario.password || !usuario.role) {
                throw new Error('Todos los campos son obligatorios');
            }
    
            const connection = await pool;
            let updateQuery = "UPDATE tbl_usuario SET password = ?, role = ? WHERE email = ?";
            const queryParams = [usuario.password, usuario.role, usuario.email];
    
            const result = await connection.query(updateQuery, queryParams);
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }
    
    

    public async delete(email) {
        try {
            const existingUser = await this.getUserByEmail(email);
            if (!existingUser) {
                throw new Error('El usuario no existe');
            }
            
            const connection = await pool;
            const result = await connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    public async getUserByEmail(email) {
        try {
            const connection = await pool;
            const result = await connection.query("SELECT * FROM tbl_usuario WHERE email = ?", [email]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error(`Error al obtener usuario por email: ${error.message}`);
        }
    }
}

const model = new UsuarioModelo();
export default model;

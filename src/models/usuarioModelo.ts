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

    public async add(usuario) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await this.getUserByEmail(usuario.email);
            if (existingUser) {
                throw new Error('Ya existe un usuario con este correo electrónico');
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
            
            const connection = await pool;
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

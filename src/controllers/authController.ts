import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo"; // Cambia a minúsculas
import { utils } from "../utils/utils";

class AuthController {

    public async iniciarSesion(req: Request, res: Response) {
        try {
            
            const { email, password } = req.body;
            console.log(email, password);
            if (!email || !password) {
                return res.status(400).json({ message: "Debe proporcionar tanto el correo electrónico como la contraseña", code: 1 });
            }
            const lstUsers = await model.getUserByEmail(email);
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }
            let result = await utils.checkPassword(password, lstUsers[0].password);
            if (result) {
                return res.json({ message: "Autenticación correcta", code: 0 });
            } else {
                return res.json({ message: "Contraseña incorrecta", code: 1 });
            }
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async registro(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Correo electrónico inválido", code: 1 });
            }
            const existingUser = await model.getUserByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Ya existe un usuario con este email', code: 1 });
            }

            // Si pasa las validaciones, registrar el usuari

            return res.json({ message: "Usuario registrado exitosamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async resetearContraseña(req: Request, res: Response) {
        try {
            // Lógica para resetear la contraseña
            return res.json({ message: "Contraseña reseteada correctamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async actualizarPerfil(req: Request, res: Response) {
        try {
            // Lógica para actualizar el perfil del usuario
            return res.json({ message: "Perfil actualizado correctamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

}

export const authController = new AuthController();

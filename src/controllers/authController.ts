import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";
import { utils } from "../utils/utils";
import jwt from 'jsonwebtoken';

class AuthController {

    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log("Email y contraseña recibidos:", email, password);

            if (!email || !password) {
                console.log("Correo electrónico o contraseña faltante en la solicitud.");
                return res.status(400).json({ message: "El correo electrónico y la contraseña son requeridos", code: 1 });
            }

            const user = await model.getUserByEmail(email);

            if (!user) {
                console.log("Usuario no encontrado con el correo electrónico proporcionado.");
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

            const result = await utils.checkPassword(password, user.password);

            if (result) {
                console.log("Autenticación correcta.");
                const token = jwt.sign({ email: user.email, role: user.role }, 'secreto', { expiresIn: '1h' });
                return res.json({ message: "Autenticación correcta", token, code: 0 });
            } else {
                console.log("Contraseña incorrecta.");
                return res.json({ message: "Contraseña incorrecta", code: 1 });
            }
        } catch (error: any) {
            console.error("Error en el método iniciarSesion:", error);
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}

export const authController = new AuthController();

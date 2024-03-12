import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";
import { utils } from "../utils/utils";

class UsuarioController {

  public async list(req: Request, res: Response) {
    try {
      // Obtener la lista de usuarios desde el modelo
      const usuarios = await model.list();
      
      // Enviar la lista de usuarios como parte de la respuesta
      return res.json({ message: "Listado de Usuario", code: 0, usuarios });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async add(req: Request, res: Response) {
    try {
        const { email, password, role } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Correo electrónico inválido" });
        }

        // Validar que todos los campos requeridos estén presentes y no estén vacíos
        const requiredFields = ['email', 'password', 'role'];
        const emptyFields = [];
        for (const field of requiredFields) {
            if (!req.body[field] || req.body[field].trim() === '') {
                emptyFields.push(field);
            }
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ message: `Todos los campos son requeridos: ${emptyFields.join(', ')}` });
        }

        const existingUser = await model.getUserByEmail(email);
        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ message: 'Ya existe un usuario con este email' });
        }

        // Cifrar la contraseña antes de agregar el usuario
        const encryptedPassword = await utils.hashPassword(password);

        // Agregar el usuario con la contraseña cifrada
        await model.add({ email, password: encryptedPassword, role });

        return res.json({ message: "Usuario agregado exitosamente", code: 0 });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
}


  public async update(req: Request, res: Response) {
    try {
        const { email, password, role } = req.body;
        const existingUser = await model.getUserByEmail(email);
        if (!existingUser || existingUser.length === 0) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        // Si se proporciona una nueva contraseña, cifrarla antes de actualizar
        let encryptedPassword;
        if (password) {
            encryptedPassword = await utils.hashPassword(password);
        }

        // Verificar si todos los campos están llenos
        if (!encryptedPassword || !role) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Objeto que contiene los campos a actualizar
        const updatedFields: { email: string, password: string, role: string } = { email, password: encryptedPassword, role };

        // Actualizar el usuario con los campos proporcionados
        await model.update(updatedFields);

        return res.json({ message: "Usuario actualizado exitosamente", code: 0 });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const existingUser = await model.getUserByEmail(email);
      if (!existingUser || existingUser.length === 0) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }
      await model.delete(email);

      return res.json({ message: "Usuario eliminado exitosamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}

export const usuarioController = new UsuarioController();

import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo"; 

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
      const existingUser = await model.getUserByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Ya existe un usuario con este email' });
      }
      
      return res.json({ message: "Usuario agregado exitosamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe antes de actualizar
      const existingUser = await model.getUserByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }
      return res.json({ message: "Usuario actualizado exitosamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe antes de eliminar
      const existingUser = await model.getUserByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }

      return res.json({ message: "Usuario eliminado exitosamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}

export const usuarioController = new UsuarioController();

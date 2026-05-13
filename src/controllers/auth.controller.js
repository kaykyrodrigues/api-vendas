import AuthService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../database/pool.js";

class AuthController {
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);

      return res.status(201).json(result);
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      return res.status(400).json({
        error: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, userpassword } = req.body;

      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      const user = rows[0];

      if (!user) {
        return res.status(401).json({
          error: "Usuário não encontrado",
        });
      }

      const isMatch = await bcrypt.compare(
        userpassword,
        user.userpassword
      );

      if (!isMatch) {
        return res.status(401).json({
          error: "Senha inválida",
        });
      }

      // 🔥 PADRONIZAÇÃO DO TOKEN
      const token = jwt.sign(
        {
          id: user.id, // <- PADRÃO
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,

        // 🔥 PADRONIZADO
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.query;

      const result = await AuthService.verifyEmail(token);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;

      const result = await AuthService.requestPasswordReset(email);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      const result = await AuthService.resetPassword(
        token,
        newPassword
      );

      return res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export default new AuthController();
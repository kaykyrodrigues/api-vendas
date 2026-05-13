import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.model.js";
import crypto from "crypto";
import EmailService from "./email.service.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado");
}

class AuthService {
  async register({ username, email, userpassword }) {
    if (!username || !email || !userpassword) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    if (userpassword.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres");
    }

    const userExists = await UserModel.findByEmail(email);

    if (userExists) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = {
      id: uuidv4(),
      username,
      email,
      userpassword: hashedPassword,
      verification_token: verificationToken,
    };

    await UserModel.create(user);

    await EmailService.sendVerificationEmail(email, verificationToken);

    return {
      message: "Usuário criado. Verifique seu email.",
    };
  }

  async login({ email, userpassword }) {
    if (!email || !userpassword) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    if (!user.userpassword) {
      throw new Error("Erro interno de autenticação");
    }

    if (!user.is_verified) {
      throw new Error("Verifique seu email antes de logar");
    }

    const isMatch = await bcrypt.compare(userpassword, user.userpassword);

    if (!isMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
      issuer: "api-vendas",
      audience: "api-vendas-users",
    });

    return { token };
  }

  async verifyEmail(token) {
    const user = await UserModel.findByVerificationToken(token);

    if (!user) {
      throw new Error("Token inválido");
    }

    await UserModel.verifyUser(user.id);

    return {
      message: "Email verificado com sucesso",
    };
  }

  async requestPasswordReset(email) {
    if (!email) {
      throw new Error("Email é obrigatório");
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await UserModel.saveResetToken(user.id, resetToken, expires);

    await EmailService.sendResetPasswordEmail(email, resetToken);

    return {
      message: "Se o email existir, um link será enviado",
    };
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword) {
      throw new Error("Dados inválidos");
    }

    if (newPassword.length < 6) {
      throw new Error("Senha muito curta");
    }

    const user = await UserModel.findByResetToken(token);

    if (!user) {
      throw new Error("Token inválido ou expirado");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await UserModel.updatePassword(user.id, hashed);

    return {
      message: "Senha atualizada com sucesso",
    };
  }
}

export default new AuthService();

import AuthService from "../services/auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      console.log("REGISTER BODY:", req.body);

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
    console.log("LOGIN BODY:", req.body);

    try {
      const result = await AuthService.login(req.body);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.query;

      const result = await AuthService.verifyEmail(token);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;

      const result = await AuthService.requestPasswordReset(email);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      const result = await AuthService.resetPassword(token, newPassword);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new AuthController();

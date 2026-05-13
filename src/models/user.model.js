import pool from "../database/pool.js";

class UserModel {
  async create(user) {
    await pool.query(
      `
    INSERT INTO users (
      id,
      username,
      email,
      userpassword,
      verification_token
    )
    VALUES (?, ?, ?, ?, ?)
  `,
      [
        user.id,
        user.username,
        user.email,
        user.userpassword,
        user.verification_token,
      ],
    );
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      `
    SELECT 
  id,
  username,
  email,
  is_verified
FROM users
WHERE email = ?
  `,
      [email],
    );

    return rows[0];
  }

  async findByVerificationToken(token) {
    const [rows] = await pool.query(
      `
    SELECT * FROM users WHERE verification_token = ?
  `,
      [token],
    );

    return rows[0];
  }

  async verifyUser(id) {
    await pool.query(
      `
    UPDATE users
    SET is_verified = TRUE,
        verification_token = NULL
    WHERE id = ?
  `,
      [id],
    );
  }

  async saveResetToken(id, token, expires) {
    await pool.query(
      `
    UPDATE users
    SET reset_token = ?, reset_token_expires = ?
    WHERE id = ?
  `,
      [token, expires, id],
    );
  }

  async findByResetToken(token) {
    const [rows] = await pool.query(
      `
    SELECT * FROM users
    WHERE reset_token = ?
    AND reset_token_expires > NOW()
  `,
      [token],
    );

    return rows[0];
  }

  async updatePassword(id, password) {
    await pool.query(
      `
    UPDATE users
    SET userpassword = ?, reset_token = NULL, reset_token_expires = NULL
    WHERE id = ?
  `,
      [password, id],
    );
  }
}

export default new UserModel();

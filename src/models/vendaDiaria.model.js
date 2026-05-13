import pool from "../database/pool.js";

class VendaDiariaModel {
  async create(sale) {
    const sql = `
      INSERT INTO vendas_diarias (
        id,
        user_id,
        sale_date,
        total_amount,
        cash_amount,
        pix_amount,
        card_amount,
        quantity
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      id,
      user_id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      card_amount,
      quantity,
    } = sale;

    const [result] = await pool.query(sql, [
      id,
      user_id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      card_amount,
      quantity,
    ]);

    return result;
  }

  async findAll({ userId, limit, offset, filters }) {
    let sql = `
      SELECT *
      FROM vendas_diarias
      WHERE user_id = ?
    `;

    const values = [userId];

    if (filters.startDate) {
      sql += ` AND sale_date >= ?`;
      values.push(filters.startDate);
    }

    if (filters.endDate) {
      sql += ` AND sale_date <= ?`;
      values.push(filters.endDate);
    }

    sql += `
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
    `;

    values.push(Number(limit), Number(offset));

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async findById(id, userId) {
    const sql = `
      SELECT *
      FROM vendas_diarias
      WHERE id = ?
      AND user_id = ?
    `;

    const [rows] = await pool.query(sql, [id, userId]);

    return rows[0];
  }

  async update(id, userId, venda) {
    const sql = `
      UPDATE vendas_diarias
      SET
        sale_date = ?,
        total_amount = ?,
        cash_amount = ?,
        pix_amount = ?,
        card_amount = ?,
        quantity = ?
      WHERE id = ?
      AND user_id = ?
    `;

    const values = [
      venda.sale_date,
      venda.total_amount,
      venda.cash_amount,
      venda.pix_amount,
      venda.card_amount,
      venda.quantity,
      id,
      userId,
    ];

    const [result] = await pool.query(sql, values);

    return result;
  }

  async updatePartial(id, userId, fields) {
    const columns = [];
    const values = [];

    for (const key in fields) {
      columns.push(`${key} = ?`);
      values.push(fields[key]);
    }

    const sql = `
      UPDATE vendas_diarias
      SET ${columns.join(", ")}
      WHERE id = ?
      AND user_id = ?
    `;

    values.push(id);
    values.push(userId);

    const [result] = await pool.query(sql, values);

    return result;
  }

  async deleteById(id, userId) {
    const sql = `
      DELETE FROM vendas_diarias
      WHERE id = ?
      AND user_id = ?
    `;

    const [result] = await pool.query(sql, [id, userId]);

    return result;
  }
}

export default new VendaDiariaModel();
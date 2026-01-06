import pool from "../database/pool.js";

class VendaDiariaModel {
  async create(sale) {
    const sql = `INSERT INTO vendas_diarias (id, sale_date, total_amount, cash_amount, pix_amount, credit_amount, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const {
      id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      credit_amount,
      notes,
    } = sale;

    await pool.query(sql, [
      id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      credit_amount,
      notes,
    ]);
  }

  async findAll() {
    const sql = "SELECT * FROM vendas_diarias;";
    const [rows] = await pool.query(sql);
    return rows;
  }

  async findById(id) {
    const sql = "SELECT * FROM vendas_diarias WHERE id=?;";
    const [rows] = await pool.query(sql, [id]);
    return rows;
  }

  async update(id, fields) {
    const columns = [];
    const values = [];

    for (const key in fields) {
      columns.push(`${key} = ?`);
      values.push(fields[key]);
    }

    const sql = `UPDATE vendas_diarias
    SET ${columns.join(", ")} WHERE id = ?;`;

    values.push(id);

    const [result] = await pool.query(sql, values);
    return result;
  }

  async deleteById(id) {
    const sql = "DELETE FROM vendas_diarias WHERE id=?;";

    const [result] = await pool.query(sql, [id]);
    return result;
  }
}

export default new VendaDiariaModel();

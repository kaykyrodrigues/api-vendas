import pool from "../database/pool.js";

class VendaDiariaModel {
  async create(sale) {
    const sql = `INSERT INTO vendas_diarias (id, sale_date, total_amount, cash_amount, pix_amount, card_amount, quantity)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const {
      id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      card_amount,
      quantity,
    } = sale;

    await pool.query(sql, [
      id,
      sale_date,
      total_amount,
      cash_amount,
      pix_amount,
      card_amount,
      quantity,
    ]);
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

    values.push(limit, offset);

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async findById(id) {
    const sql = "SELECT * FROM vendas_diarias WHERE id=?;";
    const [rows] = await pool.query(sql, [id]);
    return rows;
  }

  async update(id, venda) {
    const sql = `UPDATE vendas_diarias SET              sale_date = ?,
    cash_amount = ?,
    pix_amount = ?,
    card_amount = ?,
    quantity = ?, WHERE id=?;`;

    const values = [
      venda.sale_date,
      venda.cash_amount,
      venda.pix_amount,
      venda.card_amount,
      venda.quantity,
      id,
    ];

    const result = await pool.query(sql, values);
    return result;
  }

  async updatePartial(id, fields) {
    const columns = [];
    const values = [];

    // Essa parte monta o SET do update dinamicamente. O for itera as chaves dentro do campo que vão ser atualizadas, guarda os valores no array (values) e injeta elas no SQL, junto com o id da venda que será atualizada (o id é usado no WHERE)

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

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

  async findAll({ limit, offset, filters }) {
    let sql = "SELECT * FROM vendas_diarias";
    const values = [];

    if (filters.startDate && filters.endDate) {
      sql += ` WHERE sale_date BETWEEN ? AND ?`;
      values.push(filters.startDate, filters.endDate);
    }

    sql += ` LIMIT ? OFFSET ?`;
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
    credit_amount = ?,
    notes = ? WHERE id=?;`;

    const values = [
      venda.sale_date,
      venda.cash_amount,
      venda.pix_amount,
      venda.credit_amount,
      venda.notes,
      id
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

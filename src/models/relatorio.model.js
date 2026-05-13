import pool from "../database/pool.js";

class RelatorioModel {
  async faturamentoTotal(userId) {
    const [rows] = await pool.query(
      `
      SELECT SUM(total_amount) AS faturamento
      FROM vendas_diarias
      WHERE user_id = ?
    `,
      [userId],
    );

    return rows[0].faturamento || 0;
  }

  async faturamentoDiario(userId) {
    const [rows] = await pool.query(
      `
      SELECT
        sale_date,
        total_amount
      FROM vendas_diarias
      WHERE user_id = ?
      ORDER BY sale_date
    `,
      [userId],
    );

    return rows;
  }

  async faturamentoForma(userId) {
    const [rows] = await pool.query(
      `
      SELECT
        SUM(pix_amount)  AS pix,
        SUM(card_amount) AS card,
        SUM(cash_amount) AS cash
      FROM vendas_diarias
      WHERE user_id = ?
    `,
      [userId],
    );

    return rows[0];
  }

  async quantidadeTotal(userId) {
    const [rows] = await pool.query(
      `
      SELECT
        SUM(quantity) AS total_itens_vendidos
      FROM vendas_diarias
      WHERE user_id = ?
    `,
      [userId],
    );

    return rows[0].total_itens_vendidos || 0;
  }

  async ticketMedio(userId) {
    const [rows] = await pool.query(
      `
    SELECT 
      ROUND(SUM(total_amount) / COUNT(id), 2) AS ticket_medio
    FROM vendas_diarias
    WHERE user_id = ?
  `,
      [userId],
    );

    return rows[0].ticket_medio;
  }

  async vendasPorDia(userId) {
    const [rows] = await pool.query(
      `
    SELECT
      sale_date,
      SUM(total_amount) AS total
    FROM vendas_diarias
    WHERE user_id = ?
    GROUP BY sale_date
    ORDER BY sale_date ASC
  `,
      [userId],
    );

    return rows;
  }
}

export default new RelatorioModel();

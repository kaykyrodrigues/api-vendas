import pool from "../database/pool.js";

class RelatorioModel {
  async faturamentoTotal() {
  const [rows] = await pool.query(`
    SELECT SUM(total_amount) AS faturamento
    FROM vendas_diarias
  `);

  return rows[0].faturamento;
}

  async faturamentoDiario() {
    const [rows] = await pool.query(`
    SELECT
      sale_date,
      total_amount
    FROM vendas_diarias
    ORDER BY sale_date;`);

    return rows;
  }

  async faturamentoForma() {
    const [rows] = await pool.query(`
    SELECT
      SUM(pix_amount)  AS pix,
      SUM(card_amount) AS card,
      SUM(cash_amount) AS cash
    FROM vendas_diarias;`);

    return rows;
  }

  async quantidadeTotal() {
    const [rows] = await pool.query(`
    SELECT
      SUM(quantity) AS total_itens_vendidos
    FROM vendas_diarias;`);

    return rows[0].total_itens_vendidos;
  }
}

export default new RelatorioModel();

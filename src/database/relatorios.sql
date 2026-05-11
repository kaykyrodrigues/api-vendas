/* ============================================================
   RELATÓRIOS - CONTROLE DE VENDAS
   ============================================================ */


/* ------------------------------------------------------------
   RELATÓRIO: FATURAMENTO TOTAL
   ------------------------------------------------------------
   Objetivo:
   Retornar o valor total faturado no sistema.

   Tipo de retorno:
   Valor único (number)

   Rota:
   GET /relatorios/faturamento-total
   ------------------------------------------------------------ */
SELECT
  SUM(total_amount) AS faturamento_total
FROM vendas_diarias;


/* ------------------------------------------------------------
   RELATÓRIO: FATURAMENTO DIÁRIO
   ------------------------------------------------------------
   Objetivo:
   Retornar o faturamento por dia.

   Tipo de retorno:
   Lista de registros (array)

   Rota:
   GET /relatorios/faturamento-diario
   ------------------------------------------------------------ */
SELECT
  sale_date,
  total_amount
FROM vendas_diarias
ORDER BY sale_date;


/* ------------------------------------------------------------
   RELATÓRIO: FATURAMENTO POR FORMA DE PAGAMENTO
   ------------------------------------------------------------
   Objetivo:
   Mostrar quanto cada forma de pagamento contribuiu
   para o faturamento total.

   Tipo de retorno:
   Objeto único com múltiplos campos

   Rota:
   GET /relatorios/faturamento-forma
   ------------------------------------------------------------ */
SELECT
  SUM(cash_amount)   AS total_dinheiro,
  SUM(pix_amount)    AS total_pix,
  SUM(card_amount)   AS total_cartao
FROM vendas_diarias;


/* ------------------------------------------------------------
   RELATÓRIO: TOTAL DE ITENS VENDIDOS
   ------------------------------------------------------------
   Objetivo:
   Retornar a quantidade total de itens vendidos.

   Tipo de retorno:
   Valor único (number)

   Rota:
   GET /relatorios/quantidade-total
   ------------------------------------------------------------ */
SELECT
  SUM(quantity) AS total_itens_vendidos
FROM vendas_diarias;
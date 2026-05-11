import relatorioModel from "../models/relatorio.model.js";

class RelatorioService {
  async resumo() {
    const [
      faturamentoTotal,
      faturamentoDiario,
      faturamentoForma,
      quantidadeTotal,
    ] = await Promise.all([
      relatorioModel.faturamentoTotal(),
      relatorioModel.faturamentoDiario(),
      relatorioModel.faturamentoForma(),
      relatorioModel.quantidadeTotal(),
    ]);

    return {
      faturamentoTotal: Number(faturamentoTotal) || 0,
      faturamentoDiario,
      faturamentoForma: faturamentoForma[0] || {},
      quantidadeTotal: Number(quantidadeTotal) || 0,
    };
  }

  async faturamentoTotal() {
    const faturamento = await relatorioModel.faturamentoTotal();

    return Number(faturamento) || 0;
  }

  async faturamentoDiario() {
    const rows = await relatorioModel.faturamentoDiario();

    return rows;
  }

  async faturamentoForma() {
    const rows = await relatorioModel.faturamentoForma();

    return rows;
  }

  async quantidadeTotal() {
    const total_itens_vendidos = await relatorioModel.quantidadeTotal();

    return Number(total_itens_vendidos) || 0;
  }
}

export default new RelatorioService();

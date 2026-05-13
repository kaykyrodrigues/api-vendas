import relatorioModel from "../models/relatorio.model.js";

class RelatorioService {

  async resumo(userId) {

    const [
      faturamentoTotal,
      faturamentoDiario,
      faturamentoForma,
      quantidadeTotal,
    ] = await Promise.all([

      relatorioModel.faturamentoTotal(userId),

      relatorioModel.faturamentoDiario(userId),

      relatorioModel.faturamentoForma(userId),

      relatorioModel.quantidadeTotal(userId),
    ]);

    return {

      faturamentoTotal:
        Number(faturamentoTotal) || 0,

      faturamentoDiario:
        faturamentoDiario || [],

      faturamentoForma:
        faturamentoForma || {
          pix: 0,
          card: 0,
          cash: 0,
        },

      quantidadeTotal:
        Number(quantidadeTotal) || 0,
    };
  }

  async faturamentoTotal(userId) {

    const faturamento =
      await relatorioModel.faturamentoTotal(userId);

    return Number(faturamento) || 0;
  }

  async faturamentoDiario(userId) {

    return await relatorioModel
      .faturamentoDiario(userId);
  }

  async faturamentoForma(userId) {

    return await relatorioModel
      .faturamentoForma(userId);
  }

  async quantidadeTotal(userId) {

    const total =
      await relatorioModel.quantidadeTotal(userId);

    return Number(total) || 0;
  }

  async ticketMedio(userId) {

    return await relatorioModel.ticketMedio(userId);
  }

  async vendasPorDia(userId) {

    return await relatorioModel.vendasPorDia(userId);
  }
}

export default new RelatorioService();
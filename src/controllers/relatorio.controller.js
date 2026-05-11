import relatorioService from "../services/relatorio.service.js";

class RelatorioController {
  async faturamentoTotal(req, res) {
    try {
      const total = await relatorioService.faturamentoTotal();

      res.json({ data: total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao gerar relatório" });
    }
  }

  async faturamentoDiario(req, res) {
    try {
      const resultado = await relatorioService.faturamentoDiario();

      res.json({ data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao gerar relatório" });
    }
  }

  async faturamentoForma(req, res) {
    try {
      const resultado = await relatorioService.faturamentoForma();

      res.json({ data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao gerar relatório" });
    }
  }

  async quantidadeTotal(req, res) {
    try {
      const total = await relatorioService.quantidadeTotal();

      res.json({ data: total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao gerar relatório" });
    }
  }

  async resumo(req, res) {
    try {
      const [
        faturamentoTotal,
        faturamentoDiario,
        faturamentoForma,
        quantidadeTotal,
      ] = await Promise.all([
        relatorioService.faturamentoTotal(),
        relatorioService.faturamentoDiario(),
        relatorioService.faturamentoForma(),
        relatorioService.quantidadeTotal(),
      ]);

      res.json({
        data: {
          faturamentoTotal,
          faturamentoDiario,
          faturamentoForma,
          quantidadeTotal,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao gerar resumo" });
    }
  }
}

export default new RelatorioController();
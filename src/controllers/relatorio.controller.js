import relatorioService from "../services/relatorio.service.js";

class RelatorioController {
  async faturamentoTotal(req, res) {
    try {
      const userId = req.user.id;

      const total = await relatorioService.faturamentoTotal(userId);

      res.json({
        data: total,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erro ao gerar relatório",
      });
    }
  }

  async faturamentoDiario(req, res) {
    try {
      const userId = req.user.id;

      const resultado = await relatorioService.faturamentoDiario(userId);

      res.json({
        data: resultado,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erro ao gerar relatório",
      });
    }
  }

  async faturamentoForma(req, res) {
    try {
      const userId = req.user.id;

      const resultado = await relatorioService.faturamentoForma(userId);

      res.json({
        data: resultado,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erro ao gerar relatório",
      });
    }
  }

  async quantidadeTotal(req, res) {
    try {
      const userId = req.user.id;

      const total = await relatorioService.quantidadeTotal(userId);

      res.json({
        data: total,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Erro ao gerar relatório",
      });
    }
  }

  async resumo(req, res) {
    try {
      console.log("REQ.USER:", req.user);

      const userId = req.user.id;

      const resumo = await relatorioService.resumo(userId);

      res.json({
        data: resumo,
      });
    } catch (error) {
      console.error("ERRO RESUMO:", error);

      res.status(500).json({
        message: "Erro ao gerar resumo",
        error: error.message,
      });
    }
  }

  async ticketMedio(req, res) {
    try {
      const userId = req.user.id;

      const result = await relatorioService.ticketMedio(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async vendasPorDia(req, res) {
    try {
      const userId = req.user.id;

      const result = await relatorioService.vendasPorDia(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new RelatorioController();

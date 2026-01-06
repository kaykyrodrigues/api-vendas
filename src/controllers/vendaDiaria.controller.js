
import vendaDiariaService from "../services/vendaDiaria.service.js";

class VendaDiariaController {
  async create(req, res) {
    try {
      const result = await vendaDiariaService.create(req.body);

      res.status(201).json(result);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async findAll(req, res) {
    try {
      const vendas = await vendaDiariaService.findAll();
      res.status(200).json(vendas);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const venda = await vendaDiariaService.findById(id);
      res.status(200).json(venda);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const attData = req.body;

      const result = await vendaDiariaService.update(id, attData);

      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await vendaDiariaService.deleteById(id);

      res.status(200).json({
        message: "Venda excluida com sucesso!",
        affectedRows: result.affectedRows,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }
}

export default new VendaDiariaController();

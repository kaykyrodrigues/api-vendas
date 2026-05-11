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
      
      const { page, limit, startDate, endDate } = req.query;

      const userId = req.user.id;

      const vendas = await vendaDiariaService.findAll({
        userId,
        page,
        limit,
        startDate,
        endDate,
      });

      res.status(200).json(vendas);
    } catch (error) {
      console.error(error)
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

      const { sale_date, cash_amount, pix_amount, card_amount, quantity } =
        req.body;

      const result = await vendaDiariaService.update(id, {
        sale_date,
        cash_amount,
        pix_amount,
        card_amount,
        quantity,
      });

      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async updatePartial(req, res) {
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

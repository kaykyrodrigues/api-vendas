import vendaDiariaService from "../services/vendaDiaria.service.js";

class VendaDiariaController {
  async create(req, res) {
    try {
      const userId = req.user.id;

      console.log("USER ID:", userId);

      const {
        sale_date,
        cash_amount,
        pix_amount,
        card_amount,
        total_amount,
        quantity,
      } = req.body;

      const result = await vendaDiariaService.create({
        sale_date,
        cash_amount,
        pix_amount,
        card_amount,
        total_amount,
        quantity,
        user_id: userId,
      });

      res.status(201).json(result);

    } catch (error) {
      console.error(error);

      res.status(error.statusCode || 500).json({
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
      console.error(error);

      res.status(error.statusCode || 500).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const venda = await vendaDiariaService.findById(id, userId);

      res.status(200).json(venda);

    } catch (error) {
      console.error(error);

      res.status(error.statusCode || 500).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const result = await vendaDiariaService.update(
        id,
        userId,
        req.body
      );

      res.status(200).json(result);

    } catch (error) {
      console.error(error);

      res.status(error.statusCode || 500).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async updatePartial(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const result = await vendaDiariaService.updatePartial(
        id,
        userId,
        req.body
      );

      res.status(200).json(result);

    } catch (error) {
      console.error(error);

      res.status(error.statusCode || 500).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const result = await vendaDiariaService.deleteById(
        id,
        userId
      );

      res.status(200).json({
        message: "Venda excluída com sucesso!",
        affectedRows: result.affectedRows,
      });

    } catch (error) {
      console.error(error);

      res.status(error.statusCode || 500).json({
        error: error.message || "Erro interno do servidor",
      });
    }
  }
}

export default new VendaDiariaController();
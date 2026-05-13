import AppError from "../errors/AppError.js";
import vendaDiariaModel from "../models/vendaDiaria.model.js";
import { v4 as uuidv4 } from "uuid";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

class VendaDiariaService {
  
  async create(venda) {
    console.log("VENDA RECEBIDA:", venda);
    
    if (!venda.sale_date) {
      throw new AppError("sale_date é obrigatório", 400);
    }

    
    if (!venda.user_id) {
      throw new AppError("user_id é obrigatório", 400);
    }

    const cash = Number(venda.cash_amount) || 0;
    const pix = Number(venda.pix_amount) || 0;
    const card = Number(venda.card_amount) || 0;
    const quantity = Number(venda.quantity) || 0;

    const totalPagamentos = cash + pix + card;

    const vendaFinal = {
      id: uuidv4(),
      user_id: venda.user_id,
      sale_date: venda.sale_date,
      total_amount: totalPagamentos,
      cash_amount: cash,
      pix_amount: pix,
      card_amount: card,
      quantity,
    };

    await vendaDiariaModel.create(vendaFinal);

    return {
      message: "Venda criada com sucesso!",
      id: vendaFinal.id,
    };
  }

  async findAll({ userId, page, limit, startDate, endDate }) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const offset = (page - 1) * limit;

    const filters = {};

    if (startDate) {
      filters.startDate = startDate;
    }

    if (endDate) {
      filters.endDate = endDate;
    }

    const vendas = await vendaDiariaModel.findAll({
      userId,
      limit,
      offset,
      filters,
    });

    return {
      page,
      limit,
      filters,
      data: vendas,
    };
  }

  async findById(id, userId) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatório", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato UUID", 400);
    }

    const venda = await vendaDiariaModel.findById(id, userId);

    if (!venda) {
      throw new AppError("Venda não encontrada", 404);
    }

    return venda;
  }

  async update(id, userId, venda) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatório", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato UUID", 400);
    }

    for (const key in venda) {
      if (venda[key] === undefined) {
        throw new AppError(`Campo ${key} é obrigatório`, 400);
      }
    }

    const cash = Number(venda.cash_amount) || 0;
    const pix = Number(venda.pix_amount) || 0;
    const card = Number(venda.card_amount) || 0;

    venda.total_amount = cash + pix + card;

    const result = await vendaDiariaModel.update(id, userId, venda);

    if (result.affectedRows === 0) {
      throw new AppError("Venda não encontrada", 404);
    }

    return {
      message: "Venda atualizada com sucesso!",
    };
  }

  async updatePartial(id, userId, attData) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatório", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato UUID", 400);
    }

    const allowedFields = [
      "sale_date",
      "cash_amount",
      "pix_amount",
      "card_amount",
      "quantity",
    ];

    const fields = {};

    for (const field of allowedFields) {
      if (attData[field] !== undefined) {
        fields[field] = attData[field];
      }
    }

    if (Object.keys(fields).length === 0) {
      throw new AppError(
        "Nenhum campo válido para atualizar",
        400
      );
    }

    // recalcula total_amount se alterar pagamentos
    const hasPaymentField =
      fields.cash_amount !== undefined ||
      fields.pix_amount !== undefined ||
      fields.card_amount !== undefined;

    if (hasPaymentField) {
      const vendaAtual = await vendaDiariaModel.findById(id, userId);

      if (!vendaAtual) {
        throw new AppError("Venda não encontrada", 404);
      }

      const cash =
        Number(fields.cash_amount ?? vendaAtual.cash_amount);

      const pix =
        Number(fields.pix_amount ?? vendaAtual.pix_amount);

      const card =
        Number(fields.card_amount ?? vendaAtual.card_amount);

      fields.total_amount = cash + pix + card;
    }

    const result = await vendaDiariaModel.updatePartial(
      id,
      userId,
      fields
    );

    if (result.affectedRows === 0) {
      throw new AppError("Venda não encontrada", 404);
    }

    return {
      message: "Venda atualizada com sucesso!",
    };
  }

  async deleteById(id, userId) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatório", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato UUID", 400);
    }

    const result = await vendaDiariaModel.deleteById(id, userId);

    if (result.affectedRows === 0) {
      throw new AppError("Venda não encontrada", 404);
    }

    return result;
  }
}

export default new VendaDiariaService();
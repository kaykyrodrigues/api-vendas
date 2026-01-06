import AppError from "../errors/AppError.js";
import vendaDiariaModel from "../models/vendaDiaria.model.js";
import { v4 as uuidv4 } from "uuid";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

class VendaDiariaService {
  async create(venda) {
    if (!venda.sale_date) {
      throw new AppError("sale_date é obrigatório", 404);
    }

    const cash = venda.cash_amount || 0;
    const pix = venda.pix_amount || 0;
    const credit = venda.credit_amount || 0;

    const totalPagamentos = cash + pix + credit;

    venda.total_amount = totalPagamentos;

    const vendaFinal = {
      id: uuidv4(),
      sale_date: venda.sale_date,
      total_amount: venda.total_amount,
      cash_amount: cash,
      pix_amount: pix,
      credit_amount: credit,
      notes: venda.notes || null,
    };

    await vendaDiariaModel.create(vendaFinal);

    return {
      message: "Venda criada com sucesso!",
      id: vendaFinal.id,
    };
  }

  async findAll() {
    const vendas = await vendaDiariaModel.findAll();
    return vendas;
  }

  async findById(id) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatorio", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato uuid", 400);
    }

    const rows = await vendaDiariaModel.findById(id);

    if (rows.length === 0) {
      throw new AppError("Venda não encontrada", 404);
    }

    return rows[0];
  }

  async update(id, attData) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatorio", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato uuid", 400);
    }

    const allowedFields = [
      "sale_date",
      "total_amount",
      "cash_amount",
      "pix_amount",
      "credit_amount",
      "notes",
    ];

    const fields = {};

    for (const field of allowedFields) {
      if (attData[field] !== undefined) {
        fields[field] = attData[field];
      }
    }

    if (Object.keys(fields).length === 0) {
      throw new AppError("Nenhum campo válido para atualizar", 404);
    }

    const result = await vendaDiariaModel.update(id, fields);
    return result;
  }

  async deleteById(id) {
    if (!id || id.trim() === "") {
      throw new AppError("ID é obrigatorio", 400);
    }

    if (!uuidV4Regex.test(id)) {
      throw new AppError("O ID precisa estar em formato uuid", 400);
    }

    const result = await vendaDiariaModel.deleteById(id);

    if (result.affectedRows === 0) {
      throw new AppError("Venda não encontrada", 404);
    }

    return result;
  }
}

export default new VendaDiariaService();

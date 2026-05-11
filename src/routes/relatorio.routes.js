import { Router } from "express";
import relatorioController from "../controllers/relatorio.controller.js";

const router = Router();

router.get("/resumo", relatorioController.resumo);
router.get("/faturamento-total", relatorioController.faturamentoTotal);
router.get("/faturamento-diario", relatorioController.faturamentoDiario);
router.get("/faturamento-forma", relatorioController.faturamentoForma);
router.get("/quantidade-total", relatorioController.quantidadeTotal)

export default router;

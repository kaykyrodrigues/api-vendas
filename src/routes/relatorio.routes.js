import { Router } from "express";
import relatorioController from "../controllers/relatorio.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/resumo",
  authMiddleware,
  relatorioController.resumo
);
router.get("/faturamento-total", relatorioController.faturamentoTotal);
router.get("/faturamento-diario", relatorioController.faturamentoDiario);
router.get("/faturamento-forma", relatorioController.faturamentoForma);
router.get("/quantidade-total", relatorioController.quantidadeTotal)
router.get(
  "/ticket-medio",
  authMiddleware,
  relatorioController.ticketMedio
);
router.get(
  "/vendas-dia",
  authMiddleware,
  relatorioController.vendasPorDia
);

export default router;

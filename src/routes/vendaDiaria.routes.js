import { Router } from "express";
import VendaDiariaController from "../controllers/vendaDiaria.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", AuthMiddleware, VendaDiariaController.create);

router.get("/", AuthMiddleware, VendaDiariaController.findAll);

router.get("/:id", AuthMiddleware, VendaDiariaController.findById);

router.put("/:id", AuthMiddleware, VendaDiariaController.update);

router.patch("/:id", AuthMiddleware, VendaDiariaController.updatePartial);

router.delete("/:id", AuthMiddleware, VendaDiariaController.deleteById);

export default router;

import { Router } from "express";
import VendaDiariaController from "../controllers/vendaDiaria.controller.js";
import vendaDiariaController from "../controllers/vendaDiaria.controller.js";

const router = Router();

router.post("/", VendaDiariaController.create);
router.get("/", VendaDiariaController.findAll)
router.get("/:id", VendaDiariaController.findById)
router.put("/:id", vendaDiariaController.update)
router.patch("/:id", VendaDiariaController.updatePartial)
router.delete("/:id", VendaDiariaController.deleteById)

export default router;
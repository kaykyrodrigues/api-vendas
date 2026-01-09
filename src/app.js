import "dotenv/config";
import express from "express";
import VendaRoutes from "./routes/vendaDiaria.routes.js";

const app = express();
app.use(express.json());
app.use("/sales", VendaRoutes);

export default app;

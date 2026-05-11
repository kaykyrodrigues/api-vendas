import "dotenv/config";
import express from "express";
import VendaRoutes from "./routes/vendaDiaria.routes.js";
import RelatorioRoutes from "./routes/relatorio.routes.js"
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";
import cors from "cors"
import AuthRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/sales", VendaRoutes);
app.use("/reports", RelatorioRoutes);
app.use("/auth", AuthRoutes);

export default app;

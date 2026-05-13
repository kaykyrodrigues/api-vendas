import "dotenv/config";
import express from "express";
import VendaRoutes from "./routes/vendaDiaria.routes.js";
import RelatorioRoutes from "./routes/relatorio.routes.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet());

app.use("/sales", VendaRoutes);
app.use("/reports", RelatorioRoutes);
app.use("/auth", AuthRoutes);
app.use(AuthRoutes);

export default app;

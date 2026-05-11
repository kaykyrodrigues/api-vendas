import "dotenv/config";
import app from "./app.js";
import cors from "cors";

const PORT = process.env.PORT || 3036;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

app.use(cors());
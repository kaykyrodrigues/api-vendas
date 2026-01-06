import "dotenv/config";
import express from "express";
import VendaRoutes from "./routes/vendaDiaria.routes.js";

const app = express();
app.use(express.json());
app.use("/sales", VendaRoutes);

// app.get("/sales", async (req, res) => {
//   try {
//     const sql = "SELECT * FROM vendas_diarias;";
//     const [rows] = await pool.query(sql);

//     res.status(200).json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// app.get("/sales/:id", async (req, res) => {
//   try {
//     const sql = "SELECT * FROM vendas_diarias WHERE id=?;";
//     const { id } = req.params;
//     const [rows] = await pool.query(sql, [id]);

//     res.status(200).json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// app.put("/sales/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const allowedFields = [
//       "sale_date",
//       "total_amount",
//       "cash_amount",
//       "pix_amount",
//       "credit_amount",
//       "notes",
//     ];

//     const fields = [];
//     const values = [];

//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         fields.push(`${field} = ?`);
//         values.push(req.body[field]);
//       }
//     }

//     if (fields.lenght === 0) {
//       return res.status(400).json({
//         error: "Nenhum campo válido para atualizar",
//       });
//     }

//     const sql = `UPDATE vendas_diarias
//     SET ${fields.join(", ")} WHERE id = ?;`;

//     values.push(id);

//     const [result] = await pool.query(sql, values);

//     res.status(201).json({
//       message: "Venda atualizada com sucesso",
//       affectedRows: result.affectedRows,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Erro ao atualizar venda",
//       details: error.sqlMessage || error.message,
//     });
//   }
// });

// app.delete("/sales/:id", async (req, res) => {
//   try {
//     const sql = "DELETE FROM vendas_diarias WHERE id=?;";
//     const { id } = req.params;

//     await pool.query(sql, [id]);
//     res.status(200).json({ message: "Venda excluida com sucesso!", id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

export default app;

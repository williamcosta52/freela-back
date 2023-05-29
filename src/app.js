import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));
app.use(json());
app.use(router);

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`));

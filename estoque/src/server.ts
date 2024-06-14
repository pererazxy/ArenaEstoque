// src/server.ts
import express, { Express } from "express";
import routes from "./routes";
import cors from "cors"; // Importar o módulo CORS

const app: Express = express();
const PORT: number = 3333;

app.use(cors()); // Usar o middleware CORS com configuração padrão
app.use(express.json());
app.use(routes);

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});

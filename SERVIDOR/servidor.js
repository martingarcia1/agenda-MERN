import express from "express";
import cors from "cors"
import Agenda from './routers/agenda.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/contactos", Agenda)

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})

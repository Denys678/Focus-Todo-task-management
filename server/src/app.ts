import "dotenv/config";
import express from "express";
import cors from "cors";
import todosRouter from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = process.env.CLIENT_URL || "";

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use("/todos", todosRouter);

app.use(errorHandler);

export default app;
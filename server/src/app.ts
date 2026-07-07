import express from "express";
import todosRouter from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/todos", todosRouter);

app.use(errorHandler);

export default app;
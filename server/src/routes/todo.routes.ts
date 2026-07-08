import express from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todo.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validate.middleware";
import { createTodoSchema, todoIdParamsSchema, todoQuerySchema, updatedTodoSchema } from "../schemas/todo.schema";

const router = express.Router();

router.get("/", validateRequest(todoQuerySchema, "query"), asyncHandler(getTodos));
router.post("/", validateRequest(createTodoSchema, "body"), asyncHandler(createTodo));
router.get("/:id", validateRequest(todoIdParamsSchema, "params"), asyncHandler(getTodoById));
router.delete("/:id", validateRequest(todoIdParamsSchema, "params"), asyncHandler(deleteTodo));
router.patch("/:id", validateRequest(todoIdParamsSchema, "params"), validateRequest(updatedTodoSchema, "body"), asyncHandler(updateTodo));

export default router;
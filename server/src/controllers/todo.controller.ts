import type { RequestHandler } from "express";
import { getAllTodos, createTodoService, getTodoByIdService, deleteTodoByIdService, updateTodoByIdService } from "../services/todos.service";
import { mapTodoToResponse, mapTodosToResponse } from "../mappers/todo.mapper";
import { TodoIdParams, TodoQuery, UpdatedTodo } from "../schemas/todo.schema";
import { AppError } from "../errors/AppError";

export const getTodos: RequestHandler = async (_req, res) => {
    const query = res.locals.query as TodoQuery;

    const todos = await getAllTodos(query);

    res.status(200).json(mapTodosToResponse(todos));
};

export const createTodo: RequestHandler = async (req, res) => {
    const createdTodo = await createTodoService(req.body);

    res.status(201).json(mapTodoToResponse(createdTodo));
};

export const getTodoById: RequestHandler = async (req, res) => {
    const { id } = req.params as TodoIdParams;
    
    const todo = await getTodoByIdService(id);

    if (todo === null) {
        throw new AppError("Todo not found", 404)
    }
    
    res.status(200).json(mapTodoToResponse(todo));
}

export const deleteTodo: RequestHandler = async (req, res) => {
    const { id } = req.params as TodoIdParams;

    const deletedTodo = await deleteTodoByIdService(id);

    res.status(200).json(mapTodoToResponse(deletedTodo));
}

export const updateTodo: RequestHandler = async (req, res) => {
    const { id } = req.params as TodoIdParams;
    const data = req.body as UpdatedTodo;

    const todo = await updateTodoByIdService(id, data);

    res.status(200).json(mapTodoToResponse(todo));
}
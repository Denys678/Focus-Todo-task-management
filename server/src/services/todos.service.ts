import { AppError } from "../errors/AppError";
import prisma from "../lib/prisma";
import { CreateTodoInput, TodoQuery, UpdatedTodo } from "../schemas/todo.schema";

export async function getAllTodos(query: TodoQuery) {
    const { completed, priority, search, sortBy = "createdAt", order = "desc" } = query;

    const result = await prisma.todo.findMany({
        where: {
            ...(completed !== undefined ? { completed } : {}),
            ...(priority ? { priority } : {}),
            ...(search
                ? {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {}),
        },
        orderBy: {
            [sortBy]: order,
        },
    });

    return result;
}

export async function createTodoService(data: CreateTodoInput) {
    const result = await prisma.todo.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
        }
    });

    return result;
}

export async function getTodoByIdService(id: string) {
    return prisma.todo.findUnique({
        where: { id },
    });
}

export async function deleteTodoByIdService(id: string) {
    const todo = await getTodoByIdService(id);

    if (todo === null) {
        throw new AppError("Todo not found", 404);
    }

    return prisma.todo.delete({
        where: {
            id,
        }
    })
}

export async function updateTodoByIdService(id: string, data: UpdatedTodo) {
    const todo = await getTodoByIdService(id);

    if (todo === null) {
        throw new AppError("Todo not found", 404);
    }

    return prisma.todo.update({
        where: {
            id,
        },
        data: {
            ...data,
        }
    })
}
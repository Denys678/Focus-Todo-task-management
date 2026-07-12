import { AppError } from "../errors/AppError";
import prisma from "../lib/prisma";
import { CreateTodoInput, TodoQuery, UpdatedTodo } from "../schemas/todo.schema";

export async function getAllTodos(userId: string, query: TodoQuery = {}){
    const { completed, priority, search, sortBy = "createdAt", order = "desc" } = query;

    const result = await prisma.todo.findMany({
        where: {
            userId,
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

export async function createTodoService(data: CreateTodoInput, userId: string) {
    const result = await prisma.todo.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
            userId,
        },
    });

    return result;
}

export async function getTodoByIdService(id: string, userId: string) {
    return prisma.todo.findFirst({
        where: { 
            id,
            userId, 
        },
    });
}

export async function deleteTodoByIdService(id: string, userId: string) {
    const todo = await getTodoByIdService(id, userId);

    if (todo === null) {
        throw new AppError("Todo not found", 404);
    }

    return prisma.todo.delete({
        where: {
            id,
        }
    })
}

export async function updateTodoByIdService(id: string, data: UpdatedTodo, userId: string) {
    const todo = await getTodoByIdService(id, userId);

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
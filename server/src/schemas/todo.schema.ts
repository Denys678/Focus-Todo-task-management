import { z } from "zod";

const PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const;
const COMPLETED_VALUES = ["true", "false"] as const;
const SORT_BY_VALUES = ["createdAt", "dueDate", "priority"] as const;
const ORDER_VALUES = ["asc", "desc"] as const;

export const createTodoSchema = z.strictObject({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1).optional(),
    priority: z.enum(PRIORITY).default("MEDIUM"),
    dueDate: z.string().date().transform((val) => new Date(val)).optional(),
});

export const todoIdParamsSchema = z.strictObject({
    id: z.string().uuid(),
});

export const updatedTodoSchema = z.strictObject({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    completed: z.boolean().optional(),
    priority: z.enum(PRIORITY).optional(),
    dueDate: z.string().date().transform((val) => new Date(val)).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});

export const todoQuerySchema = z.strictObject({
    completed: z.enum(COMPLETED_VALUES).transform(value => value === "true" ? true : false).optional(),
    priority: z.enum(PRIORITY).optional(),
    search: z.string().trim().min(1).optional(),
    sortBy: z.enum(SORT_BY_VALUES).optional(),
    order: z.enum(ORDER_VALUES).optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type TodoIdParams = z.infer<typeof todoIdParamsSchema>;
export type UpdatedTodo = z.infer<typeof updatedTodoSchema>;
export type TodoQuery = z.infer<typeof todoQuerySchema>;
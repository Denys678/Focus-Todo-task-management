import { z } from "zod";

const PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const;

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

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type TodoIdParams = z.infer<typeof todoIdParamsSchema>;
export type UpdatedTodo = z.infer<typeof updatedTodoSchema>;
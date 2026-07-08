type TodoEntity = {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: string;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export function mapTodoToResponse(todo: TodoEntity) {
    return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        priority: todo.priority,
        dueDate: todo.dueDate ? todo.dueDate.toISOString().split("T")[0] : null,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
    };
}

export function mapTodosToResponse(todos: TodoEntity[]) {
    return todos.map(mapTodoToResponse);
}
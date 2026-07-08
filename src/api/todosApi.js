const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";

export async function getTodos(params = {}) {
    const searchParams = new URLSearchParams();

    if (params.completed !== undefined) {
        searchParams.set("completed", String(params.completed));
    }

    if (params.search) {
        searchParams.set("search", params.search);
    }

    const queryString = searchParams.toString();

    const url = queryString
        ? `${API_BASE_URL}/todos?${queryString}`
        : `${API_BASE_URL}/todos`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch todo tasks");
    }

    return response.json();
}

export async function createTodo(data) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}

export async function deleteTodo(id) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
}

export async function updateTodo(id, data) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}
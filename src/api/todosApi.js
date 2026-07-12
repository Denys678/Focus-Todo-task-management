const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getTodos(params = {}, token) {
    const searchParams = new URLSearchParams();

    if (params.completed !== undefined) {
        searchParams.set("completed", String(params.completed));
    }

    if (params.search) {
        searchParams.set("search", params.search);
    }

    if (params.priority) {
        searchParams.set("priority", params.priority);
    }

    if (params.sortBy) {
        searchParams.set("sortBy", params.sortBy);
    }

    if (params.order) {
        searchParams.set("order", params.order);
    }

    const queryString = searchParams.toString();

    const url = queryString
        ? `${API_BASE_URL}/todos?${queryString}`
        : `${API_BASE_URL}/todos`;

    const response = await fetch(url, {
        headers: getAuthHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch todo tasks");
    }

    return response.json();
}

export async function createTodo(data, token) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}

export async function deleteTodo(id, token) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
}

export async function updateTodo(id, data, token) {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}
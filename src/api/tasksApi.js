const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000")
    .replace(/\/$/, "");
const API_URL = `${API_BASE_URL}/tasks`;

export async function getTasks() {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Не удалось загрузить задачи");
    }

    return response.json();
}

export async function createTask(task) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Не удалось создать задачу");
    }

    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Не удалось удалить задачу");
    }

    return response.json();
}

export async function updateTask(id, changes) {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },

            body: JSON.stringify(changes),
        }
    );

    if (!response.ok) {
        throw new Error("Не удалось изменить задачу");
    }

    return response.json();
}


function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
}
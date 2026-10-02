const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000")
    .replace(/\/$/, "");
const API_URL = `${API_BASE_URL}/auth`;

async function readResponse(response, fallbackMessage) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || fallbackMessage);
    }

    return data;
}

export async function registerUser(credentials) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return readResponse(response, "Не удалось зарегистрироваться");
}

export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return readResponse(response, "Не удалось войти");
}

export async function getCurrentUser() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return readResponse(response, "Не удалось получить пользователя");
}
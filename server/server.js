const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Изучить JSX",
        priority: "high",
        completed: false,
    },
    {
        id: 2,
        title: "Создать компоненты",
        priority: "medium",
        completed: true,
    },
    {
        id: 3,
        title: "Изучить CSS Modules",
        priority: "low",
        completed: false,
    },
];

const users = [];
let nextUserId = 1;
let nextTaskId = 4;


app.get("/tasks", authMiddleware, (req, res) => {
   
    const userTasks = tasks.filter(
        task => task.userId === req.user.userId
    );

    res.json(userTasks);
});

app.post("/tasks", authMiddleware, (req, res) => {
    const userId = req.user.userId;
    const newTask = {
        id: nextTaskId++,
        title: req.body.title,
        priority: req.body.priority,
        completed: false,
        userId: userId
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.delete("/tasks/:id", authMiddleware, (req, res) => {
    const id = Number(req.params.id);

    console.log("DELETE id:", id);
    console.log("Текущие tasks:", tasks);


    const taskExists = tasks.some(
        (task) =>
            task.id === id &&
            task.userId === req.user.userId
    );

    if (!taskExists) {
        return res.status(404).json({
            message: "Задача не найдена",
        });
    }

    tasks = tasks.filter(
        (task) => task.id !== id ||
            task.userId !== req.user.userId
    );

    res.json({
        message: "Задача удалена",
    });
});


app.patch("/tasks/:id", authMiddleware, (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id &&
            task.userId === req.user.userId
    );

    if (!task) {
        return res.status(404).json({
            message: "Задача не найдена",
        });
    }

    Object.assign(task, req.body);

    res.json(task);
});



app.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Заполните все поля"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
        user => user.email === normalizedEmail
    );

    if (existingUser) {
        return res.status(409).json({
            message: "Пользователь с таким email уже существует"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: nextUserId++,
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
        message: "Пользователь зарегистрирован",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});


app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Введите email и пароль"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
        user => user.email === normalizedEmail
    );

    if (!user) {
        return res.status(401).json({
            message: "Неверный email или пароль"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Неверный email или пароль"
        });
    }

    const token = jwt.sign(
        {
            userId: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});



app.get("/auth/me", authMiddleware, (req, res) => {
    const user = users.find(
        user => user.id === req.user.userId
    );

    if (!user) {
        return res.status(404).json({
            message: "Пользователь не найден"
        });
    }

    res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
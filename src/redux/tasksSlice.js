import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
} from "../api/tasksApi";
import { logout } from "./authSlice";


export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async () => {
        const tasks = await getTasks();
        return tasks;
    }
);


export const addTaskAsync = createAsyncThunk(
    "tasks/addTask",
    async task => {
        const createdTask = await createTask(task);
        return createdTask;
    }
);


export const deleteTaskAsync = createAsyncThunk(
    "tasks/deleteTask",
    async taskId => {
        await deleteTask(taskId);
        return taskId;
    }
);


export const updateTaskAsync = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, data }) => {
        const updatedTask = await updateTask(id, data);
        return updatedTask;
    }
);



const tasksSlice = createSlice({
    name: "tasks",

    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },

    extraReducers: builder => {
        builder

            .addCase(logout, state => {
                state.items = [];
                state.error = null;
                state.isLoading = false;
            })

            .addCase(fetchTasks.pending, state => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })

            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(addTaskAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })


            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    task => task.id !== action.payload
                );
            })

            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })


            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    task => task.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(updateTaskAsync.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});


export default tasksSlice.reducer;
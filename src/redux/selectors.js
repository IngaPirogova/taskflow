import { createSelector } from "@reduxjs/toolkit";


export const selectTasks = state =>
    state.tasks.items;


export const selectIsLoading = state =>
    state.tasks.isLoading;


export const selectError = state =>
    state.tasks.error;


export const selectFilteredTasks = createSelector(
    [
        selectTasks,
        (state, filter) => filter
    ],
    (tasks, filter) => {
        if (filter === "completed") {
            return tasks.filter(
                task => task.completed
            );
        }

        if (filter === "active") {
            return tasks.filter(
                task => !task.completed
            );
        }

        return tasks;
    }
);


export const selectTaskStats = createSelector(
    [selectTasks],
    tasks => ({
        total: tasks.length,
        completed: tasks.filter(
            task => task.completed
        ).length,
    })
);
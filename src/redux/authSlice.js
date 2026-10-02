import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getCurrentUser,
    loginUser as loginRequest,
    registerUser as registerRequest,
} from "../api/authApi";

const savedToken = localStorage.getItem("token");

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (credentials, { rejectWithValue }) => {
        try {
            return await registerRequest(credentials);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const result = await loginRequest(credentials);
            localStorage.setItem("token", result.token);
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            return await getCurrentUser();
        } catch (error) {
            localStorage.removeItem("token");
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: savedToken,
        isAuthenticated: false,
        isLoading: Boolean(savedToken),
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchCurrentUser.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            });
    },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
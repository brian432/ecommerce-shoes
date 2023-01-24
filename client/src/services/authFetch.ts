import { RegisterType, LoginType } from "../types/types";
import { createAsyncThunk } from '@reduxjs/toolkit';

const { API_URL } = process.env;

export const postRegister = createAsyncThunk('register/postRegister',
    async ({ username, email, password }: RegisterType, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const result = await response.json();
            if (result.status_code === 201) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const postLogin = createAsyncThunk('login/postLogin',
    async ({ username, password }: LoginType, thunkApi) => {
        try {
            const response: Response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error)

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);
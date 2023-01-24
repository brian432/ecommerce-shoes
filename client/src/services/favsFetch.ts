import { createAsyncThunk } from "@reduxjs/toolkit";

const { API_URL } = process.env;

type CreateFavCard = {
    idFav: string | undefined
    title: string
    color: string[]
    img: string[][]
    price: number
}

export const createFavCard = createAsyncThunk('favs/createFavCard',
    async ({ idFav, title, img, color, price }: CreateFavCard, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/favs`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    productId: idFav,
                    title,
                    img,
                    color,
                    price
                })
            });
            const result = await response.json();

            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const getAllFavsCards = createAsyncThunk('favs/getAllFavsCards',
    async (_, thunkApi) => {
        console.log("getFavs")
        try {
            const response = await fetch(`${API_URL}/api/favs`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                }
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data;
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const delFavCard = createAsyncThunk('favs/delFavCard',
    async (id: string | undefined, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/favs/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                }
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);
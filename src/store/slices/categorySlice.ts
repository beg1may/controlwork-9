import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../../types";
import {RootState} from "../../app/store.ts";
import {fetchCategories} from "../thunks/categoryThunks.ts";

interface CategoryState {
    item: Category[];
}

const initialState: CategoryState = {
    item: [],
}

export const selectCategories = (state: RootState) => state.category.item;

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
                state.item = categories;
            })
    }
})

export const categoryReduser = categorySlice.reducer;

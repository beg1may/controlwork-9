import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {ApiCategoryList, Category} from "../../types";

export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosAPI.get<ApiCategoryList | null>('categories.json');
        const categories = response.data;

        if(!categories) {
            return [];
        }

        return Object.keys(categories).map(id => {
            return {
                ...categories[id],
                id: id,
            };
        });
    }
);
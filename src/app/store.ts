import {configureStore} from "@reduxjs/toolkit";
import {categoryReduser} from "../store/slices/categorySlice.ts";

export const store = configureStore({
    reducer: {
        category: categoryReduser,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
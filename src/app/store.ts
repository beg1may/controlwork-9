import {configureStore} from "@reduxjs/toolkit";
import {categoryReduser} from "../store/slices/categorySlice.ts";
import {transactionsReduser} from "../store/slices/transactionsSlice.ts";

export const store = configureStore({
    reducer: {
        category: categoryReduser,
        transactions: transactionsReduser,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
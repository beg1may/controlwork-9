import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const createTransactions = createAsyncThunk<void, ApiTransaction>(
    'transactions/createTransactions',
    async (transactions) => {
        try{
            await axiosAPI.post('/transactions.json', transactions);
        } catch (e) {
            console.error(e);
        }
    }
)
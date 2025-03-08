import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, ApiTransactionList, FetchTransaction, Transaction} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {AppDispatch, RootState} from "../../app/store.ts";
import {fetchCategories} from "./categoryThunks.ts";

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

export const fetchTransactions = createAsyncThunk<FetchTransaction, void, {dispatch: AppDispatch, state: RootState}>(
    'transactions/fetchTransactions',
    async (_,thunkAPI) => {
        await thunkAPI.dispatch(fetchCategories());

        const response = await axiosAPI.get<ApiTransactionList | null>('transactions.json');
        const transactions = response.data;

        if(!transactions) {
            return {
                transactions: [],
                total: 0,
            }
        }

        const categories = thunkAPI.getState().category.item;
        const newTransactions: Transaction[] = [];
        let total = 0;

        Object.keys(transactions).forEach(id => {
            const transaction = transactions[id];
            const category = categories.find(category => category.id === transaction.categoryId);

            if(!category) {
                return;
            }

            newTransactions.push({
                id,
                category,
                createAt: transaction.createAt,
                amount: transaction.amount,
            });

            if(category.type === 'expense') {
                total -= transaction.amount;
            } else {
                total += transaction.amount;
            }

            newTransactions.sort((a, b) => a.createAt > b.createAt ? -1 : 1);
        })

        return {
            transactions: newTransactions,
            total
        }
    }
)
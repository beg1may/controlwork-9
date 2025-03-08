import {Transaction} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {deleteTransaction, fetchTransactions} from "../thunks/transactionsThunks.ts";

interface TransactionsState {
    items: Transaction[];
    total: number;
    modalOpen: boolean;
    loadings: {
        fetched: boolean;
        deleted: string | boolean;
    };
}

const initialState: TransactionsState = {
    items: [],
    total: 0,
    modalOpen: false,
    loadings: {
        fetched: false,
        deleted: false,
    },
}

export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTotal = (state: RootState) => state.transactions.total;
export const selectFetchingLoadings = (state: RootState) => state.transactions.loadings.fetched;
export const selectDeleteLoadings = (state: RootState) => state.transactions.loadings.deleted;

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loadings.fetched = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, {payload: {total, transactions}}) => {
                state.loadings.fetched = true;
                state.items = transactions;
                state.total = total;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.loadings.fetched = false;
            })

            .addCase(deleteTransaction.pending, (state, {meta}) => {
                state.loadings.deleted = meta.arg;
            })
            .addCase(deleteTransaction.fulfilled, (state) => {
                state.loadings.deleted = false;
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.loadings.deleted = false;
            });
    }
});

export const transactionsReduser = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
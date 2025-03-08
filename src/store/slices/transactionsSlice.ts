import {Transaction} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchTransactions} from "../thunks/transactionsThunks.ts";

interface TransactionsState {
    items: Transaction[];
    total: number;
    modalOpen: boolean;
}

const initialState: TransactionsState = {
    items: [],
    total: 0,
    modalOpen: false,
}

export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTotal = (state: RootState) => state.transactions.total;

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
            .addCase(fetchTransactions.fulfilled, (state, {payload: {total, transactions}}) => {
                state.items = transactions;
                state.total = total;
            })
    }
});

export const transactionsReduser = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
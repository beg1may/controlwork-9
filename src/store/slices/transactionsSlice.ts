import {Transaction} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

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
});

export const transactionsReduser = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
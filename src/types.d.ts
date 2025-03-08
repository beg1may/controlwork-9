export type CategoryType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string;
    type: CategoryType;
}

export interface ApiCategory {
    name: string;
    type: CategoryType;
}

export interface ApiCategoryList {
    [id: string] : ApiCategory;
}

export interface Transaction {
    id: string;
    category: Category;
    createAt: string;
    amount: number;
}

export interface ApiTransaction {
    categoryId: string;
    amount: number;
    createAt: string;
}

export interface ApiTransactionList {
    [id: string] : ApiTransaction;
}
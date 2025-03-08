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
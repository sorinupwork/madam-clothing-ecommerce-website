import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Category {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
}

export interface CategoriesState {
  readonly categories: Category[];
}

export interface CategoryMap {
  [key: string]: CategoryItem[];
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

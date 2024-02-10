import { CategoryT, StateStatus } from "@/types/index.d";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoreisReducers,
} from "./categoreisThunk";
import { State } from "@/lib/redux/store";

export interface categoriesInitialState {
  categories: CategoryT[];
  categoriesStatus: StateStatus;
  categoriesError: string | undefined;
}

const initialState: categoriesInitialState = {
  categories: [],
  categoriesStatus: "idle",
  categoriesError: undefined,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchCategoreisReducers(builder);
  },
});

export const selectCategoriesSlice = (state: State) => state.categories;

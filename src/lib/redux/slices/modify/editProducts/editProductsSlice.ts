import { IngredientT, ProductKey, ProductT } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { State } from "@/lib/redux/store";
import { StockItem } from "@/types/stock";

export interface EditProductsInitialState {
  product: ProductT | undefined;
  changingQtyProductId: ProductT | undefined;
}

const initialState: EditProductsInitialState = {
  product: {
    id: "temp-default-product-id",
    category: {
      name: "",
      id: "",
    },
    name: "",
    picture: "",
    price: 0,
    active: false,
    stockQty: 0,
    ingredients: [],
  },
  changingQtyProductId: undefined,
};

type EditProductPayload = {
  key: ProductKey;
  newValue: any;
};
type EditIngredientMeasure = {
  id: string;
  measure: number;
};

export const editProductsSlice = createSlice({
  name: "editProducts",
  initialState,
  reducers: {
    pickProductToEdit: (state, action: PayloadAction<ProductT | undefined>) => {
      state.product = action.payload;
    },
    editProductToEdit: (state, action: PayloadAction<EditProductPayload>) => {
      if (!state.product) return;
      const EditedProduct = {
        ...state.product,
        [action.payload.key]: action.payload.newValue,
      };
      state.product = EditedProduct;
    },
    pickProductToChangeQty: (state, action: PayloadAction<any>) => {
      state.changingQtyProductId = action.payload;
    },
    editIngredientMeasure: (
      state,
      action: PayloadAction<EditIngredientMeasure>
    ) => {
      if (!state.product) return;

      const ingredients = state.product.ingredients;

      if (!ingredients) return;

      const idx = ingredients.findIndex((i) => i.item.id === action.payload.id);

      if (idx !== -1) {
        ingredients[idx].measure = action.payload.measure;

        // Update the state with a new object only when necessary
        state.product = {
          ...state.product,
          ingredients: [...ingredients],
        } as ProductT;
      }
    },
    addIngredientItem: (state, action: PayloadAction<IngredientT>) => {
      if (!state.product) return;
      const ingredients = state.product?.ingredients || [];
      ingredients.push(action.payload);
      state.product.ingredients = ingredients;
    },
    removeIngredientItem: (state, action: PayloadAction<string>) => {
      if (!state.product) return;
      const indexToRemove = state.product.ingredients.findIndex(
        (i) => i.item.id === action.payload
      );
      if (indexToRemove !== -1) {
        const newIngredients = [...state.product.ingredients];
        newIngredients.splice(indexToRemove, 1);
        state.product.ingredients = newIngredients;
      }
    },
  },
});

export const selectProductToEditSlice = (state: State) =>
  state.editProductsSlice;

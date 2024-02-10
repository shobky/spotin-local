import { ToggleProductActivityThunk } from "../redux/slices/pos/products/thunks/toggleProductActivityThunk";

export const handleToggleProductActivity = async (
  dispatch: any,
  id: string,
  newValue: boolean
) => {
  try {
    await dispatch(ToggleProductActivityThunk({ id, newValue }));
  } catch (err) {
    console.log(err);
  }
};

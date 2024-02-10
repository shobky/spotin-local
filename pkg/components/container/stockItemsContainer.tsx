"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { fetchStockItemsThunk } from "@/lib/redux/slices/stock/thunks/fetchStockItemsThunk";
import { fetchProductsThunk } from "@/lib/redux/slices/pos/products/thunks/productsThunks";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { selectAllProducts } from "@/lib/redux/slices/pos/products/productsSelectors";
import { StockItemsTable } from "../controlPanel/stock/stockItemTable";

export default function StockItemsContainer() {
  const { stockItems, stockItemsStatus } = useSelector(selectStockItemsSlice);
  const { productsStatus } = useSelector(selectAllProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stockItemsStatus === "idle") dispatch(fetchStockItemsThunk());
    if (productsStatus === "idle") dispatch(fetchProductsThunk());
  }, [productsStatus, stockItemsStatus, dispatch]);


  return <StockItemsTable stockItemsData={stockItems} />;
}

"use client";
import { selectAllProducts } from "@/lib/redux/slices/pos/products/productsSelectors";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Suspense, useEffect } from "react";
import { fetchProductsThunk } from "@/lib/redux/slices/pos/products/thunks/productsThunks";
import FilteredProducts from "@/components/pos/products/filteredProducts";
import ProductsSkeleton from "../skeletons/productsSkeleton";
import { fetchStockItemsThunk } from "@/lib/redux/slices/stock/thunks/fetchStockItemsThunk";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";

export default function ProductsContainer({
  view,
  isControlPanel,
}: {
  view?: "grid" | "table";
  isControlPanel?: boolean;
}) {
  const { products, productsStatus } = useSelector(selectAllProducts);
  const { stockItemsStatus } = useSelector(selectStockItemsSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsStatus === "idle") dispatch(fetchProductsThunk());
    if (stockItemsStatus === "idle") dispatch(fetchStockItemsThunk());
  }, [productsStatus, dispatch, stockItemsStatus]);

  if (productsStatus === "idle" || productsStatus === "loading")
    return <ProductsSkeleton view={view} />;

  return (
    <Suspense fallback={<ProductsSkeleton view={view} />}>
      <FilteredProducts
        view={view}
        isControlPanel={isControlPanel}
        products={products.filter((p) =>
          !isControlPanel ? p.active === true : true
        )}
      />
    </Suspense>
  );
}

import CPProductCard from "@/components/controlPanel/products/cpProductsCard";
import Product from "@/components/pos/products/product";
import { selectStockItemsSlice } from "@/lib/redux/slices/stock/stockItemsSelectors";
import { ProductT } from "@/types";

export function ProductsGrid({
  products,
  isControlPanel,
}: {
  products: ProductT[];
  isControlPanel?: boolean;
}) {
  return (
    <div
      className={`${
        !isControlPanel &&
        "overflow-y-auto sm:h-[calc(100vh-4.5rem)] pretty-scrollbar pr-2 w-full"
      }`}
    >
      <div
        className={`grid pb-4 ${
          isControlPanel
            ? "grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]"
        } gap-1 w-full`}
      >
        {products.map((product) =>
          isControlPanel ? (
            <CPProductCard product={product} key={product.id} />
          ) : (
            <Product product={product} key={product.id} />
          )
        )}
      </div>
    </div>
  );
}

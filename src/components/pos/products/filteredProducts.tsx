"use client";

import { useSearchParams } from "next/navigation";
import { ProductT } from "@/types";
import { ProductsTable } from "@/components/shared/productsTable/productsTable";
import { ProductsGrid } from "@/components/shared/productsTable/productsGrid";
import { Suspense } from "react";
import {
  ProductsGridSkeleton,
  ProductsTableSkeleton,
} from "@/components/skeletons/productsSkeleton";

export default function Products({
  products,
  isControlPanel,
  view,
}: {
  products: ProductT[];
  view?: "grid" | "table";
  isControlPanel?: boolean;
}) {
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat");
  const searchQuery = searchParams.get("q") || "";

  const filteredProducts = products.filter((p) => {
    if (activeCat === "") {
      return p;
    }
    if (activeCat === "all") {
      if (p.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())) {
        return p;
      }
    }
    if (activeCat === p.category.name) {
      if (p.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())) {
        return p;
      }
    }
  });

  return (
    <>
      {view === "grid" ? (
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGrid
            products={filteredProducts}
            isControlPanel={isControlPanel}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<ProductsTableSkeleton />}>
          <ProductsTable products={filteredProducts} />
        </Suspense>
      )}
    </>
  );
}

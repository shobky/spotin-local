import ProductsContainer from "@/components/container/productsContainer";
import Categories from "@/components/pos/categories/options";
import PosActionsData from "@/components/pos/posActionsData";

export default function Home() {
  return (
    <main className="w-full flex flex-col sm:flex-row-reverse gap-6">
      <header className="flex sm:flex-col items-start gap-2 flex-wrap h-1/2 w-[25.5rem] ">
        <div className="flex gap-2 items-center h-12 w-full">
          <Categories />
        </div>
        <PosActionsData />
      </header>
      <ProductsContainer  view="grid"/>
    </main>
  );
}

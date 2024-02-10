// import { Button } from "@/components/ui/button";
// import {
//   editProductsSlice,
//   selectProductToEditSlice,
// } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
// import { ChangeProductStockQtyThunk } from "@/lib/redux/slices/pos/products/thunks/changeStockQtyThunk";
// import { useDispatch, useSelector } from "@/lib/redux/store";
// import { ProductT } from "@/types";
// import { Row } from "@tanstack/react-table";
// import { useState } from "react";

// export function StockCell({ row }: { row: Row<ProductT> }) {
//   const { changingQtyProductId } = useSelector(selectProductToEditSlice);
//   const [stockQty, setStockQty] = useState(row.original?.stockQty);
//   const dispatch = useDispatch();

//   const updateProductStock = async () => {
//     await dispatch(
//       ChangeProductStockQtyThunk({
//         id: row.original.id,
//         newValue: stockQty,
//       })
//     );
//     dispatch(editProductsSlice.actions.pickProductToChangeQty(undefined));
//   };
//   return (
//     <>
//       {changingQtyProductId && changingQtyProductId.id === row.original.id ? (
//         <div className="grid grid-cols-2 w-[100px] items-center gap-2">
//           <input
//             id={`stock-input-${row.original.id}`}
//             className="w-10 h-6 rounded  text-center"
//             value={stockQty}
//             onChange={(e) => setStockQty(Number(e.target.value))}
//           />
//           <Button
//             onClick={updateProductStock}
//             className="h-6"
//             variant={"secondary"}
//             size={"sm"}
//           >
//             save
//           </Button>
//         </div>
//       ) : (
//         <div className="capitalize">{row.getValue("stockQty") || 0}</div>
//       )}
//     </>
//   );
// }

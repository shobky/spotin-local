import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { selectProductToEditSlice } from "@/lib/redux/slices/modify/editProducts/editProductsSlice";
import { deleteProductsThunk } from "@/lib/redux/slices/pos/products/thunks/deleteProductThunk";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Trash } from "lucide-react";

export function DeleteProductDialog({
  handleMenu,
}: {
  handleMenu?: () => void;
}) {
  const { product } = useSelector(selectProductToEditSlice);
  const dispatch = useDispatch();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="p-2 font-normal hover:bg-secondary cursor-auto"
        asChild
      >
        <Button className=" flex justify-between w-full gap-2" variant={"none"}>
          Delete Product <Trash size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondary">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <span className="font-bold">{product?.name}</span> product and
            remove it from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleMenu}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => dispatch(deleteProductsThunk(product?.id))}
            className="bg-destructive hover:bg-red-800 text-destructive-foreground"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

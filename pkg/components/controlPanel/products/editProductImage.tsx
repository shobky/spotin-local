import Product from "@/components/pos/products/product";
import { ProductT } from "@/types";
import Image from "next/image";
import React from "react";

export default function EditProductImage({
  product,
  newImage,
  handleFileChange,
}: {
  product?: ProductT;
  newImage: any;
  handleFileChange: (e: any) => void;
}) {
  return (
    <section className="grid grid-cols-2  gap-2">
      <div className="w-full h-full relative ">
        {product?.picture ? (
          <Product product={product} />
        ) : (
          <div className="w-full aspect-square bg-muted flex justify-center  items-center p-2 rounded-lg">
            <p className=" whitespace-pre-wrap text-center text-xs">
              Add a picture to display
            </p>
          </div>
        )}
        <span className="block bg-black w-full h-full absolute top-0 left-0 z-10 rounded-lg opacity-5"></span>
      </div>
      <div className=" relative border border-input w-full h-full rounded-xl hover:bg-muted bg-secondary cursor-pointer grid place-content-center">
        {newImage ? (
          <>
            <Image
              src={URL.createObjectURL(newImage)}
              alt=""
              width={150}
              height={150}
              className=" w-full h-full object-cover rounded-lg "
            />
          </>
        ) : (
          <p className="text-sm text-muted-foreground hover:text-whites">
            Add picture
          </p>
        )}
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="absolute w-40 h-40 opacity-0 cursor-pointer"
        />
      </div>
    </section>
  );
}

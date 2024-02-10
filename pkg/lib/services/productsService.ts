import { db, storage } from "@/firebase/config";
import { ProductT } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cache } from "react";

export const getAllActiveProducts = cache(async () => {
  // return localProducts;

  let data: ProductT[] = [];
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id } as ProductT);
  });
  return data;
});

export const updateProductActivity = async (id: string, newValue: boolean) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, {
    active: newValue,
  });
};

export const updateProductStockQty = async (id: string, newValue?: number) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, {
    stockQty: newValue,
  });
};

export const uploadProductImageToBucket = async (name: string, image: any) => {
  try {
    const fileRef = ref(storage, `/products/${name}`);
    console.log(fileRef);

    await uploadBytes(fileRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      return getDownloadURL(fileRef);
    });
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.log(error);
  }
};
export const addNewProduct = async (product: ProductT) => {
  const pictureUrl = await uploadProductImageToBucket(
    product.name,
    product.picture
  );
  const docRef = await addDoc(collection(db, "products"), {
    ...product,
    picture: pictureUrl,
  });

  return { ...product, id: docRef.id, picture: pictureUrl };
};

export const updateProduct = async (product: ProductT) => {
  let pictureUrl;
  if (!String(product.picture).startsWith("https://firebasestorage.goo")) {
    pictureUrl = await uploadProductImageToBucket(
      product.name,
      product.picture
    );
  } else {
    pictureUrl = product.picture;
  }
  const docRef = doc(db, "products", product.id);

  await updateDoc(docRef, {
    ...product,
    picture: pictureUrl,
  });
  return { ...product, picture: pictureUrl };
};

export const deleteFromProducts = async (id: string) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};

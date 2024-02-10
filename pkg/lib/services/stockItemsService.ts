import { db } from "@/firebase/config";
import { StockItem } from "@/types/stock";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { cache } from "react";

export const getStockItems = cache(async () => {
  // return localProducts;

  let data: StockItem[] = [];
  const q = query(collection(db, "stockItems"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id } as StockItem);
  });
  return data;
});

export const addNewStockItem = async (stockItem: StockItem) => {
  const docRef = await addDoc(collection(db, "stockItems"), stockItem);

  return { ...stockItem, id: docRef.id };
};

export const updateStockItem = async (stockItem: StockItem) => {
  if (!stockItem.id) return;
  console.log(stockItem)
  const docRef = doc(db, "stockItems", stockItem.id);
  await setDoc(docRef, stockItem);
};

export const deleteStockItem = async (stockItem: StockItem) => {
  if (!stockItem.id) return;
  const docRef = doc(db, "stockItems", stockItem.id);

  await deleteDoc(docRef);
};

import { db } from "@/firebase/config";
import { CategoryT } from "@/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { cache } from "react";

export const getProductCategories = cache(async (): Promise<CategoryT[]> => {
  let data: CategoryT[] = [];
  const q = query(collection(db, "categories"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as CategoryT);
  });
  return data;
});

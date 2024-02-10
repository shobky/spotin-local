import { db } from "@/firebase/config";
import { OrderT } from "@/types";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { cache } from "react";

export const getArchivedOrdersInRange: (dateRange: any) => Promise<OrderT[]> =
  cache(async (dateRange: any) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return [];
    let data: OrderT[] = [];
    const collectionRef = collection(db, "archivedOrders");
    const startDate = Timestamp.fromDate(new Date(dateRange?.from));
    const endDate = Timestamp.fromDate(new Date(dateRange?.to));
    const q = query(
      collectionRef,
      where("createdAt", ">=", startDate),
      where("createdAt", "<=", endDate)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as OrderT);
    });
    return data as OrderT[];
  });

import { OrderTypeT, OrderT, TicketT, OrderTicketsT } from "@/types";
import { db } from "@/firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { cache } from "react";
import { DateRange } from "react-day-picker";

export async function createNewOrder(order: OrderT) {
  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    return { id: docRef.id, ...order };
  } catch (err) {
    return err;
  }
}

export async function appendToAnOrder(order: OrderT) {
  try {
    await setDoc(doc(db, "orders", order.id), order);
    return order;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function updateOrderType(id: string, newState: OrderTypeT) {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    type: newState,
  });
}

export async function checkoutOrder(order: OrderT) {
  const orderRef = doc(db, "orders", order.id);
  await updateDoc(orderRef, {
    ...order,
    type: "complete",
    checkoutDate: new Date(),
  });
}

export async function cancelOrder(order: OrderT) {
  const orderRef = doc(db, "orders", order.id);
  const canceledOrder = {
    ...order,
    type: "canceled",
  };
  const docRef = await addDoc(collection(db, "canceledOrders"), canceledOrder);
  await deleteDoc(orderRef);
  return {
    order: { ...canceledOrder, id: docRef.id },
    removedOrderId: order.id,
  };
}
export const getOrderById = cache(async (id: string) => {
  const docRef = doc(db, "orders", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: String(docSnap.id), ...docSnap.data() } as OrderT;
  }
});

export const getOrdersWithType = cache(async (type: OrderTypeT) => {
  let data: OrderT[] = [];
  const q = query(collection(db, "orders"), where("type", "==", type));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as OrderT);
  });
  return data;
});

export const getAllNotCompleteOrders = cache(async () => {
  let data: OrderT[] = [];
  const q = query(collection(db, "orders"), where("type", "!=", "complete"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as OrderT);
  });
  return data;
});

export const getAllOrders = cache(async () => {
  let data: OrderT[] = [];
  const q = query(collection(db, "orders"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as OrderT);
  });
  return data;
});

export const getCanceledAllOrders = cache(async () => {
  let data: OrderT[] = [];
  const q = query(collection(db, "canceledOrders"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as OrderT);
  });
  return data;
});

export const getArchivedOrders: (dateRange: DateRange) => Promise<OrderT[]> =
  cache(async (dateRange: DateRange) => {
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

export async function deleteOrder(
  location: "orders" | "archivedOrders",
  id: string
) {
  const orderRef = doc(db, location, id);
  await deleteDoc(orderRef);
}

export async function archiveOrder(order: OrderT) {
  const orderRef = doc(db, "archivedOrders", order.id);
  const date = new Date();
  await setDoc(orderRef, {
    ...order,
    archivedAtDay: date.getDate(),
    archivedAtMonth: date.getMonth(),
    archivedAtYear: date.getFullYear(),
  });
  await deleteOrder("orders", order.id);
}

export async function archiveAllOrders(orders: OrderT[]) {
  for (const order of orders) {
    await archiveOrder(order);
  }
}

export async function archiveCompletedOrders(orders: OrderT[]) {
  let remains = [];
  for (const order of orders) {
    if (order.type === "complete") await archiveOrder(order);
    else remains.push(order);
  }
  return remains;
}

export async function getOrdersByDay(day: number) {
  let data: any[] = [];
  const q = query(
    collection(db, "archivedOrders"),
    where("archivedAtDay", "==", Number(day))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data;
}

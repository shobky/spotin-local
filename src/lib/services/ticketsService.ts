import { db } from "@/firebase/config";
import { TicketT } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { cache } from "react";

export const getAllTikets = cache(async () => {
  let data: TicketT[] = [];
  const querySnapshot = await getDocs(collection(db, "tickets"));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as TicketT);
  });
  return data;
});

export const addNewTicket = async (newTicket: TicketT) => {
  const docRef = await addDoc(collection(db, "tickets"), newTicket);
  return { ...newTicket, id: docRef.id };
};

export const updateTicket = async (newTicket: TicketT) => {
  const docRef = doc(db, "tickets", newTicket.id);
  await updateDoc(docRef, newTicket);
};


export const deleteTicketWithId = async (id:string) => {
  const docRef = doc(db, "tickets", id)
  await deleteDoc(docRef)
}
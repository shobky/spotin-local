import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function autoCompleteCustomers(name: string) {
  let data: any[] = [];
  const q = query(
    collection(db, "customers"),
    where("name", "array-contains", name),
    orderBy("name"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));

  return data;
}

export async function fetchAllCustomers() {
  let data: any[] = [];
  const collectionRef = collection(db, "customers");
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data;
}

export async function getCustomerByName(name: string | undefined) {
  let data: any[] = [];
  const q = query(
    collection(db, "customers"),
    where("name", "==", name?.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data[0];
}

export async function addNewCustomer(name: string, id: number) {
  const customer = {
    name,
    id,
    createdAt: new Date(),
  };
  try {
    await setDoc(doc(db, "customers", String(id)), customer);
    return customer;
  } catch (err) {
    console.log(err);
  }
}

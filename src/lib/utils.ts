import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validDate(date: Date | string) {
  if (date !== "Invalid Date") return true;
  return false;
}

export function toTitleCase(inputString: string) {
  return inputString
    .toLowerCase() // Convert the whole string to lowercase
    .replace(/(?:^|\s)\S/g, function (char) {
      return char.toUpperCase();
    });
}

export async function checkConnection() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "GET",
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

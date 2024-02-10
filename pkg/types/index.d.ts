export * from "./orders";
export * from "./pos";

export type StateStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed"
  | "partial";

export type SortinRulesKeys = "Alphapitical" | "Time" | "Subtotal";
export type SortinRules =
  | {
      Alphapitical: "asc" | "desc";
      Time: "asc" | "desc";
      Subtotal: "asc" | "desc";
    }
  | undefined;

export type cashierSessionState = "closed" | "end" | "start";

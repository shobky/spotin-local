export function startNewCashierSession(startAmount: Number) {
  const session = {
    startAmount,
    createdAt: new Date(),
  };
  localStorage.setItem("session", JSON.stringify(session));
}

export function getCashierSession() {
  const session = localStorage.getItem("session");
  if (session) return JSON.parse(session);
}

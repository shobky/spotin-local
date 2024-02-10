import OrdersHeader from "@/components/orders/header";
import React from "react";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" space-y-4 pb-4 h-[calc(100%-3rem)]">
      <OrdersHeader />
      {children}
    </main>
  );
}

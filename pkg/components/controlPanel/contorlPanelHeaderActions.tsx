"use client";
import AddNewProduct from "./products/addNewProduct";
import AddNewTicket from "./tickets/addNewTicket";

export default function ContorlPanelHeaderActions() {
  return (
    <>
      <AddNewProduct />
      <AddNewTicket />
    </>
  );
}

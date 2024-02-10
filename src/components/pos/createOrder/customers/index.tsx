import { selectCustomerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSelectors";
import React from "react";
import { useSelector } from "react-redux";
import PickCustomer from "./pickCustomer";
import AutoCompleteCustomers from "./autoCompleteCustomers";

const CustomerForOrder = ({ children }: { children: React.ReactNode }) => {
  const { customers, customerInput } = useSelector(selectCustomerSlice);

  return (
    <div
      className={` ease-in-out duration-150 ${
        customerInput &&
        customers.length > 0 &&
        "bg-secondary p-2 flex flex-col gap-4 rounded-lg"
      } `}
    >
      <section className="flex items-center gap-2">
        <PickCustomer customersCount={customers.length}/>
        {children}
      </section>
      <AutoCompleteCustomers />
    </div>
  );
};

export default CustomerForOrder;

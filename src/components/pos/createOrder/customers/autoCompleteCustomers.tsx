"use client";
import { selectCustomerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSelectors";
import { customerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSlice";
import { fetchAllCustomersThunk } from "@/lib/redux/slices/pos/cart/customer/thunks/fetchAllCustomers";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { toTitleCase } from "@/lib/utils";
import { CustomerT } from "@/types/customers";
import React, { useEffect } from "react";

export default function AutoCompleteCustomers() {
  const dispatch = useDispatch();
  const { customers, customerStatus, customerInput } =
    useSelector(selectCustomerSlice);

  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(fetchAllCustomersThunk());
    }
  }, [customerStatus, dispatch]);

  const handlePickCustomer = (customer: CustomerT) => {
    dispatch(customerSlice.actions.addCustomer(customer.name));
    dispatch(customerSlice.actions.changeCustomerInput(""));
  };
  return (
    <>
      {customerInput && customers && (
        <div className="pretty-scrollbar flex flex-col text-secondary-foreground h-[40vh] overflow-y-auto ">
          {customers
            .filter((customer) => {
              if (
                customer.name
                  .toLowerCase()
                  .includes(customerInput.toLowerCase())
              )
                return customer;
            })
            .slice(0, 12)
            .map((customer) => (
              <>
                <button
                  key={customer.id}
                  onClick={() => handlePickCustomer(customer)}
                  className=" text-left hover:bg-muted py-[8px] -my-[1px] hover:rounded-md  px-[8px] w-[97%]  flex justify-between items-center  "
                >
                  {toTitleCase(customer.name)}
                  <p className="text-xs font-medium">
                    {" "}
                    #{String(customer.id).slice(0,3) || "Non"}
                  </p>
                </button>
                <hr className="w-[90%] relative left-2 hover:rounded-xl" />
              </>
            ))}
        </div>
      )}
    </>
  );
}

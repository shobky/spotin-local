"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { customerSlice } from "@/lib/redux/slices/pos/cart/customer/customerSlice";
import { addNewCustomerThunk } from "@/lib/redux/slices/pos/cart/customer/thunks/addNewCustomerThunk";
import { useDispatch } from "@/lib/redux/store";
import {
  addNewCustomer,
  getCustomerByName,
} from "@/lib/services/customerService";
import { UserPlus2 } from "lucide-react";
import React, { FormEvent, useState } from "react";

export default function PickCustomer({
  customersCount,
}: {
  customersCount: number;
}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handlePickingCustomer = async (e: FormEvent) => {
    e.preventDefault();
    if (await getCustomerByName(name)) {
      toast({
        title: "Customer Already Exists!",
        variant: "destructive",
        duration: 1000,
      });
    } else {
      try {
        await dispatch(addNewCustomerThunk({ name, id: customersCount + 1 }));
        dispatch(customerSlice.actions.addCustomer(name));
        dispatch(customerSlice.actions.changeCustomerInput(""));
      } catch (err) {
        alert("customer not added");
      }
    }
  };

  const handleCustomerInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputName: string = e.target.value;
    setName(inputName);
    dispatch(customerSlice.actions.changeCustomerInput(inputName));
  };

  return (
    <form
      onSubmit={handlePickingCustomer}
      className="flex flex-col bg-secondary"
    >
      <div className="flex relative items-center">
        <Input
          onChange={(e) => handleCustomerInputChange(e)}
          value={name}
          required
          placeholder="Customer name"
          className="h-12 pr-6"
        />
        {name.length > 0 && (
          <Button
            className="absolute right-0 m-2 hover:bg-muted"
            size={"icon"}
            variant={"secondary"}
          >
            <UserPlus2 size={22} />
          </Button>
        )}
      </div>
    </form>
  );
}

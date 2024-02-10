import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/shared/datePickers/date-range-picker";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/dashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hidden md:flex ">
      <div className="flex-1 space-y-4 relative">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

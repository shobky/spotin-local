"use client";
import { Button } from "../ui/button";
import SecondaryNavLink, { SecondaryNav } from "../shared/secondaryNavigation";
import { CalendarDateRangePicker } from "../shared/datePickers/date-range-picker";

export default function DashboardHeader() {
  return (
    <header className="flex  gap-2 items-center">
      <SecondaryNav>
        <SecondaryNavLink link="/">Daily report</SecondaryNavLink>
        <SecondaryNavLink link="monthly-overview">
          Monthly overview
        </SecondaryNavLink>
        <SecondaryNavLink disabled link="analytics">
          Analytics
        </SecondaryNavLink>
      </SecondaryNav>
      <SecondaryNav>
        <SecondaryNavLink link="archive">Archive</SecondaryNavLink>
        <SecondaryNavLink link="canceled-orders">Canceled orders</SecondaryNavLink>
      </SecondaryNav>
    </header>
  );
}

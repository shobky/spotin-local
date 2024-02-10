import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { getArchivedOrders } from "@/lib/services/ordersService";
import {
  calculateOrdersSales,
  calculateUniqueCustomers,
} from "@/lib/analytics/ordersAnalytics";

import { subDays } from "date-fns";
import { CalendarDateRangePicker } from "@/components/shared/datePickers/date-range-picker";
import { Button } from "@/components/ui/button";
import OrderStats from "@/components/dashboard/orderStats";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { range: string | null };
}) {
  const dateRange = searchParams.range
    ? JSON.parse(decodeURIComponent(searchParams.range))
    : { from: subDays(new Date(), 30), to: new Date() };

  let orders = await getArchivedOrders(dateRange);

  const { totalRevenue, sales } = calculateOrdersSales(orders);
  const { totalCheckins } = calculateUniqueCustomers(orders);

  if (!orders || orders.length === 0) {
    return (
      <>
        <div className="flex items-center justify-end space-y-2 absolute -top-[1rem] right-0">
          <CalendarDateRangePicker />
        </div>
        <p className="text-center relative top-[30vh]">
          No orders found for the date you picked.
        </p>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-end space-y-2 absolute -top-[1rem] right-0">
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      {orders && (
        <div className="space-y-4">
          <OrderStats
            totalCheckins={totalCheckins}
            totalRevenue={totalRevenue}
            orders={orders}
            sales={sales}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 ">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto pretty-scrollbar">
                <CardContent className="pl-2">
                  <Overview orders={orders} />
                </CardContent>
              </div>
            </Card>
            <Card className="col-span-3 overflow-y-auto max-h-[60vh] pretty-scrollbar">
              <CardHeader>
                <CardTitle>Recent orders</CardTitle>
                <CardDescription>
                  You made {sales.length} orders this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales sales={sales} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* <TabsContent value="analytics">you look 100% good today.</TabsContent> */}
    </>
  );
}

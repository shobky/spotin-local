import OrdersContainer from "@/components/container/ordersContainer";
import FilteredOrders from "@/components/orders/filteredOrders";
import { getCanceledAllOrders } from "@/lib/services/ordersService";

export default async function CanceledOrdersPage() {
  const cancledOrders = await getCanceledAllOrders();
  return <div>
    <FilteredOrders serverParent={true} orders={cancledOrders}/>
  </div>;
}

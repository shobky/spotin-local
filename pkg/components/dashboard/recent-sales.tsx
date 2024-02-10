import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SalesT } from "@/types/analytics";

export function RecentSales({ sales }: { sales: SalesT[] }) {
  return (
    <div className="space-y-8">
      {sales.map((sale, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-11 w-11">
            <AvatarImage src={sale.customer.picture} alt="Avatar" />
            <AvatarFallback className="text-sm">
              {sale.customer.name?.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.customer.name}
            </p>
            {/* <p className="text-xs font-light">
              {format(new Date(sale.createdAt.seconds), "LLL dd, y")}
            </p> */}
            <p className="text-xs text-muted-foreground ">
              {sale.customer.email ?? "No email provided"}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +{sale.items + sale.tickets}£
          </div>
        </div>
      ))}
    </div>
  );
}

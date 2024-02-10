"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isValid, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarSearch } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CalendarDateRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dateRange = searchParams.get("range");
  const newDate = dateRange && (JSON.parse(dateRange) as DateRange);

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const fromDate =
      newDate && newDate.from
        ? new Date(newDate.from)
        : subDays(new Date(), 30);
    const toDate = newDate && newDate?.to ? new Date(newDate.to) : new Date();

    return { from: fromDate, to: toDate };
  });

  const handleChangeDateRange = (range: DateRange | undefined) => {
    if (isValid(range?.from) && isValid(range?.to)) {
      const params = new URLSearchParams(searchParams);
      params.set("range", JSON.stringify(range));
      router.replace  (`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="gap-2 flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={() => handleChangeDateRange(date)} variant="secondary">
        <CalendarSearch />
      </Button>
    </div>
  );
}

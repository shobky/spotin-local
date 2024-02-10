import { cn } from "@/lib/utils";

export default function ToolTip({
  children,
  className,
  tip,
}: {
  children: React.ReactNode;
  className?: string;
  tip: string;
}) {
  return (
    <div className="group relative">
      {children}
      <p
        className={cn(
          "hidden z-50 sm:group-hover:block absolute w-fit -top-4 -right-14 bg-muted text-muted-foreground py-1 min-w-[4rem] text-center px-2 rounded-xl  ",
          className
        )}
      >
        {tip}
      </p>
    </div>
  );
}

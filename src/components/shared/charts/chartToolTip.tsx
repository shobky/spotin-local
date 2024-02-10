import { cn } from "@/lib/utils";

export const CustomTooltip = ({
  active,
  payload,
  label,
  sign,
  className,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
  sign: string;
  className?: string;
}) => {
  if (active) {
    return (
      <div
        className={cn(
          "bg-background  p-2 scale-[.85] rounded-lg shadow-lg",
          className
        )}
      >
        <p className="label flex items-center gap-2"><span className="text-foreground text-sm ">{label}</span>{`${payload[0]?.value || 0}${sign}`}</p>
        {/* Add more payload items as needed */}
      </div>
    );
  }

  return null;
};

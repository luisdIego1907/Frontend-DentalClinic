import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  sub: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  subColor: string;
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
  iconColor,
  subColor,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 2xl:p-6 min-[1800px]:p-7">
      <div className="mb-3 flex items-start justify-between gap-4 2xl:mb-4 min-[1800px]:mb-5">
        <p className="text-sm font-medium text-slate-500 2xl:text-base min-[1800px]:text-lg">
          {label}
        </p>

        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full 2xl:h-11 2xl:w-11 min-[1800px]:h-13 min-[1800px]:w-13"
          style={{ backgroundColor: iconBg }}
        >
          <Icon
            className="h-4 w-4 2xl:h-5 2xl:w-5 min-[1800px]:h-6 min-[1800px]:w-6"
            style={{ color: iconColor }}
          />
        </div>
      </div>

      <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl 2xl:text-4xl min-[1800px]:text-5xl">
        {value}
      </p>

      <p
        className="mt-1 text-xs font-medium 2xl:mt-2 2xl:text-sm min-[1800px]:text-base"
        style={{ color: subColor }}
      >
        {sub}
      </p>
    </div>
  );
}
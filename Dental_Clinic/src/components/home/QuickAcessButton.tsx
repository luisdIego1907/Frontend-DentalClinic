import { type LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessButtonProps {
  label: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  to: string;
}

export function QuickAccessButton({
  label,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  accentBorder,
  to,
}: QuickAccessButtonProps) {
  return (
    <Link
      to={to}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 2xl:gap-4 2xl:p-6 min-[1800px]:p-7"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl 2xl:h-12 2xl:w-12 min-[1800px]:h-14 min-[1800px]:w-14"
        style={{ backgroundColor: iconBg }}
      >
        <Icon
          className="h-5 w-5 2xl:h-6 2xl:w-6 min-[1800px]:h-7 min-[1800px]:w-7"
          style={{ color: iconColor }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 2xl:text-base min-[1800px]:text-lg">
          {label}
        </p>

        <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 2xl:text-sm min-[1800px]:text-base">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-600 2xl:h-5 2xl:w-5 min-[1800px]:h-6 min-[1800px]:w-6" />
    </Link>
  );
}
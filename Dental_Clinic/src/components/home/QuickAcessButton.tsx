import { type LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessButtonProps {
  label: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  to: string; // ruta destino
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
      className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left transition-all"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentBorder)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{label}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </Link>
  );
}

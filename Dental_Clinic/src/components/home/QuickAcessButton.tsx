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
      className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 text-left transition-all"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentBorder)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </Link>
  );
}

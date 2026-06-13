import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  label: string;
  icon: LucideIcon;
  iconColor: string; // e.g. "#1D9E75"
}

export function SectionHeader({
  label,
  icon: Icon,
  iconColor,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-4 sm:px-5">
      <Icon className="w-5 h-5" style={{ color: iconColor }} />
      <h2 className="text-base font-semibold text-gray-900">{label}</h2>
    </div>
  );
}

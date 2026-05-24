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
    <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
      <Icon className="w-5 h-5" style={{ color: iconColor }} />
      <h2 className="text-base font-semibold text-gray-900">{label}</h2>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  sub: string;
  icon: LucideIcon;
  iconBg: string; // e.g. "#E1F5EE"
  iconColor: string; // e.g. "#0F6E56"
  subColor: string; // e.g. "#1D9E75"
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
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-500">{label}</p>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
      </div>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      <p className="text-xs mt-1" style={{ color: subColor }}>
        {sub}
      </p>
    </div>
  );
}

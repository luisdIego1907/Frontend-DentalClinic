import type { StatusAppointment } from "../../models/appointment";

export const getBadgeStyle = (estado: StatusAppointment): string => {
  switch (estado) {
    case "Confirmada":
      return "bg-[#1D9E75] text-white";
    case "Pendiente":
      return "bg-[#FAEEDA] text-[#854F0B]";
    case "En espera":
      return "bg-gray-100 text-gray-500 border border-gray-200";
    default:
      return "";
  }
};

interface StatusBadgeProps {
  estado: StatusAppointment;
}

export function StatusBadge({ estado }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getBadgeStyle(estado)}`}
    >
      {estado}
    </span>
  );
}

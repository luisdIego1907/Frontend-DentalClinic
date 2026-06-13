import type { AppointmentData } from "../../models/appointment";
import { StatusBadge } from "./Statusbadge";

interface AppointmentRowProps {
  cita: AppointmentData;
  timeBg: string; // e.g. "#E1F5EE"
  timeColor: string; // e.g. "#0F6E56"
  actions?: React.ReactNode; // slot opcional para botones de acción por rol
}

export function AppointmentRow({
  cita,
  timeBg,
  timeColor,
  actions,
}: AppointmentRowProps) {
  return (
    <div className="flex flex-col items-start gap-3 border-b border-gray-50 px-4 py-4 last:border-none sm:flex-row sm:items-center sm:gap-4 sm:px-5">
      <span
        className="text-sm font-semibold px-3 py-1.5 rounded-lg min-w-[52px] text-center"
        style={{ backgroundColor: timeBg, color: timeColor }}
      >
        {cita.time}
      </span>
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-medium text-gray-900">
          {cita.patient?.first_name} {cita.patient?.last_name}{" "}
        </p>
        <p className="mt-0.5 break-words text-xs text-gray-500">{cita.reason}</p>
      </div>
      <span className="text-xs text-gray-400">{cita.durationMinutes} min</span>
      {actions ?? <StatusBadge estado={cita.status} />}
    </div>
  );
}

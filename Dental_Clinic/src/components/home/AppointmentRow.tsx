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
    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none">
      <span
        className="text-sm font-semibold px-3 py-1.5 rounded-lg min-w-[52px] text-center"
        style={{ backgroundColor: timeBg, color: timeColor }}
      >
        {cita.time}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {cita.patient?.first_name} {cita.patient?.last_name}{" "}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{cita.reason}</p>
      </div>
      <span className="text-xs text-gray-400">{cita.durationMinutes} min</span>
      {actions ?? <StatusBadge estado={cita.status} />}
    </div>
  );
}

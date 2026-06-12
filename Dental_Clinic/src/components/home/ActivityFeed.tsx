import { Calendar, ClipboardPlus } from "lucide-react";

type Props = {
  citas: any[];
  consultations: any[];
};

type ActivityItem = {
  type: "appointment" | "consultation";
  title: string;
  subtitle?: string;
  date: string;
};

export function ActivityFeed({ citas, consultations }: Props) {
  const appointmentActivity: ActivityItem[] = citas.map((c) => ({
    type: "appointment",
    title: `Cita: ${c.patient?.first_name ?? ""} ${c.patient?.last_name ?? ""}`,
    subtitle: c.reason,
    date: `${c.date}T${c.time}`,
  }));

  const consultationActivity: ActivityItem[] = consultations.map((c) => ({
    type: "consultation",
    title: `Consulta: ${c.patient_first_name} ${c.patient_last_name}`,
    subtitle: c.reason,
    date: c.consultation_date,
  }));

  const recentActivity = [...appointmentActivity, ...consultationActivity]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h2 className="text-sm font-semibold text-gray-900">
          Actividad reciente
        </h2>
      </div>

      {recentActivity.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 px-5 py-3 border-b last:border-none"
        >
          <div className="mt-0.5">
            {item.type === "appointment" ? (
              <Calendar className="w-4 h-4 text-[#534AB7]" />
            ) : (
              <ClipboardPlus className="w-4 h-4 text-[#3C3489]" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            {item.subtitle && (
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            )}
          </div>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {new Date(item.date).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

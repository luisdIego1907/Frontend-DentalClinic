import { useEffect, useState } from "react";
import { CalendarDays, Search, X } from "lucide-react";
import { StatusBadge } from "../../components/home/Statusbadge";
import type { AppointmentData } from "../../models/appointment";
import { getAppointments } from "../../services/AppointmentService";

const getDateOnly = (date: string) => date.split("T")[0];

const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertMinutesToTime = (totalMinutes: number) => {
  const normalizedMinutes = totalMinutes % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const minutes = normalizedMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const formatDateToDayMonthYear = (date: string) => {
  const [year, month, day] = getDateOnly(date).split("-");
  return `${day}/${month}/${year}`;
};

const getAppointmentEndTime = (time: string, durationMinutes: number) => {
  const startMinutes = convertTimeToMinutes(time);
  const endMinutes = startMinutes + durationMinutes;

  return convertMinutesToTime(endMinutes);
};

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        const appointmentsResponse = await getAppointments();
        setAppointments(appointmentsResponse);
      } catch (error) {
        console.error("Error al cargar citas:", error);
        setErrorMessage("No se pudieron cargar las citas.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = getDateOnly(appointment.date);
      const matchesStartDate = !startDate || appointmentDate >= startDate;
      const matchesEndDate = !endDate || appointmentDate <= endDate;

      return matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => {
      const dateComparison = getDateOnly(a.date).localeCompare(
        getDateOnly(b.date),
      );

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return a.time.localeCompare(b.time);
    });

  const hasFilters = Boolean(startDate || endDate);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Citas
          </span>

          <h1 className="text-3xl font-bold text-gray-900">Ver citas</h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Consulte las citas registradas y filtre la agenda por rango de
            fechas.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
            {errorMessage}
          </div>
        )}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-gray-900">
            <Search className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Filtrar citas</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Desde
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                Hasta
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              title="Limpiar filtros"
              className="flex h-[42px] items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Limpiar
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-gray-900">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Citas registradas</h2>
            </div>

            <p className="text-sm text-gray-500">
              Mostrando {filteredAppointments.length} de {appointments.length}
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
              Cargando citas...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
              No hay citas registradas con los filtros seleccionados.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {appointment.patient
                          ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
                          : "Paciente no seleccionado"}
                      </p>

                      {appointment.patient && (
                        <p className="text-sm text-gray-600">
                          Identificación: {appointment.patient.identification}
                        </p>
                      )}

                      <p className="text-sm text-gray-600">
                        Fecha: {formatDateToDayMonthYear(appointment.date)}
                      </p>

                      <p className="text-sm text-gray-600">
                        Horario: {appointment.time} -{" "}
                        {getAppointmentEndTime(
                          appointment.time,
                          appointment.durationMinutes,
                        )}
                      </p>

                      <p className="text-sm text-gray-600">
                        Odontólogo: {appointment.doctor || "Sin asignar"}
                      </p>

                      <p className="text-sm text-gray-600">
                        Motivo: {appointment.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {appointment.durationMinutes} min
                      </span>
                      <StatusBadge estado={appointment.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

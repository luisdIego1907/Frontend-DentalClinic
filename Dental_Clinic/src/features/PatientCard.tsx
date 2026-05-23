import {
  UserRound,
  Phone,
  IdCard
} from "lucide-react";

type Props = {
  patient: {
    name: string;
    identification: string;
    phone: string;
  };
  selected?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
};

export default function PatientCard({
  patient,
  selected,
  onClick,
  onSelect
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer
        bg-white rounded-2xl border
        p-6 transition-all duration-300
        shadow-sm overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        ${selected
          ? "border-sky-500 shadow-lg"
          : "border-slate-200 hover:border-sky-300"
        }
      `}
    >

      <div className="absolute top-4 right-4">

        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          className="
            w-5 h-5 rounded
            accent-sky-500
            cursor-pointer"/>

      </div>

      <div className="flex items-start gap-4">

        <div
          className="
            w-14 h-14 rounded-2xl
            bg-sky-50
            flex items-center justify-center
            text-sky-500
            transition-all duration-300
            group-hover:bg-sky-100
            group-hover:scale-110">

          <UserRound size={28} />
        </div>

        <div className="flex-1 min-w-0">

          <h3 className="text-lg font-semibold text-slate-800 truncate">
            {patient.name}
          </h3>

          <div className="mt-4 space-y-2">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <IdCard size={16} className="text-sky-500" />

              <span className="truncate">
                {patient.identification}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone size={16} className="text-sky-500" />

              <span>
                {patient.phone}
              </span>
            </div>

          </div>

        </div>

      </div>

      <div
        className="
          absolute bottom-0 left-0 right-0 h-1
          bg-sky-500
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          rounded-b-2xl"
      />
    </div>
  );
}
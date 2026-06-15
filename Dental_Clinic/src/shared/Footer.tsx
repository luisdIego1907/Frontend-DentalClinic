import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  Calendar,
  ClipboardPlus,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-sky-100 bg-white text-sm sm:text-base 2xl:text-base min-[1800px]:text-[17px]">
      <div className="mx-auto w-full max-w-[1580px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 2xl:px-10 2xl:py-10 min-[1800px]:py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50/40 to-violet-50/60 p-6 shadow-sm sm:p-8 2xl:p-9 min-[1800px]:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {/* Marca */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M32 8C24 8 18 12 18 20C18 24 16 28 14 33C11 41 14 55 22 56C27 57 27 45 32 45C37 45 37 57 42 56C50 55 53 41 50 33C48 28 46 24 46 20C46 12 40 8 32 8Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Clínica Dental
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sistema interno de expediente digital
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-6 text-slate-600">
                Plataforma administrativa para la gestión de pacientes, citas y
                consultas clínicas.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                Sistema operativo
              </div>
            </div>

            {/* Accesos */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-950">
                Accesos rápidos
              </h3>

              <nav className="space-y-3 text-sm">
                <Link
                  to="/patients"
                  className="flex items-center gap-3 text-slate-600 transition hover:text-[#534AB7]"
                >
                  <Users size={17} />
                  Pacientes
                </Link>

                <Link
                  to="/appointments"
                  className="flex items-center gap-3 text-slate-600 transition hover:text-[#534AB7]"
                >
                  <Calendar size={17} />
                  Citas
                </Link>

                <Link
                  to="/consultations"
                  className="flex items-center gap-3 text-slate-600 transition hover:text-[#534AB7]"
                >
                  <ClipboardPlus size={17} />
                  Consultas
                </Link>
              </nav>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-950">
                Información de contacto
              </h3>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 text-[#534AB7]" />
                  <span>+506 2222-2222</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 text-[#534AB7]" />
                  <span>soporte@clinicadental.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 text-[#534AB7]" />
                  <span>San José, Costa Rica</span>
                </div>
              </div>
            </div>

            {/* Soporte / redes */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-950">
                Soporte
              </h3>

              <div className="space-y-3 text-sm text-slate-600">
                <p>Lunes a viernes</p>
                <p className="font-medium text-slate-800">
                  8:00 a. m. - 5:00 p. m.
                </p>

                <div className="pt-2">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Redes
                  </p>

                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="
                      group relative flex items-center justify-center
                      w-10 h-10 rounded-full bg-white text-slate-500
                      shadow-sm border border-slate-200
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl"
                    >
                      <span
                        className="
                        absolute inset-0 rounded-full
                        ring-0 ring-pink-500/30
                        group-hover:ring-4
                        transition-all duration-300"
                      />

                      <FaInstagram
                        size={17}
                        className="
                        relative z-10
                        transition-all duration-300
                        group-hover:text-pink-600
                        group-hover:scale-110"
                      />

                      <span
                        className="
                        pointer-events-none absolute -top-10
                        px-3 py-1.5 rounded-lg
                        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                        text-white text-xs font-medium
                        opacity-0 translate-y-2
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        transition-all duration-300
                        whitespace-nowrap shadow-lg"
                      >
                        Instagram
                      </span>
                    </a>

                    <a
                      href="#"
                      aria-label="Facebook"
                      className="
                      group relative flex items-center justify-center
                      w-10 h-10 rounded-full bg-white text-slate-500
                      shadow-sm border border-slate-200
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl"
                    >
                      <span
                        className="
                        absolute inset-0 rounded-full
                        ring-0 ring-blue-600/30
                        group-hover:ring-4
                        transition-all duration-300"
                      />

                      <FaFacebookF
                        size={15}
                        className="
                        relative z-10
                        transition-all duration-300
                        group-hover:text-blue-600
                        group-hover:scale-110"
                      />

                      <span
                        className="
                        pointer-events-none absolute -top-10
                        px-3 py-1.5 rounded-lg
                        bg-blue-600
                        text-white text-xs font-medium
                        opacity-0 translate-y-2
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        transition-all duration-300
                        whitespace-nowrap shadow-lg"
                      >
                        Facebook
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Clínica Dental. Todos los derechos reservados.</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>Versión 1.0.0</span>
              <span>Panel administrativo</span>
              <span>Última actualización: 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
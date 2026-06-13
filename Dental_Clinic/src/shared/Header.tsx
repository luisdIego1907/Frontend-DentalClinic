import { useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  CalendarDays,
  Users,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { getRoles } from "../auth/sessionAuth";

type RoleCode = "ADMIN" | "ODO" | "ASSIS";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { goHome, logout } = useAuth();

  const roles = getRoles();

  const mainRole = roles[0] as RoleCode | undefined;

  const getRoleLabel = () => {
    if (mainRole === "ADMIN") return "Administrador";
    if (mainRole === "ODO") return "Odontólogo";
    if (mainRole === "ASSIS") return "Recepcionista";

    return "Usuario";
  };

  const navLinks = () => {
    if (!mainRole) return [];

    if (mainRole === "ODO") {
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/odontologist" },
        { name: "Pacientes", icon: <Users size={20} />, to: "/patients" },
      ];
    }

    if (mainRole === "ASSIS") {
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/assistant" },
        { name: "Pacientes", icon: <Users size={20} />, to: "/patients" },
        {
          name: "Citas",
          icon: <CalendarDays size={20} />,
          to: "/appointments",
        },
      ];
    }

    if (mainRole === "ADMIN") {
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/admin" },
        { name: "Pacientes", icon: <Users size={20} />, to: "/patients" },
        {
          name: "Citas",
          icon: <CalendarDays size={20} />,
          to: "/appointments",
        },
      ];
    }

    return [];
  };

  const getInitials = () => {
    const roleLabel = getRoleLabel();
    return roleLabel.charAt(0).toUpperCase();
  };

  const links = navLinks();

  const roleLabel = getRoleLabel();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <button
          type="button"
          data-cy="header-logo-home"
          onClick={goHome}
          className="flex min-w-0 items-center gap-3 text-slate-800 transition hover:opacity-90 sm:gap-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 shadow-sm sm:h-12 sm:w-12">
            <svg
              width="26"
              height="26"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#0EA5E9"
              />
            </svg>
          </div>

          <span className="truncate text-xl font-bold tracking-tight sm:text-2xl">
            Clínica
            <span className="ml-1 text-sky-500 sm:ml-2">Dental</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                data-cy={
                  link.name === "Pacientes"
                    ? "nav-patients"
                    : link.name === "Citas"
                      ? "nav-appointments"
                      : "nav-home"
                }
                className="group relative flex items-center gap-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-sky-500"
              >
                <span className="text-slate-400 transition-all group-hover:text-sky-500">
                  {link.icon}
                </span>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="w-px h-6 bg-slate-200" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-xl transition"
            >
              <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold text-sm">
                {getInitials()}
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-slate-700">
                  {roleLabel}
                </p>
                <p className="text-xs text-slate-400 capitalize">{mainRole ?? "Sin rol"}</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-14 right-0 bg-white border border-slate-100 rounded-xl shadow-lg py-2 w-44">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-600 transition-all hover:bg-sky-50 hover:text-sky-500 active:scale-90 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white/95 backdrop-blur-lg border-b border-sky-100 shadow-xl sm:top-20 md:hidden">
          <nav className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                data-cy={
                  link.name === "Pacientes"
                    ? "mobile-nav-patients"
                    : link.name === "Citas"
                      ? "mobile-nav-appointments"
                      : "mobile-nav-home"
                }
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-2xl p-3.5 text-base font-bold text-slate-700 transition-all hover:bg-sky-50 hover:text-sky-500 sm:text-lg"
              >
                <span className="bg-slate-100 p-2 rounded-lg">{link.icon}</span>
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-4 rounded-2xl p-3.5 text-base font-bold text-red-500 transition-all hover:bg-red-50 sm:text-lg"
            >
              <span className="bg-red-50 p-2 rounded-lg">
                <LogOut size={20} />
              </span>
              Cerrar sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

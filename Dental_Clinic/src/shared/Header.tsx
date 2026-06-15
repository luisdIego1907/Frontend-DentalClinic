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
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { getRoles } from "../auth/sessionAuth";

type RoleCode = "ADMIN" | "ODO" | "ASSIS";

interface NavLinkItem {
  name: string;
  icon: LucideIcon;
  to: string;
}

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

  const navLinks = (): NavLinkItem[] => {
    if (!mainRole) return [];

    if (mainRole === "ODO") {
      return [
        { name: "Inicio", icon: House, to: "/odontologist" },
        { name: "Pacientes", icon: Users, to: "/patients" },
      ];
    }

    if (mainRole === "ASSIS") {
      return [
        { name: "Inicio", icon: House, to: "/assistant" },
        { name: "Pacientes", icon: Users, to: "/patients" },
        { name: "Citas", icon: CalendarDays, to: "/appointments" },
      ];
    }

    if (mainRole === "ADMIN") {
      return [
        { name: "Inicio", icon: House, to: "/admin" },
        { name: "Pacientes", icon: Users, to: "/patients" },
        { name: "Citas", icon: CalendarDays, to: "/appointments" },
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
    <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white/90 text-sm shadow-sm backdrop-blur-md sm:text-base 2xl:text-base min-[1800px]:text-[17px]">
      <div className="mx-auto flex h-16 w-full max-w-[1580px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8 2xl:h-24 2xl:px-10 min-[1800px]:h-28">
        <button
          type="button"
          data-cy="header-logo-home"
          onClick={goHome}
          className="flex min-w-0 items-center gap-3 text-slate-800 transition hover:opacity-90 sm:gap-4 2xl:gap-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 shadow-sm sm:h-12 sm:w-12 2xl:h-14 2xl:w-14 min-[1800px]:h-16 min-[1800px]:w-16">
            <svg
              className="h-7 w-7 sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 min-[1800px]:h-10 min-[1800px]:w-10"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#0EA5E9"
              />
            </svg>
          </div>

          <span className="truncate text-xl font-bold tracking-tight sm:text-2xl 2xl:text-3xl min-[1800px]:text-4xl">
            Clínica
            <span className="ml-1 text-sky-500 sm:ml-2">Dental</span>
          </span>
        </button>

        <div className="hidden items-center gap-6 md:flex 2xl:gap-8 min-[1800px]:gap-10">
          <nav className="flex items-center gap-6 2xl:gap-8 min-[1800px]:gap-10">
            {links.map((link) => {
              const Icon = link.icon;

              return (
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
                  className="group relative flex items-center gap-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-sky-500 2xl:gap-3 2xl:text-base min-[1800px]:text-lg"
                >
                  <span className="text-slate-400 transition-all group-hover:text-sky-500">
                    <Icon className="h-5 w-5 2xl:h-6 2xl:w-6 min-[1800px]:h-7 min-[1800px]:w-7" />
                  </span>

                  {link.name}

                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sky-500 opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                </Link>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-slate-200 2xl:h-8 min-[1800px]:h-9" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-50 2xl:gap-3 2xl:px-4 2xl:py-3 min-[1800px]:px-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600 2xl:h-11 2xl:w-11 2xl:text-base min-[1800px]:h-12 min-[1800px]:w-12 min-[1800px]:text-lg">
                {getInitials()}
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-slate-700 2xl:text-base min-[1800px]:text-lg">
                  {roleLabel}
                </p>

                <p className="text-xs capitalize text-slate-400 2xl:text-sm min-[1800px]:text-base">
                  {mainRole ?? "Sin rol"}
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400 2xl:h-5 2xl:w-5 min-[1800px]:h-6 min-[1800px]:w-6" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-44 rounded-xl border border-slate-100 bg-white py-2 shadow-lg 2xl:top-16 2xl:w-52 min-[1800px]:top-20 min-[1800px]:w-60">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50 2xl:px-5 2xl:py-3 2xl:text-base min-[1800px]:text-lg"
                >
                  <LogOut className="h-4 w-4 2xl:h-5 2xl:w-5 min-[1800px]:h-6 min-[1800px]:w-6" />
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
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-sky-100 bg-white/95 shadow-xl backdrop-blur-lg sm:top-20 md:hidden">
          <nav className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
            {links.map((link) => {
              const Icon = link.icon;

              return (
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
                  <span className="rounded-lg bg-slate-100 p-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  {link.name}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-4 rounded-2xl p-3.5 text-base font-bold text-red-500 transition-all hover:bg-red-50 sm:text-lg"
            >
              <span className="rounded-lg bg-red-50 p-2">
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
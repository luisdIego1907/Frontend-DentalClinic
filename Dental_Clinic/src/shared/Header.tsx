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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getUser, goHome, logout } = useAuth();
  const user = getUser();

  const navLinks = () => {
    if (!user) return [];

    if (user.rol === "odontologist")
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/odontologist" },
      ];

    if (user.rol === "assistant")
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/assistant" },
        { name: "Pacientes", icon: <Users size={20} />, to: "/patients" },
        {
          name: "Citas",
          icon: <CalendarDays size={20} />,
          to: "/appointments/schedule",
        },
      ];

    if (user.rol === "admin")
      return [
        { name: "Inicio", icon: <House size={20} />, to: "/admin" },
        { name: "Pacientes", icon: <Users size={20} />, to: "/patients" },
        {
          name: "Citas",
          icon: <CalendarDays size={20} />,
          to: "/appointments/schedule",
        },
      ];

    return [];
  };

  const getInitials = () => {
    if (!user) return "";
    return `${user.nombre?.charAt(0) ?? ""}`.toUpperCase();
  };

  const links = navLinks();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={goHome}
          className="flex items-center gap-3 text-2xl font-extrabold text-slate-800"
        >
          Clínica<span className="text-sky-500 ml-2">Dental</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
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
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-xl transition"
            >
              <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold text-sm">
                {getInitials()}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-700">
                  {user?.nombre}
                </p>
                <p className="text-xs text-slate-400 capitalize">{user?.rol}</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-14 right-0 bg-white border border-slate-100 rounded-xl shadow-lg py-2 w-44">
                <button
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
          className="md:hidden p-2.5 rounded-xl text-slate-600 hover:bg-sky-50 hover:text-sky-500 transition-all active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-sky-100 shadow-xl">
          <nav className="flex flex-col p-6 gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-lg font-bold text-slate-700 p-3.5 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all"
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
              className="flex items-center gap-4 text-lg font-bold text-red-500 p-3.5 rounded-2xl hover:bg-red-50 transition-all"
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

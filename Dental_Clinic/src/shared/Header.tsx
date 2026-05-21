import { useState } from 'react';
import {
    House,
    CalendarDays,
    Users,
    Menu,
    X,
} from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Inicio', icon: <House size={20} /> },
        { name: 'Citas', icon: <CalendarDays size={20} /> },
        { name: 'Pacientes', icon: <Users size={20} /> },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center gap-3 text-2xl font-extrabold text-slate-800">

                    <span className="tracking-tight">
                        Clínica
                        <span className="text-sky-500 ml-2">
                            Dental
                        </span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            className="group relative flex items-center gap-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-sky-500"
                        >
                            <span className="text-slate-400 transition-all group-hover:text-sky-500">
                                {link.icon}
                            </span>

                            {link.name}

                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                        </button>
                    ))}
                </nav>

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
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-lg font-bold text-slate-700 p-3.5 rounded-2xl hover:bg-sky-50 hover:text-sky-500 transition-all"
                            >
                                <span className="bg-slate-100 p-2 rounded-lg">
                                    {link.icon}
                                </span>

                                {link.name}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
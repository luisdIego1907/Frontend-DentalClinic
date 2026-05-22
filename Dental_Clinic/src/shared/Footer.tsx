import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-sky-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Clínica Dental
              </h2>

              <p className="text-xs text-slate-500">
                Sistema interno de expediente digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <a
              href="https://www.instagram.com/" target='_blank'
              className="group relative flex items-center justify-center
              w-10 h-10 rounded-full bg-white text-slate-600
              shadow-sm border border-slate-200 transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg">
              <span
                className="absolute inset-0 rounded-full
                ring-0 ring-pink-500/30 group-hover:ring-4
                transition-all duration-300"
              />

              <FaInstagram
                size={18}
                className="relative z-10 transition-all duration-300
                group-hover:text-pink-600 group-hover:scale-110"
              />
            </a>

            <a
              href="https://www.facebook.com/" target='_blank'
              className="group relative flex items-center justify-center
              w-10 h-10 rounded-full bg-white text-slate-600
              shadow-sm border border-slate-200 transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg">
                
              <span
                className="absolute inset-0 rounded-full
                ring-0 ring-blue-500/30 group-hover:ring-4
                transition-all duration-300"
              />

              <FaFacebookF
                size={18}
                className="relative z-10 transition-all duration-300
                group-hover:text-blue-600 group-hover:scale-110"
              />
            </a>

          </div>

          <p className="text-sm text-slate-500">
            © 2026 Clínica Dental. Todos los derechos reservados.
          </p>

        </div>

      </div>
    </footer>
  );

}
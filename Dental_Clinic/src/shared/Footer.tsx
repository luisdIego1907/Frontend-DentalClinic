import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-sky-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

          <div className="flex items-center justify-center gap-3">

            <svg
              width="24"
              height="24"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sky-500"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="currentColor"
              />
            </svg>

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Clínica <span className="text-sky-500">Dental</span>
              </h2>

              <p className="text-xs text-slate-500">
                Sistema interno de expediente digital
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">

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

          <p className="text-sm text-slate-500 md:text-right">
            © 2026 Clínica Dental. Todos los derechos reservados
          </p>

        </div>

      </div>
    </footer>
  );
}
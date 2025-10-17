import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* 🔹 HEADER CON SIDENAV HORIZONTAL */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          {/* Logo y título */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/biomedical-logo.png"
                width={45}
                height={45}
                alt="Logo Biomédica Pro"
                className="object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold">Biomédica Pro</h1>
                <p className="text-green-100 text-sm">Ciencia y tecnología al servicio de la salud</p>
              </div>
            </div>
            
            {/* 🔹 BOTÓN CERRAR SESIÓN EN HEADER */}
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-all shadow-md">
                <PowerIcon className="w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </form>
          </div>

          {/* 🔹 NAVLINKS HORIZONTAL (SIDENAV EN HEADER) */}
          <nav className="flex justify-center space-x-4">
            <NavLinks />
          </nav>
        </div>
      </header>

      {/* 🔹 CONTENIDO PRINCIPAL - SIN SIDENAV LATERAL */}
      <div className="flex-1 p-6 md:overflow-y-auto md:p-12 bg-green-50">
        {children}
      </div>

      {/* 🔹 FOOTER SIMPLE */}
      <footer className="bg-gradient-to-r from-gray-800 to-green-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Image
              src="/biomedical-logo.png"
              width={35}
              height={35}
              alt="Logo Biomédica Pro"
              className="object-contain"
            />
            <h3 className="text-xl font-bold">Biomédica Pro</h3>
          </div>
          <p className="text-green-300">&copy; 2025 Biomédica Pro. Tecnología al servicio de la vida.</p>
        </div>
      </footer>
    </div>
  );
}
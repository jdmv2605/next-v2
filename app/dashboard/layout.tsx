import Image from 'next/image';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* 🔹 HEADER COMPLETO CON LOGO, NAVEGACIÓN Y LOGOUT */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-xl">
        <div className="container mx-auto px-6 py-4">
          {/* Contenedor principal del header */}
          <div className="flex items-center justify-between">
            
            {/* Logo y Título */}
            <div className="flex items-center space-x-4">
              <Image
                src="/biomedical-logo.png"
                width={50}
                height={50}
                alt="Logo BioMed"
                className="object-contain drop-shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">BioMed Pro</h1>
                <p className="text-green-100 text-sm">Sistema de Monitoreo Médico</p>
              </div>
            </div>

            {/* Navegación Centrada */}
            <nav className="flex-1 flex justify-center">
              <div className="flex space-x-1 bg-green-700 rounded-xl p-1 shadow-inner">
                <NavLinks />
              </div>
            </nav>

            {/* Botón Cerrar Sesión */}
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button className="flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                <PowerIcon className="w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-6 md:overflow-y-auto md:p-12 bg-gradient-to-br from-green-50 to-emerald-100">
        {children}
      </div>

      {/* 🔹 FOOTER */}
      <footer className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Image
              src="/biomedical-logo.png"
              width={35}
              height={35}
              alt="Logo BioMed"
              className="object-contain"
            />
            <h3 className="text-xl font-bold">BioMed Pro</h3>
          </div>
          <p className="text-green-300">&copy; 2025 BioMed Pro. Tecnología para la salud.</p>
        </div>
      </footer>
    </div>
  );
}
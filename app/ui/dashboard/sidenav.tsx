import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* 🔹 LOGO CON FONDO VERDE BIOMÉDICO */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 p-4 md:h-40 shadow-lg"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-3">
        <NavLinks />
        
        <div className="hidden h-auto w-full grow rounded-lg bg-green-50 md:block"></div>
        
        {/* 🔹 BOTÓN SIGN OUT VERDE */}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-3 text-sm font-medium text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-md md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Cerrar Sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}

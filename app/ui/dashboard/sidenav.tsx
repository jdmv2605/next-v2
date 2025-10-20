import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* 🔹 LOGO CON FONDO AZUL */}
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-4 md:h-40 shadow-lg"
        href="/"
      >
        <Image
          src="/biomed-logo.png"
          width={200}
          height={200}
          alt="Logo BioMed"
          className="object-contain rounded-full"
        />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-3">
        {/* 🔹 BOTÓN PÁGINA PRINCIPAL */}
        <Link
          href="/"
          prefetch={false}
          className="flex h-[48px] items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-sm font-medium text-white hover:bg-blue-700 transition-all md:justify-start md:p-2 md:px-3"
        >
          <HomeIcon className="w-6" />
          <div className="hidden md:block">Página Principal</div>
        </Link>

        {/* 🔹 NAVEGACIÓN PRINCIPAL */}
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-lg bg-blue-50 md:block"></div>
      </div>
    </div>
  );
}

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-4 md:h-52">
        <Image
          src="/biomedical-logo.png"
          width={150}
          height={150}
          alt="Logo BioMed Pro"
          className="object-contain"
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white/90 px-6 py-10 shadow-lg md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Bienvenido a BioMed Pro.</strong><br />
            Tecnología avanzada para el cuidado médico.<br />
            Sistema de monitoreo y gestión de equipos biomédicos.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 self-start rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:from-green-700 hover:to-emerald-700 md:text-base shadow-md hover:shadow-lg"
          >
            <span>Ingresar al Sistema</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5 p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-biomedicine-desktop.jpeg"
            width={2000}
            height={1000}
            className="hidden md:block mt-20 ml-10 rounded-lg shadow-xl"
            alt="Equipos biomédicos"
          />
          <Image
            src="/hero-biomedicine2-desktop2.jpeg"
            width={2000}
            height={1000}
            className="hidden md:block -mt-10 ml-30 rounded-lg shadow-xl"
            alt="Tecnología médica"
          />
          <Image
            src="/hero-cat-mobile.jpg"
            width={560}
            height={620}
            className="block md:hidden rounded-lg shadow-lg"
            alt="Sistema móvil"
          />
        </div>
      </div>
    </main>
  );
}

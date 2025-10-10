//import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-bio-background">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-bio-primary p-4 md:h-52">
        <Image
      src="/biomedical-logo.png"   // el nombre del logo que pusiste en /public
      width={150}            // ajusta según el tamaño que necesites
      height={150}
      alt="Logo Biomedicina"
      className="object-contain"
/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white/90 px-6 py-10 shadow-lg md:w-2/5 md:px-20">
  <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
    <strong>Bienvenido a Biomédica.</strong><br />
    Innovación, ciencia y tecnología al servicio de la salud.<br />
    Descubre nuestras soluciones en biotecnología, diagnóstico e investigación avanzada.
  </p>

  <Link
    href="/login"
    className="flex items-center gap-3 self-start rounded-lg bg-bio-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-bio-secondary md:text-base"
  >
    <span>Explorar</span> <ArrowRightIcon className="w-5 md:w-6" />
  </Link>
</div>
        <div className="flex items-center justify-center gap-5 p-6 md:w-3/5 md:px-28 md:py-12">

          <Image
        src="/hero-biomedicine-desktop.jpeg"
        width={2000}
        height={1000}
        className="hidden md:block mt-20 ml-10"
        alt="Screenshots of the dashboard project showing desktop version"
      /> <Image
        src="/hero-biomedicine2-desktop.jpeg"
        width={2000}
        height={1000}
        className="hidden md:block -mt-10 ml-30"
        alt="Screenshots of the dashboard project showing desktop version"
      /> 
        {/* Imagen móvil */}
          <Image
         src="/hero-mobile.png"
         width={560}
         height={620}
         className="block md:hidden"
         alt="Versión móvil del dashboard"
       />
{/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  );
}

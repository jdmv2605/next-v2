import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateDuenno() {
  return (
    <Link
      href="/dashboard/duennos/create"
      className="flex h-10 items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 shadow-md hover:shadow-lg"
    >
      <span className="hidden md:block">Agregar Paciente</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
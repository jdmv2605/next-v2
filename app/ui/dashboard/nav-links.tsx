'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


interface LinkItem {
  name: string;
  href: string;
  icon: React.ElementType;
}


const links: LinkItem[] = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Facturas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Clientes', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // 🔹 ESTILOS PARA NAVEGACIÓN HORIZONTAL
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:shadow-md',
              {
                // 🔹 ESTILO ACTIVO
                'bg-white text-green-700 shadow-lg': pathname === link.href,
                // 🔹 ESTILO INACTIVO
                'text-green-100 hover:bg-green-500 hover:text-white': pathname !== link.href,
              },
            )}
          >
            <LinkIcon className="w-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}

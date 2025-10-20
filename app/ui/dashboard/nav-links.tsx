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
  { name: 'Servicios', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Pacientes', href: '/dashboard/duennos', icon: UserGroupIcon }, // 🔹 CAMBIADO
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
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105',
              {
                'bg-green-500 text-white shadow-lg ring-2 ring-green-300': pathname === link.href,
                'bg-transparent text-green-100 hover:bg-green-500 hover:text-white': pathname !== link.href,
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

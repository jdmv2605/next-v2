import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'; // 🔹 Mantener la función original

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      {/* 🔹 TARJETAS PERSONALIZADAS PARA CATCARE */}
      <Card title="Total Dueños" value={numberOfCustomers} type="customers" />
      <Card title="Total Servicios" value={numberOfInvoices} type="invoices" />
      <Card title="Servicios Pendientes" value={totalPendingInvoices} type="pending" />
      <Card title="Servicios Completados" value={totalPaidInvoices} type="collected" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gradient-to-r from-cat-primary to-cat-secondary p-2 shadow-lg">
      <div className="rounded-md bg-white p-4">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-cat-dark" /> : null}
          <h3 className="ml-2 text-sm font-medium text-cat-dark">{title}</h3>
        </div>
        <p
          className={`${lusitana.className} truncate rounded-md bg-cat-accent px-4 py-4 text-center text-2xl text-cat-dark`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

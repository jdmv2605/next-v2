import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-yellow-100 text-yellow-800': status === 'pending',
          'bg-green-100 text-green-800': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pendiente
          <ClockIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Completado
          <CheckIcon className="ml-1 w-4" />
        </>
      ) : null}
    </span>
  );
}

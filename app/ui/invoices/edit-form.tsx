'use client';

import { DuennoField, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: DuennoField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  
  return (
    <form action={updateInvoiceWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Dueño */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium text-gray-700">
            Seleccionar Dueño
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-cat-primary focus:ring-1 focus:ring-cat-primary"
              defaultValue={invoice.customer_id}
            >
              <option value="" disabled>
                Selecciona un dueño
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Monto del Servicio */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-700">
            Monto del Servicio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Ingresa el monto en COP"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-cat-primary focus:ring-1 focus:ring-cat-primary"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-cat-primary" />
            </div>
          </div>
        </div>

        {/* Estado del Servicio */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-gray-700">
            Estado del Servicio
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-cat-primary focus:ring-cat-primary"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800"
                >
                  Pendiente <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-cat-primary focus:ring-cat-primary"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800"
                >
                  Completado <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Servicio</Button>
      </div>
    </form>
  );
}

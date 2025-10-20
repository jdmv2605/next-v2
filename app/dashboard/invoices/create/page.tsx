import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDuennosForInvoices } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchDuennosForInvoices();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Servicios', href: '/dashboard/invoices' },
          {
            label: 'Crear Servicio',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
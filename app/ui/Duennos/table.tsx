import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export default async function DuenosTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Dueños
      </h1>
      <Search placeholder="Buscar dueños..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((dueno) => (
                  <div
                    key={dueno.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={dueno.image_url}
                              className="rounded-full"
                              alt={`Foto de ${dueno.name}`}
                              width={28}
                              height={28}
                            />
                            <p>{dueno.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{dueno.email}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Teléfono</p>
                        <p className="font-medium">{dueno.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Dirección</p>
                        <p className="font-medium">{dueno.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{dueno.total_invoices} propiedades</p>
                    </div>
                  </div>
                ))}
              </div>

              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Correo
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Propiedades
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Teléfono
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Dirección
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((dueno) => (
                    <tr key={dueno.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={dueno.image_url}
                            className="rounded-full"
                            alt={`Foto de ${dueno.name}`}
                            width={28}
                            height={28}
                          />
                          <p>{dueno.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {dueno.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {dueno.total_invoices}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {dueno.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {dueno.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

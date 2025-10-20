import { CreateDuenno } from '@/app/ui/duennos/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data'; // 🔹 CAMBIAR A ESTA FUNCIÓN
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pacientes',
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const pacientes = await fetchFilteredCustomers(query); // 🔹 ESTA FUNCIÓN INCLUYE LOS TOTALES
  
  console.log('🩺 PACIENTES CON ESTADÍSTICAS:', pacientes);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-green-800`}>
          Pacientes ({pacientes?.length || 0})
        </h1>
        <CreateDuenno />
      </div>
      
      {/* Tabla de pacientes con estadísticas */}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    Paciente
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    Total Servicios
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    Total Pendiente
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    Total Pagado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pacientes?.map((paciente) => (
                  <tr
                    key={paciente.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-green-50 transition-colors"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={paciente.image_url || '/customers/default-avatar.png'}
                          alt={`Foto de ${paciente.name}`}
                          className="rounded-full w-10 h-10"
                        />
                        <p className="font-medium text-gray-900">{paciente.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-700">
                      {paciente.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {paciente.total_invoices || 0}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-orange-600">
                      {paciente.total_pending}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-green-600">
                      {paciente.total_paid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mensaje si no hay pacientes */}
      {(!pacientes || pacientes.length === 0) && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-lg">No hay pacientes registrados</p>
          <p className="text-gray-400 mt-2">Usa el botón "Agregar Paciente" para comenzar</p>
        </div>
      )}
    </div>
  );
}
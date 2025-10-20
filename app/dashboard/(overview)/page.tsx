import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; // 🔹 AGREGAR
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import Image from 'next/image';

export default async function Page() { 
  
  return (
    <main>
      {/* 🔹 ENCABEZADO CON LOGO */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/biomed-logo.png"
            width={40}
            height={40}
            alt="Logo BioMed"
            className="object-contain"
          />
          <h1 className={`${lusitana.className} text-xl md:text-2xl font-bold text-green-800`}>
            Panel de Control BioMed
          </h1>
        </div>
      </div>
      
      {/* 🔹 TARJETAS DE RESUMEN */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      
      {/* 🔹 GRÁFICOS Y SERVICIOS RECIENTES */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices /> {/* 🔹 AGREGAR AQUÍ */}
        </Suspense>
      </div>
    </main>
  );
}
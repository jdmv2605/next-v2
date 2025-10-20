import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenueChartData } from '@/app/lib/data';

// Tipo para los datos del gráfico
interface ChartData {
  month: string;
  revenue: number;
}

// Función para generar el eje Y
const generateYAxis = (revenue: ChartData[]) => {
  if (!revenue || revenue.length === 0) {
    return { yAxisLabels: ['$0'], topLabel: 1000 };
  }

  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  
  let topLabel = 1000;
  if (highestRecord > 0) {
    if (highestRecord <= 1000) {
      topLabel = Math.ceil(highestRecord / 100) * 100;
    } else if (highestRecord <= 5000) {
      topLabel = Math.ceil(highestRecord / 500) * 500;
    } else {
      topLabel = Math.ceil(highestRecord / 1000) * 1000;
    }
  }

  // Asegurarnos de que topLabel no sea 0
  topLabel = Math.max(topLabel, 1000);

  const yAxisLabels = [];
  const steps = 5;
  for (let i = steps; i >= 0; i--) {
    const value = Math.round((topLabel / steps) * i);
    yAxisLabels.push(`$${value}`);
  }

  return { yAxisLabels, topLabel };
};

export default async function RevenueChart() {
  // 🔹 SOLUCIÓN: Convertir explícitamente a any primero, luego a ChartData[]
  const revenueData = (await fetchRevenueChartData()) as any as ChartData[];
  
  const chartHeight = 350;
  
  if (!revenueData || revenueData.length === 0) {
    return (
      <div className="w-full md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-cat-dark`}>
          Ingresos de Servicios
        </h2>
        <div className="rounded-xl bg-gradient-to-r from-cat-primary to-cat-secondary p-8 text-center">
          <p className="text-white text-lg">📊 No hay datos de ingresos aún</p>
          <p className="text-cat-accent text-sm mt-2">
            Para ver el gráfico, crea servicios y cámbiales el estado a "Completado"
          </p>
        </div>
      </div>
    );
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenueData);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-cat-dark`}>
        Ingresos de Servicios
      </h2>
      
      <div className="rounded-xl bg-gradient-to-r from-cat-primary to-cat-secondary p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="text-xs">{label}</p>
            ))}
          </div>

          {revenueData.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-cat-accent transition-all hover:bg-cat-primary"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                  minHeight: month.revenue > 0 ? '4px' : '0px',
                }}
                title={`${month.month}: $${month.revenue}`}
              ></div>
              <p className="text-xs text-gray-400">
                {new Date(month.month + '-01').toLocaleDateString('es-ES', { month: 'short' })}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-white" />
          <h3 className="ml-2 text-sm text-white">Últimos 12 meses</h3>
        </div>
      </div>
    </div>
  );
}

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | BioMed Dashboard',
    default: 'BioMed Dashboard',
  },
  description: 'Sistema de monitoreo biomédico para equipos médicos.',
  metadataBase: new URL('https://biomed-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

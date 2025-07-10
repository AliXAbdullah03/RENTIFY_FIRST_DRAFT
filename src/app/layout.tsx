import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { PropertyProvider } from '@/context/property-context';

export const metadata: Metadata = {
  title: 'Rentify',
  description: 'Find your next rental with Rentify. Browse cars, rooms, apartments, and commercial spaces all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <PropertyProvider>
            <div className="flex min-h-screen w-full flex-col">
                <AppHeader />
                <main className="flex-1 animate-gradient-xy bg-gradient-to-br from-background to-primary/10 bg-[length:400%_400%] p-4 md:p-8">
                    {children}
                </main>
            </div>
        </PropertyProvider>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { PropertyProvider } from '@/context/property-context';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <PropertyProvider>
            <div className="relative z-10 flex min-h-screen w-full flex-col">
                <AppHeader />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </PropertyProvider>
        <Toaster />
      </body>
    </html>
  );
}

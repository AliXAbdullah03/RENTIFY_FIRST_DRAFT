import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/app-sidebar';
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
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex h-full flex-col overflow-y-auto">
                <AppHeader />
                <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </PropertyProvider>
        <Toaster />
      </body>
    </html>
  );
}

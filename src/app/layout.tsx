
'use client';
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { PropertyProvider } from '@/context/property-context';
import { AuthProvider } from '@/context/auth-context';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Since we're using 'use client', we can't export metadata directly.
// We'll handle this in a separate component if needed or set it in the head.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isListingsPage = pathname === '/listings';

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
          <title>Rentify</title>
          <meta name="description" content="Find your next rental with Rentify. Browse cars, rooms, apartments, and commercial spaces all in one place." />
      </head>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <AuthProvider>
          <PropertyProvider>
              {isListingsPage && (
                <div className="fixed inset-0 -z-10">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/loop-video.mp4"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                </div>
              )}
              <div className="relative z-10 flex min-h-screen w-full flex-col">
                  <AppHeader />
                  <main className="flex-1 py-8">
                      {children}
                  </main>
              </div>
          </PropertyProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

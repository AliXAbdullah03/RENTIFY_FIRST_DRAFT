
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  CircleUser,
  LifeBuoy,
  Menu,
  Settings,
  User,
  LayoutGrid,
  PlusCircle,
  Home
} from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-24 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <Logo className="h-10 w-10 text-primary" />
          <span className="hidden text-3xl font-bold tracking-tight sm:inline-block">Rentify</span>
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild size="lg">
                <Link href="/login">Login</Link>
            </Button>
        </div>
      
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">Rentify</span>
              </Link>
              <Separator />
              <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <CircleUser className="h-5 w-5" />
                Login
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

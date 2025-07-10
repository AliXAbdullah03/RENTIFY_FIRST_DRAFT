
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
  PlusCircle
} from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/listings', label: 'All Ads', icon: LayoutGrid },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">Rentify</span>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-primary',
                pathname.startsWith(item.href)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-6 w-6" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
         <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/create-listing">
                <PlusCircle className="mr-2 h-5 w-5" />
                Post Your Ad
            </Link>
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 transition-colors hover:text-foreground',
                   pathname.startsWith(item.href)
                    ? 'bg-accent'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Separator />
            <Link href="/login" className="text-muted-foreground transition-colors hover:text-foreground">Login</Link>
            <Link href="/profile" className="text-muted-foreground transition-colors hover:text-foreground">Profile</Link>
            <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">Settings</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

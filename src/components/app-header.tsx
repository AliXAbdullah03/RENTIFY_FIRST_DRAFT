
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
  LayoutGrid,
  PlusCircle,
  LogOut,
  User as UserIcon,
  MessageSquare,
} from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from './ui/badge';

const loggedOutNavItems: any[] = [
  // No items for logged out users in the main nav
];

const renterNavItems = [
  { href: '/listings', label: 'Listings', icon: LayoutGrid },
  { href: '/inbox', label: 'Inbox', icon: MessageSquare, notificationCount: 3 },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

const ownerNavItems = [
    { href: '/listings', label: 'My Listings', icon: LayoutGrid },
    { href: '/create-listing', label: 'Create Listing', icon: PlusCircle },
    { href: '/inbox', label: 'Inbox', icon: MessageSquare, notificationCount: 1 },
    { href: '/support', label: 'Support', icon: LifeBuoy },
]

export function AppHeader() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  
  const navItems = role === 'renter' ? renterNavItems : (role === 'owner' ? ownerNavItems : loggedOutNavItems);

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
        <nav className="hidden items-center gap-6 text-lg font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80 relative',
                pathname === item.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {item.label}
              {item.notificationCount && item.notificationCount > 0 && (
                 <Badge variant="destructive" className="absolute -top-2 -right-4 h-5 w-5 justify-center p-0">{item.notificationCount}</Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                <Avatar className="h-12 w-12">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile"><UserIcon className="mr-2" />Profile</Link>
              </DropdownMenuItem>
               <DropdownMenuItem asChild>
                <Link href="/inbox" className="relative">
                    <MessageSquare className="mr-2" />
                    Inbox
                    <Badge variant="destructive" className="absolute top-1 right-2 h-5 w-5 justify-center p-0">3</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings"><Settings className="mr-2" />Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support"><LifeBuoy className="mr-2" />Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
        )}
      
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
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">Rentify</span>
              </Link>
              <Separator />
              {user ? (
                <>
                  {navItems.map(item => (
                     <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary relative">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                      {item.notificationCount && item.notificationCount > 0 && (
                          <Badge variant="destructive" className="absolute left-6 top-1 h-5 w-5 justify-center p-0">{item.notificationCount}</Badge>
                      )}
                    </Link>
                  ))}
                  <Separator />
                   <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      <UserIcon className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                    <div onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      <LogOut className="h-5 w-5" />
                      Logout
                    </div>

                </>
              ) : (
                <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <CircleUser className="h-5 w-5" />
                  Login
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

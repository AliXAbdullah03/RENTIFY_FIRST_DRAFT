
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
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
  Globe
} from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from './ui/badge';
import React from 'react';
import type { Language } from '@/context/auth-context';

const t = {
    en: {
        listings: "Listings",
        myListings: "My Listings",
        createListing: "Create Listing",
        inbox: "Inbox",
        support: "Support",
        myAccount: "My Account",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        login: "Login",
        selectLanguage: "Select Language",
        english: "English",
        tagalog: "Tagalog / Taglish",
    },
    tl: {
        listings: "Mga Listing",
        myListings: "Aking Mga Listing",
        createListing: "Gumawa ng Listing",
        inbox: "Inbox",
        support: "Suporta",
        myAccount: "Aking Account",
        profile: "Profile",
        settings: "Mga Setting",
        logout: "Mag-logout",
        login: "Mag-login",
        selectLanguage: "Pumili ng Wika",
        english: "Ingles",
        tagalog: "Tagalog / Taglish",
    }
}

export function AppHeader() {
  const pathname = usePathname();
  const { user, role, logout, language, setLanguage } = useAuth();
  
  const translations = t[language];

  const loggedOutNavItems: any[] = [];

  const renterNavItems = [
    { href: '/listings', label: translations.listings, icon: LayoutGrid },
    { href: '/inbox', label: translations.inbox, icon: MessageSquare, notificationCount: 3 },
    { href: '/support', label: translations.support, icon: LifeBuoy },
  ];

  const ownerNavItems = [
      { href: '/listings', label: translations.myListings, icon: LayoutGrid },
      { href: '/create-listing', label: translations.createListing, icon: PlusCircle },
      { href: '/inbox', label: translations.inbox, icon: MessageSquare, notificationCount: 1 },
      { href: '/support', label: translations.support, icon: LifeBuoy },
  ]
  
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{translations.selectLanguage}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <DropdownMenuRadioItem value="en">{translations.english}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="tl">{translations.tagalog}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

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
              <DropdownMenuLabel>{translations.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile"><UserIcon className="mr-2 h-4 w-4" />{translations.profile}</Link>
              </DropdownMenuItem>
               <DropdownMenuItem asChild>
                <Link href="/inbox" className="relative">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {translations.inbox}
                    <Badge variant="destructive" className="absolute top-1 right-2 h-5 w-5 justify-center p-0">3</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings"><Settings className="mr-2 h-4 w-4" />{translations.settings}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support"><LifeBuoy className="mr-2 h-4 w-4" />{translations.support}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                {translations.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" asChild size="lg">
            <Link href="/login">{translations.login}</Link>
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
                      {translations.profile}
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      <Settings className="h-5 w-5" />
                      {translations.settings}
                    </Link>
                    <div onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      <LogOut className="h-5 w-5" />
                      {translations.logout}
                    </div>

                </>
              ) : (
                <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <CircleUser className="h-5 w-5" />
                  {translations.login}
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, LogIn, PlusCircle } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          className="w-full rounded-full bg-background pl-10 md:w-2/3 lg:w-1/2"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/create-listing">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Listing
            </Link>
        </Button>
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Login / Sign Up</span>
            <span className="sm:hidden">Login</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

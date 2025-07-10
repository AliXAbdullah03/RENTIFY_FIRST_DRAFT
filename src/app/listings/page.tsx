
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { List, LayoutGrid, Map, Search, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PropertyCard } from '@/components/property-card';
import type { PropertyType } from '@/lib/types';
import Image from 'next/image';
import { usePropertyContext } from '@/context/property-context';
import { useSearchParams } from 'next/navigation';

export default function ListingsPage() {
  const { properties } = usePropertyContext();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState<PropertyType | 'all'>(initialType as PropertyType | 'all');
  
  const filteredProperties = properties.filter(
    (property) => filter === 'all' || property.type === filter
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
        <Image
          src="https://placehold.co/1600x600.png"
          alt="Street view with cars and buildings"
          fill
          className="object-cover"
          data-ai-hint="city street cars"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Your Next Chapter, Found</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-300">
            Discover a place you'll love to live. Unforgettable rentals at your fingertips.
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative w-full flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search properties by location, type, or feature..."
                    className="w-full rounded-lg bg-background pl-10 py-3 text-base"
                />
            </div>
             <Button asChild size="lg">
                <Link href="/create-listing">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Listing
                </Link>
            </Button>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs
            defaultValue={filter}
            onValueChange={(value) => setFilter(value as PropertyType | 'all')}
            className="w-full md:w-auto"
            >
            <TabsList className="grid h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="apartment">Apartments</TabsTrigger>
                <TabsTrigger value="house">Houses</TabsTrigger>
                <TabsTrigger value="car">Cars</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
            </TabsList>
            </Tabs>
            <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => {
                if (value) setView(value);
            }}
            aria-label="View options"
            >
            <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="map" aria-label="Map view">
                <Map className="h-5 w-5" />
            </ToggleGroupItem>
            </ToggleGroup>
        </div>
      </div>

      {view === 'map' ? (
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg shadow-lg bg-card">
           <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of properties"
            fill
            data-ai-hint="map city dark"
            style={{objectFit: 'cover'}}
            className="opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold">Map View Coming Soon</h2>
              <p className="mt-2 text-lg text-muted-foreground">Interactive map feature is under development.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {filteredProperties.length > 0 ? (
            <div
              className={
                view === 'grid'
                  ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-6'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  view={view}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg bg-card border border-border">
              <h2 className="text-2xl font-bold">No Listings Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

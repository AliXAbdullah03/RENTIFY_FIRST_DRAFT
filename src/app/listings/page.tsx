
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
    <div className="container mx-auto py-8">
      <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative flex-1 md:grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search properties by location, type, or feature..."
                    className="w-full rounded-lg bg-background pl-8"
                />
            </div>
             <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/create-listing">
                    <PlusCircle className="mr-2 h-4 w-4" />
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
            <TabsList className="h-auto flex-wrap justify-center md:grid md:h-10 md:w-auto md:grid-cols-5">
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
                <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="map" aria-label="Map view">
                <Map className="h-4 w-4" />
            </ToggleGroupItem>
            </ToggleGroup>
        </div>
      </div>

      {view === 'map' ? (
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg shadow-lg">
           <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of properties"
            fill
            data-ai-hint="map city"
            style={{objectFit: 'cover'}}
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold">Map View Coming Soon</h2>
              <p className="mt-2 text-lg">Interactive map feature is under development.</p>
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
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">No Listings Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

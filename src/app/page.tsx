'use client';
import { useState } from 'react';
import { List, LayoutGrid, Map } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PropertyCard } from '@/components/property-card';
import { properties as allProperties } from '@/lib/mock-data';
import type { PropertyType } from '@/lib/types';
import Image from 'next/image';

export default function HomePage() {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState<PropertyType | 'all'>('all');

  const filteredProperties = allProperties.filter(
    (property) => filter === 'all' || property.type === filter
  );

  return (
    <div className="container mx-auto">
       <div className="relative mb-12 h-[50vh] min-h-[300px] w-full overflow-hidden rounded-lg">
          <Image
              src="/main-logo.png"
              alt="Modern building exterior"
              fill
              className="z-0 object-cover"
              data-ai-hint="modern architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter drop-shadow-md">
                  Your Next Chapter, Found
              </h1>
              <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 drop-shadow-sm md:text-xl">
                  Discover a place you&apos;ll love to live. Unforgettable rentals at your fingertips.
              </p>
          </div>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs
          defaultValue="all"
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

      {view === 'map' ? (
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg shadow-lg">
           <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of properties"
            layout="fill"
            objectFit="cover"
            data-ai-hint="map city"
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
      )}
    </div>
  );
}

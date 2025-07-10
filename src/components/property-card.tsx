
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Car, Building, MapPin } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  view: 'grid' | 'list';
}

export function PropertyCard({ property, view }: PropertyCardProps) {
  const isGridView = view === 'grid';
  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <Card
        className={cn(
          'flex h-full flex-col transition-all duration-300 ease-in-out hover:shadow-lg border-2 border-transparent hover:border-primary',
          'overflow-hidden'
        )}
      >
        <div className={cn('relative w-full shrink-0', isGridView ? 'h-48' : 'h-48')}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={`${property.type} exterior`}
          />
           {property.featured && (
             <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">Featured</Badge>
           )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base font-bold leading-tight group-hover:text-primary mb-2">
                {property.title}
              </CardTitle>
            </div>
             <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1.5 h-4 w-4" />
              {property.location}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0 mt-4">
             <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {(property.type === 'house' || property.type === 'apartment') && (
                <>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.details.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" />
                    <span>{property.details.baths} Baths</span>
                  </div>
                </>
              )}
               {property.type === 'commercial' && (
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span>{property.details.sqft} sqft</span>
                </div>
                )}
               {property.type === 'car' && (
                <div className="flex items-center gap-1.5">
                  <Car className="h-4 w-4" />
                  <span>Car</span>
                </div>
                )}
            </div>
          </CardContent>
          <CardFooter className="p-0 mt-4 flex items-end justify-between">
            <div className="text-lg font-bold text-primary">
              ${property.price}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
             <Badge variant="secondary" className="capitalize">{property.type}</Badge>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

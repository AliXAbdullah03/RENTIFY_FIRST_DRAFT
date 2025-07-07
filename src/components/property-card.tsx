'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Car, Building, MapPin } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
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

const typeIcons = {
  house: <BedDouble className="h-4 w-4" />,
  apartment: <BedDouble className="h-4 w-4" />,
  car: <Car className="h-4 w-4 text-muted-foreground" />,
  commercial: <Building className="h-4 w-4 text-muted-foreground" />,
};

export function PropertyCard({ property, view }: PropertyCardProps) {
  const isGridView = view === 'grid';
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <Card
        className={cn(
          'flex h-full transition-all duration-300 ease-in-out hover:shadow-xl',
          isGridView ? 'flex-col' : 'flex-row items-center',
          'overflow-hidden'
        )}
      >
        <div className={cn('relative', isGridView ? 'w-full h-48' : 'w-1/3 h-full')}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={`${property.type} exterior`}
          />
        </div>

        <div className={cn('flex flex-col', isGridView ? '' : 'w-2/3')}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg leading-tight group-hover:text-primary">
                {property.title}
              </CardTitle>
              <Badge variant={property.featured ? 'default' : 'secondary'} className="ml-2 shrink-0">
                {property.featured ? 'Featured' : 'New'}
              </Badge>
            </div>
            <CardDescription className="flex items-center pt-1">
              <MapPin className="mr-1.5 h-4 w-4" />
              {property.location}
            </CardDescription>
          </CardHeader>
          <CardContent className={isGridView ? '' : 'flex-grow'}>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.description}
            </p>
          </CardContent>
          <CardFooter className="flex items-end justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {typeIcons[property.type]}
              {(property.type === 'house' || property.type === 'apartment') && (
                <>
                  <span>{property.details.beds} Beds</span>
                  <Bath className="h-4 w-4" />
                  <span>{property.details.baths} Baths</span>
                </>
              )}
               {property.type === 'commercial' && <span>{property.details.sqft} sqft</span>}
            </div>
            <div className="text-lg font-bold text-foreground">
              ${property.price}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

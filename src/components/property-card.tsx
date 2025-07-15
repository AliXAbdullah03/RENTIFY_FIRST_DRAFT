
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Car, Building, MapPin, Eye, MessageSquare, Edit, Power, Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/lib/types';
import type { UserRole } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { DeleteListingDialog } from './delete-listing-dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

interface PropertyCardProps {
  property: Property;
  view: 'grid' | 'list';
  role?: UserRole | null;
  onDelete?: () => void;
}

export function PropertyCard({ property, view, role, onDelete = () => {} }: PropertyCardProps) {
  const { toast } = useToast();
  const isGridView = view === 'grid';
  const isOwnerView = role === 'owner';
  const CardWrapper = isOwnerView ? 'div' : Link;
  const wrapperProps = isOwnerView ? {} : { href: `/properties/${property.id}`, className: "group block h-full" };

  const handlePause = () => {
    toast({
      title: 'Listing Paused',
      description: 'This listing is now hidden from search results.',
    });
  };

  const handleEdit = () => {
    toast({
      title: 'Edit Clicked',
      description: 'You would be redirected to the edit page for this listing.',
    });
  };

  const handleFeatureToggle = (isFeatured: boolean) => {
    // In a real app, this would trigger a payment flow if isFeatured is true.
    // Here, we just show a toast.
    toast({
        title: isFeatured ? 'Listing Featured!' : 'Feature Removed',
        description: isFeatured ? 'This listing will now be shown to more renters.' : 'This listing is no longer featured.',
    });
    // Here you would also update the property state globally.
  }

  return (
    <CardWrapper {...wrapperProps}>
      <Card
        className={cn(
          'flex h-full flex-col transition-all duration-300 ease-in-out bg-card hover:border-primary border-2 border-transparent',
          'overflow-hidden rounded-lg'
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
           {property.availableNow && (
              <Badge variant="secondary" className="absolute top-2 right-2">Available Now</Badge>
            )}
            {property.featured && (
                <Badge variant="default" className="absolute top-2 left-2 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Featured
                </Badge>
            )}
            {isOwnerView && property.paused && (
                 <Badge variant={"destructive"} className="absolute top-2 left-2">
                    Paused
                 </Badge>
            )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary mb-1">
                {isOwnerView ? <Link href={`/properties/${property.id}`} className="hover:underline">{property.title}</Link> : property.title}
              </CardTitle>
            </div>
             <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1.5 h-4 w-4" />
              {property.location}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0 mt-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
                {property.description}
            </p>
          </CardContent>
          <CardFooter className="p-0 mt-4 flex items-end justify-between">
             <div className="text-lg font-bold text-primary">
              ${property.price}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {(property.type === 'house' || property.type === 'apartment' || property.type === 'room') && property.details.beds && (
                <>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.details.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" />
                    <span>{property.details.baths}</span>
                  </div>
                </>
              )}
               {property.type === 'bedspace' && (
                 <div className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" />
                    <span>Bedspace</span>
                  </div>
               )}
               {property.type === 'commercial' && property.details.sqft && (
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span>{property.details.sqft}sqft</span>
                </div>
                )}
               {property.type === 'car' && (
                <div className="flex items-center gap-1.5">
                  <Car className="h-4 w-4" />
                  <span>Car</span>
                </div>
                )}
            </div>
          </CardFooter>
        </div>
        {isOwnerView && (
            <>
                <Separator />
                <div className="p-4 space-y-3">
                    <div className="flex justify-around text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span>{property.analytics?.views ?? Math.floor(Math.random() * 500)} views</span>
                        </div>
                         <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{property.analytics?.inquiries ?? Math.floor(Math.random() * 50)} inquiries</span>
                        </div>
                    </div>
                     <div className="flex items-center justify-between gap-2">
                         <div className="flex items-center space-x-2">
                            <Switch id={`feature-${property.id}`} defaultChecked={property.featured} onCheckedChange={handleFeatureToggle} />
                            <Label htmlFor={`feature-${property.id}`}>Feature</Label>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="outline" size="icon" onClick={handleEdit}>
                               <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handlePause}>
                               <Power className="h-4 w-4" />
                            </Button>
                            <DeleteListingDialog onDelete={onDelete} listingTitle={property.title} />
                        </div>
                    </div>
                </div>
            </>
        )}
      </Card>
    </CardWrapper>
  );
}


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
import { useAuth } from '@/context/auth-context';

const t = {
    en: {
        availableNow: "Available Now",
        featured: "Featured",
        paused: "Paused",
        perMonth: "/month",
        bedspace: "Bedspace",
        car: "Car",
        views: "views",
        inquiries: "inquiries",
        feature: "Feature",
        listingPaused: "Listing Paused",
        listingPausedDesc: "This listing is now hidden from search results.",
        editClicked: "Edit Clicked",
        editClickedDesc: "You would be redirected to the edit page for this listing.",
        listingFeatured: "Listing Featured!",
        listingFeaturedDesc: "This listing will now be shown to more renters.",
        featureRemoved: "Feature Removed",
        featureRemovedDesc: "This listing is no longer featured."
    },
    tl: {
        availableNow: "Available Na",
        featured: "Tampok",
        paused: "Nakahinto",
        perMonth: "/buwan",
        bedspace: "Bedspace",
        car: "Sasakyan",
        views: "pagtingin",
        inquiries: "mga tanong",
        feature: "Itampok",
        listingPaused: "Listing ay Ipinahinto",
        listingPausedDesc: "Ang listing na ito ay nakatago na ngayon sa mga resulta ng paghahanap.",
        editClicked: "Edit ay Pinindot",
        editClickedDesc: "Dadalhin ka sa pahina ng pag-edit para sa listing na ito.",
        listingFeatured: "Listing ay Itinampok!",
        listingFeaturedDesc: "Ang listing na ito ay ipapakita na ngayon sa mas maraming umuupa.",
        featureRemoved: "Tampok ay Tinanggal",
        featureRemovedDesc: "Ang listing na ito ay hindi na itinatampok."
    }
};

interface PropertyCardProps {
  property: Property;
  view: 'grid' | 'list';
  role?: UserRole | null;
  onDelete?: () => void;
}

export function PropertyCard({ property, view, role, onDelete = () => {} }: PropertyCardProps) {
  const { toast } = useToast();
  const { language } = useAuth();
  const translations = t[language];

  const isGridView = view === 'grid';
  const isOwnerView = role === 'owner';
  const CardWrapper = isOwnerView ? 'div' : Link;
  const wrapperProps = isOwnerView ? {} : { href: `/properties/${property.id}`, className: "group block h-full" };

  const handlePause = () => {
    toast({
      title: translations.listingPaused,
      description: translations.listingPausedDesc,
    });
  };

  const handleEdit = () => {
    toast({
      title: translations.editClicked,
      description: translations.editClickedDesc,
    });
  };

  const handleFeatureToggle = (isFeatured: boolean) => {
    toast({
        title: isFeatured ? translations.listingFeatured : translations.featureRemoved,
        description: isFeatured ? translations.listingFeaturedDesc : translations.featureRemovedDesc,
    });
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
              <Badge variant="secondary" className="absolute top-2 right-2">{translations.availableNow}</Badge>
            )}
            {property.featured && (
                <Badge variant="default" className="absolute top-2 left-2 flex items-center gap-1">
                    <Star className="h-3 w-3" /> {translations.featured}
                </Badge>
            )}
            {isOwnerView && property.paused && (
                 <Badge variant={"destructive"} className="absolute top-2 left-2">
                    {translations.paused}
                 </Badge>
            )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary mb-1">
                {isOwnerView ? (
                  <Link href={`/properties/${property.id}`} className="hover:underline">
                    {property.title}
                  </Link>
                ) : (
                  property.title
                )}
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
              <span className="text-sm font-normal text-muted-foreground">{translations.perMonth}</span>
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
                    <span>{translations.bedspace}</span>
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
                  <span>{translations.car}</span>
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
                            <span>{property.analytics?.views ?? Math.floor(Math.random() * 500)} {translations.views}</span>
                        </div>
                         <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{property.analytics?.inquiries ?? Math.floor(Math.random() * 50)} {translations.inquiries}</span>
                        </div>
                    </div>
                     <div className="flex items-center justify-between gap-2">
                         <div className="flex items-center space-x-2">
                            <Switch id={`feature-${property.id}`} defaultChecked={property.featured} onCheckedChange={handleFeatureToggle} />
                            <Label htmlFor={`feature-${property.id}`}>{translations.feature}</Label>
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

    
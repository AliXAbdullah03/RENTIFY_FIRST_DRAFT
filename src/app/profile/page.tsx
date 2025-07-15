
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PropertyCard } from '@/components/property-card';
import { owners, properties as allProperties } from '@/lib/mock-data';
import { Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { usePropertyContext } from '@/context/property-context';

const t = {
    en: {
        loading: "Loading...",
        userDetailsNotFound: "User details not found.",
        contactViaEmail: "Contact via Email",
        myListings: (count: number) => `My Listings (${count})`,
        noListings: "You have no listings yet",
        noListingsDesc: "You can view your listings here once you create them.",
    },
    tl: {
        loading: "Naglo-load...",
        userDetailsNotFound: "Hindi nahanap ang mga detalye ng user.",
        contactViaEmail: "Makipag-ugnayan sa pamamagitan ng Email",
        myListings: (count: number) => `Aking mga Listing (${count})`,
        noListings: "Wala ka pang mga listing",
        noListingsDesc: "Maaari mong tingnan ang iyong mga listing dito kapag nagawa mo na ang mga ito.",
    }
}

export default function ProfilePage() {
  const { user, isAuthenticated, role, language } = useAuth();
  const { properties } = usePropertyContext();
  const router = useRouter();
  const translations = t[language];

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false || !user) {
    return (
        <div className="container mx-auto max-w-6xl py-8 space-y-8">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-2 text-center md:text-left">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-5 w-80" />
                </div>
            </div>
            <Separator className="my-8" />
             <div>
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        </div>
    );
  }

  // In a real app, you'd get the logged-in user's ID
  const currentUserId = 'owner-1';
  const ownerDetails = owners.find((owner) => owner.id === currentUserId);
  const userProperties = properties.filter(
    (prop) => prop.ownerId === currentUserId
  );

  if (!ownerDetails) {
    return <div>{translations.userDetailsNotFound}</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
        <Avatar className="h-32 w-32 border-4 border-primary">
          <AvatarImage src={ownerDetails.avatar} alt={ownerDetails.name} data-ai-hint="person face"/>
          <AvatarFallback className="text-4xl">{ownerDetails.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{ownerDetails.name}</h1>
          <p className="text-muted-foreground">{ownerDetails.email}</p>
          <div className="mt-2 flex justify-center space-x-4 md:justify-start">
            <a href={`mailto:${ownerDetails.email}`} className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <Mail className="mr-1.5 h-4 w-4" />
              <span>{translations.contactViaEmail}</span>
            </a>
            {ownerDetails.phone && (
              <a href={`tel:${ownerDetails.phone}`} className="flex items-center text-sm text-muted-foreground hover:text-primary">
                <Phone className="mr-1.5 h-4 w-4" />
                <span>{ownerDetails.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />

      {role === 'owner' && (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-3xl font-bold">{translations.myListings(userProperties.length)}</h2>
            </div>
            {userProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userProperties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    view="grid"
                    role={role}
                />
                ))}
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card py-12 text-center">
                <h3 className="text-xl font-semibold">{translations.noListings}</h3>
                <p className="mt-2 mb-4 text-muted-foreground">
                {translations.noListingsDesc}
                </p>
            </div>
            )}
        </div>
      )}
    </div>
  );
}

    
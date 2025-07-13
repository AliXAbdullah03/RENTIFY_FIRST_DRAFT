
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

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false || !user) {
    return (
        <div className="container mx-auto max-w-6xl space-y-8">
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
  const userProperties = allProperties.filter(
    (prop) => prop.ownerId === currentUserId
  );

  if (!ownerDetails) {
    return <div>User details not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl">
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
              <span>Contact via Email</span>
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

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">My Listings ({userProperties.length})</h2>
        </div>
        {userProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                view="grid"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card py-12 text-center">
            <h3 className="text-xl font-semibold">You have no listings yet</h3>
            <p className="mt-2 mb-4 text-muted-foreground">
              You can view your listings here once you create them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

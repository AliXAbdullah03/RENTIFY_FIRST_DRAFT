import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PropertyCard } from '@/components/property-card';
import { owners, properties as allProperties } from '@/lib/mock-data';
import { Mail, Phone, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  // In a real app, you'd get the logged-in user's ID
  const currentUserId = 'owner-1';
  const user = owners.find((owner) => owner.id === currentUserId);
  const userProperties = allProperties.filter(
    (prop) => prop.ownerId === currentUserId
  );

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
        <Avatar className="h-32 w-32 border-4 border-primary">
          <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face"/>
          <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-2 flex justify-center space-x-4 md:justify-start">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1.5 h-4 w-4" />
              <span>Contact via Email</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="mr-1.5 h-4 w-4" />
              <span>Show Phone</span>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">My Listings ({userProperties.length})</h2>
            <Button asChild>
                <Link href="/create-listing">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Listing
                </Link>
            </Button>
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
              Get started by creating your first property listing.
            </p>
            <Button asChild>
                <Link href="/create-listing">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create a Listing
                </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

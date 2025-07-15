
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { properties, owners } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const property = properties.find((p) => p.id === params.id);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
        <div className="container mx-auto max-w-5xl">
            <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="my-8 w-full h-96 rounded-lg" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-8 w-1/4 mt-8" />
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                         <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
  }
  
  if (!property) {
    notFound();
  }

  const owner = owners.find((o) => o.id === property.ownerId);

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
            <div className="flex items-center">
                <MapPin className="mr-1.5 h-5 w-5" />
                <span>{property.location}</span>
            </div>
            <Badge variant="secondary" className="capitalize">{property.type}</Badge>
            {property.featured && <Badge>Featured</Badge>}
        </div>
      </div>

      <Carousel className="my-8 w-full">
        <CarouselContent>
          {property.images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint={`${property.type} interior`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">About this {property.type}</h2>
            <p className="text-muted-foreground leading-relaxed">
                {property.description}
            </p>

            <h3 className="mt-8 mb-4 text-xl font-bold">Amenities</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {property.amenities.map(amenity => (
                    <li key={amenity} className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>{amenity}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="space-y-8">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="mb-4 text-center">
                    <p className="text-4xl font-bold">${property.price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
                </div>
                <Button className="w-full" size="lg">Request a Viewing</Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">You won't be charged yet</p>
            </div>
             {owner && (
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Hosted by</h3>
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={owner.avatar} alt={owner.name} data-ai-hint="person face" />
                    <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href="/profile" className="font-bold hover:underline">{owner.name}</Link>
                  <p className="text-sm text-muted-foreground">{owner.email}</p>
                </div>
              </div>
              <a href={`mailto:${owner.email}`} className="w-full">
                <Button variant="secondary" className="mt-4 w-full">Contact Host</Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

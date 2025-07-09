import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);

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
                <Button className="w-full" size="lg">Request to book</Button>
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
              <Button variant="secondary" className="mt-4 w-full">Contact Host</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

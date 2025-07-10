
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Car, Home as HomeIcon, Building, Search } from 'lucide-react';
import { PropertyCard } from '@/components/property-card';
import { usePropertyContext } from '@/context/property-context';

const categories = [
  { name: 'Apartments', icon: HomeIcon, href: '/listings?type=apartment' },
  { name: 'Houses', icon: Building, href: '/listings?type=house' },
  { name: 'Cars', icon: Car, href: '/listings?type=car' },
  { name: 'Commercial', icon: Building, href: '/listings?type=commercial' },
];

export default function LandingPage() {
  const { properties } = usePropertyContext();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <div className="relative overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/loop-video.mp4"
            />
            <div className="absolute inset-0 bg-black/60 z-0" />
            <div className="relative z-10">
                <section className="relative flex w-full flex-col items-center justify-center text-center py-20 md:py-28">
                    <div className="container mx-auto max-w-4xl space-y-6 px-4">
                        <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-6xl">
                            The Modern Way to Rent Anything
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-neutral-200 md:text-xl">
                            Discover a seamless rental experience. From homes to cars, find exactly what you need with Rentify.
                        </p>
                         <Button size="lg" asChild>
                            <Link href="/listings">
                                Rent IT <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
                <section id="categories" className="w-full pt-12 pb-24 md:pt-24 md:pb-32">
                  <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-4xl text-white">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {categories.map((category) => (
                        <Link key={category.name} href={category.href}>
                          <Card className="text-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card/60 backdrop-blur-sm border-white/10 text-white">
                            <CardContent className="flex flex-col items-center justify-center gap-4">
                              <category.icon className="h-12 w-12 text-primary" />
                              <span className="font-semibold text-lg">{category.name}</span>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
            </div>
        </div>
        
        {featuredProperties.length > 0 && (
        <section id="featured" className="w-full py-12 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Listings</h2>
              <Button variant="link" asChild>
                <Link href="/listings">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} view="grid" />
              ))}
            </div>
          </div>
        </section>
        )}

        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Renting on Rentify is simple and secure.
                    </p>
                </div>
                 <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-3">
                    <div className="grid gap-2 text-center">
                       <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20">
                                <Search className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">1. Find Item</h3>
                        <p className="text-muted-foreground">Browse thousands of listings from trusted owners.</p>
                    </div>
                    <div className="grid gap-2 text-center">
                       <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20">
                                <HomeIcon className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">2. Book It</h3>
                        <p className="text-muted-foreground">Book your item and pay securely through our platform.</p>
                    </div>
                    <div className="grid gap-2 text-center">
                        <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20">
                                <ArrowRight className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">3. Enjoy</h3>
                        <p className="text-muted-foreground">Arrange collection and enjoy your rental. It's that easy!</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Rentify. All rights reserved.</p>
      </footer>
    </div>
  );
}

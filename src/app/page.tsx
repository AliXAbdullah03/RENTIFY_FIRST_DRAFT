
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Car, Home as HomeIcon, Building, Search } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center text-center text-white">
            <div className="relative z-10 mx-auto max-w-4xl space-y-6 p-4">
                <h1 className="text-4xl font-extrabold tracking-tighter drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                    The Smart Way to Rent Anything
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 drop-shadow-sm md:text-xl">
                    From apartments to cars, Rentify connects you with what you need, when you need it. Discover the freedom of renting.
                </p>
                <div className="flex justify-center">
                    <Button asChild size="lg">
                        <Link href="/listings">
                            Rent IT <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Rent</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rentify offers a seamless rental experience with a diverse range of options to suit your every need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <HomeIcon className="h-8 w-8 text-primary"/>
                        <CardTitle>Homes & Apartments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Find your next home, from cozy apartments to spacious houses.
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Car className="h-8 w-8 text-primary"/>
                        <CardTitle>Cars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Get on the road with a wide selection of rental cars for any occasion.
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Building className="h-8 w-8 text-primary"/>
                        <CardTitle>Commercial Spaces</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Find the perfect office, retail, or workspace for your business to thrive.
                    </CardContent>
                </Card>
              </div>
                <img
                    src="https://placehold.co/600x600.png"
                    data-ai-hint="happy people city"
                    width="600"
                    height="600"
                    alt="Feature"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Rent in 3 Easy Steps</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Our streamlined process makes renting faster and easier than ever before.
                        </p>
                    </div>
                </div>
                 <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    <div className="grid gap-1 text-center">
                        <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-16 w-16">
                                <Search className="h-8 w-8"/>
                           </div>
                        </div>
                        <h3 className="text-lg font-bold">1. Search</h3>
                        <p className="text-sm text-muted-foreground">Browse our extensive listings with powerful search and filtering tools to find exactly what you're looking for.</p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-16 w-16">
                                <HomeIcon className="h-8 w-8"/>
                           </div>
                        </div>
                        <h3 className="text-lg font-bold">2. Connect</h3>
                        <p className="text-sm text-muted-foreground">Connect with property owners directly through our platform to ask questions and arrange viewings.</p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-16 w-16">
                                <ArrowRight className="h-8 w-8"/>
                           </div>
                        </div>
                        <h3 className="text-lg font-bold">3. Rent</h3>
                        <p className="text-sm text-muted-foreground">Finalize your rental agreement and get the keys to your new property. It's that simple!</p>
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

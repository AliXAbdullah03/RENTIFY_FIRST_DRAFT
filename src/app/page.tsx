
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Car, Home as HomeIcon, Building, Search, BedDouble } from 'lucide-react';
import { PropertyCard } from '@/components/property-card';
import { usePropertyContext } from '@/context/property-context';
import { useAuth } from '@/context/auth-context';

const t = {
    en: {
        heroTitle: "Find Your Next Rental in the Philippines",
        heroSubtitle: "Discover a seamless rental experience. From condos in Manila to beach houses in Palawan, find exactly what you need with Rentify.",
        startExploring: "Start Exploring",
        browseByCategory: "Browse by Category",
        browseSubtitle: "Find the perfect space that fits your needs.",
        apartments: "Apartments",
        rooms: "Rooms",
        bedspace: "Bedspace",
        commercial: "Commercial",
        featuredListings: "Featured Listings",
        featuredSubtitle: "Discover our most popular rentals across the archipelago.",
        viewAllListings: "View All Listings",
        howItWorks: "How It Works",
        howItWorksSubtitle: "Renting on Rentify is simple, secure, and built for you.",
        step1Title: "1. Find Your Place",
        step1Desc: "Use our smart filters to browse thousands of listings from trusted owners.",
        step2Title: "2. Connect & Secure",
        step2Desc: "Contact owners, schedule viewings, and pay securely through our platform.",
        step3Title: "3. Move In",
        step3Desc: "Arrange collection and enjoy your new home. It's that easy!",
        footer: "© {year} Rentify Philippines. All rights reserved."
    },
    tl: {
        heroTitle: "Hanapin ang Iyong Susunod na Paupahan sa Pilipinas",
        heroSubtitle: "Tuklasin ang isang tuluy-tuloy na karanasan sa pag-upa. Mula sa mga condo sa Maynila hanggang sa mga beach house sa Palawan, hanapin kung ano mismo ang kailangan mo sa Rentify.",
        startExploring: "Simulan ang Pag-explore",
        browseByCategory: "Mag-browse ayon sa Kategorya",
        browseSubtitle: "Hanapin ang perpektong espasyo na angkop sa iyong mga pangangailangan.",
        apartments: "Mga Apartment",
        rooms: "Mga Kwarto",
        bedspace: "Bedspace",
        commercial: "Komersyal",
        featuredListings: "Mga Itinatampok na Listing",
        featuredSubtitle: "Tuklasin ang aming pinakasikat na mga paupahan sa buong kapuluan.",
        viewAllListings: "Tingnan Lahat ng Listing",
        howItWorks: "Paano Ito Gumagana",
        howItWorksSubtitle: "Ang pag-upa sa Rentify ay simple, secure, at ginawa para sa iyo.",
        step1Title: "1. Hanapin ang Iyong Lugar",
        step1Desc: "Gamitin ang aming mga smart filter para mag-browse ng libu-libong listing mula sa mga pinagkakatiwalaang may-ari.",
        step2Title: "2. Kumonekta at Mag-secure",
        step2Desc: "Makipag-ugnayan sa mga may-ari, mag-iskedyul ng mga viewing, at magbayad nang secure sa pamamagitan ng aming platform.",
        step3Title: "3. Lumipat",
        step3Desc: "Ayusin ang pagkuha at i-enjoy ang iyong bagong tahanan. Ganoon lang kadali!",
        footer: "© {year} Rentify Philippines. Lahat ng karapatan ay nakalaan."
    }
};

export default function LandingPage() {
  const { properties } = usePropertyContext();
  const { language } = useAuth();
  const translations = t[language];
  
  const categories = [
    { name: translations.apartments, icon: HomeIcon, href: '/listings?type=apartment' },
    { name: translations.rooms, icon: BedDouble, href: '/listings?type=room' },
    { name: translations.bedspace, icon: Building, href: '/listings?type=bedspace' },
    { name: translations.commercial, icon: Car, href: '/listings?type=commercial' },
  ];

  const featuredProperties = properties.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] bg-background">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-48 xl:py-64 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/Untitled design.mp4"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>
            
            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        {translations.heroTitle}
                    </h1>
                    <p className="mx-auto max-w-[700px] text-neutral-200 md:text-xl">
                        {translations.heroSubtitle}
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/listings">
                            {translations.startExploring} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{translations.browseByCategory}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        {translations.browseSubtitle}
                    </p>
                </div>
                <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                {categories.map((category) => (
                    <Link key={category.name} href={category.href}>
                    <Card className="text-center p-6 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-card">
                        <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                        <category.icon className="h-12 w-12 text-primary" />
                        <span className="font-semibold text-lg">{category.name}</span>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
                </div>
            </div>
        </section>
        
        {featuredProperties.length > 0 && (
        <section id="featured" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{translations.featuredListings}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                {translations.featuredSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} view="grid" />
              ))}
            </div>
             <div className="mt-12 text-center">
                <Button variant="outline" asChild size="lg">
                    <Link href="/listings">
                        {translations.viewAllListings} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
        )}

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{translations.howItWorks}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        {translations.howItWorksSubtitle}
                    </p>
                </div>
                 <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-3">
                    <div className="grid gap-2 text-center">
                       <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 border-2 border-primary">
                                <Search className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">{translations.step1Title}</h3>
                        <p className="text-muted-foreground">{translations.step1Desc}</p>
                    </div>
                    <div className="grid gap-2 text-center">
                       <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 border-2 border-primary">
                                <HomeIcon className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">{translations.step2Title}</h3>
                        <p className="text-muted-foreground">{translations.step2Desc}</p>
                    </div>
                    <div className="grid gap-2 text-center">
                        <div className="flex justify-center items-center mb-4">
                           <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 border-2 border-primary">
                                <ArrowRight className="h-10 w-10"/>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold">{translations.step3Title}</h3>
                        <p className="text-muted-foreground">{translations.step3Desc}</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
            <p className="text-xs text-muted-foreground">{translations.footer.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
}

    
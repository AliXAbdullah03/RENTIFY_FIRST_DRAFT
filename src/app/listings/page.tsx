
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { List, LayoutGrid, Map, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PropertyCard } from '@/components/property-card';
import type { PropertyType } from '@/lib/types';
import Image from 'next/image';
import { usePropertyContext } from '@/context/property-context';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { SmartSearchDialog } from '@/components/smart-search-dialog';
import { Button } from '@/components/ui/button';

const t = {
    en: {
        loading: "Loading...",
        heroTitle: "Your Next Chapter, Found",
        heroSubtitle: "Discover a place you'll love to live. Unforgettable rentals at your fingertips.",
        searchPlaceholder: "Search by location (Region, City, Barangay)...",
        priceRange: "Price Range",
        availableNow: "Available Now",
        all: "All",
        apartments: "Apartments",
        rooms: "Rooms",
        bedspace: "Bedspace",
        commercial: "Commercial",
        furnishing: "Furnishing",
        any: "Any",
        furnished: "Furnished",
        unfurnished: "Unfurnished",
        smartSearch: "Smart Search",
        gridView: "Grid view",
        listView: "List view",
        mapView: "Map view",
        myListings: "My Listings",
        smartSearchResults: (count: number) => `Showing ${count} smart search results`,
        clearSearch: "Clear Search",
        mapComingSoon: "Map View Coming Soon",
        mapUnderDevelopment: "Interactive map feature is under development.",
        noListingsFound: "No Listings Found",
        noListingsDescription: "Try adjusting your filters or check back later.",
        noListingsSmartSearch: "Your smart search didn't return any results. Try a different query.",
        noListingsOwner: "You haven't created any listings yet."
    },
    tl: {
        loading: "Naglo-load...",
        heroTitle: "Ang Iyong Susunod na Kabanata, Natagpuan",
        heroSubtitle: "Tuklasin ang isang lugar na magugustuhan mong tirahan. Mga di malilimutang paupahan sa iyong mga kamay.",
        searchPlaceholder: "Maghanap ayon sa lokasyon (Rehiyon, Lungsod, Barangay)...",
        priceRange: "Saklaw ng Presyo",
        availableNow: "Available Na Ngayon",
        all: "Lahat",
        apartments: "Mga Apartment",
        rooms: "Mga Kwarto",
        bedspace: "Bedspace",
        commercial: "Commercial",
        furnishing: "Furnishing",
        any: "Kahit ano",
        furnished: "Furnished",
        unfurnished: "Unfurnished",
        smartSearch: "Smart Search",
        gridView: "Grid view",
        listView: "List view",
        mapView: "Map view",
        myListings: "Aking mga Listing",
        smartSearchResults: (count: number) => `Nagpapakita ng ${count} resulta ng smart search`,
        clearSearch: "I-clear ang Paghahanap",
        mapComingSoon: "Malapit na ang Map View",
        mapUnderDevelopment: "Ang interactive na feature ng mapa ay kasalukuyang ginagawa.",
        noListingsFound: "Walang Nahanap na Listing",
        noListingsDescription: "Subukang ayusin ang iyong mga filter o bumalik sa ibang pagkakataon.",
        noListingsSmartSearch: "Ang iyong smart search ay walang naibalik na resulta. Subukan ang ibang query.",
        noListingsOwner: "Wala ka pang nagagawang listing."
    }
};

const MAX_PRICE = 10000;

export default function ListingsPage() {
  const { properties, deleteProperty } = usePropertyContext();
  const { isAuthenticated, role, language } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState<PropertyType | 'all'>(initialType as PropertyType | 'all');
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [availableNow, setAvailableNow] = useState(false);
  const [furnishing, setFurnishing] = useState<'any' | 'furnished' | 'unfurnished'>('any');
  const [smartSearchResults, setSmartSearchResults] = useState<string[] | null>(null);

  const translations = t[language];

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
                <Skeleton className="h-80 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Skeleton className="h-96 w-full rounded-lg" />
                    <Skeleton className="h-96 w-full rounded-lg" />
                    <Skeleton className="h-96 w-full rounded-lg" />
                    <Skeleton className="h-96 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
  }

  const handleSmartSearch = (propertyIds: string[]) => {
    setSmartSearchResults(propertyIds);
    // Reset other filters when smart search is used
    setFilter('all');
    setPriceRange([0, MAX_PRICE]);
    setAvailableNow(false);
    setFurnishing('any');
  };
  
  const clearSmartSearch = () => {
      setSmartSearchResults(null);
  }

  // Hardcoded owner ID for demo purposes
  const currentOwnerId = 'owner-1';

  const displayedProperties = role === 'owner'
    ? properties.filter(p => p.ownerId === currentOwnerId)
    : properties;

  const filteredProperties = displayedProperties.filter((property) => {
    if (role === 'owner') return true; // Owners see all their properties without filters

    if (smartSearchResults) {
        return smartSearchResults.includes(property.id);
    }
    const typeMatch = filter === 'all' || property.type === filter;
    const priceMatch = property.price >= priceRange[0] && property.price <= priceRange[1];
    const availabilityMatch = !availableNow || property.availableNow;
    const furnishingMatch = furnishing === 'any' || property.furnishing === furnishing;
    
    return typeMatch && priceMatch && availabilityMatch && furnishingMatch;
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-transparent">
        {role === 'renter' && (
            <>
                <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm border border-white/10">
                    <Image
                        src="/main-logo.png"
                        alt="Rentify Main Logo"
                        fill
                        className="object-contain p-8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">{translations.heroTitle}</h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-200">
                        {translations.heroSubtitle}
                    </p>
                    </div>
                </div>

                <div className="mb-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <div className="relative w-full lg:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={translations.searchPlaceholder}
                                className="w-full rounded-lg bg-background/80 pl-10 py-3 text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price-range" className="flex justify-between text-sm">
                                <span>{translations.priceRange}</span>
                                <span>${priceRange[0]} - ${priceRange[1]}{priceRange[1] === MAX_PRICE ? '+' : ''}</span>
                            </Label>
                            <Slider
                                id="price-range"
                                min={0}
                                max={MAX_PRICE}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="w-full"
                                disabled={!!smartSearchResults}
                            />
                        </div>
                        <div className="flex items-center space-x-2 pt-5">
                            <Checkbox id="available-now" checked={availableNow} onCheckedChange={(checked) => setAvailableNow(!!checked)} disabled={!!smartSearchResults} />
                            <Label htmlFor="available-now">{translations.availableNow}</Label>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                        <div className="lg:col-span-2">
                            <Tabs
                            defaultValue={filter}
                            onValueChange={(value) => setFilter(value as PropertyType | 'all')}
                            className="w-full md:w-auto"
                            >
                                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-background/80"
                                    aria-disabled={!!smartSearchResults}
                                    style={{ pointerEvents: smartSearchResults ? 'none' : 'auto' }}
                                >
                                    <TabsTrigger value="all">{translations.all}</TabsTrigger>
                                    <TabsTrigger value="apartment">{translations.apartments}</TabsTrigger>
                                    <TabsTrigger value="room">{translations.rooms}</TabsTrigger>
                                    <TabsTrigger value="bedspace">{translations.bedspace}</TabsTrigger>
                                    <TabsTrigger value="commercial">{translations.commercial}</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label>{translations.furnishing}</Label>
                            <RadioGroup value={furnishing} onValueChange={(value) => setFurnishing(value as any)} className="flex space-x-2" disabled={!!smartSearchResults}>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="any" id="any"/>
                                    <Label htmlFor="any">{translations.any}</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="furnished" id="furnished"/>
                                    <Label htmlFor="furnished">{translations.furnished}</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <RadioGroupItem value="unfurnished" id="unfurnished"/>
                                    <Label htmlFor="unfurnished">{translations.unfurnished}</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="flex justify-end col-span-2 gap-2">
                            <SmartSearchDialog onSearch={handleSmartSearch} />
                            <ToggleGroup
                            type="single"
                            value={view}
                            onValueChange={(value) => {
                                if (value) setView(value);
                            }}
                            aria-label="View options"
                            >
                                <ToggleGroupItem value="grid" aria-label={translations.gridView}>
                                    <LayoutGrid className="h-5 w-5" />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="list" aria-label={translations.listView}>
                                    <List className="h-5 w-5" />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="map" aria-label={translations.mapView}>
                                    <Map className="h-5 w-5" />
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                </div>
            </>
        )}

        {role === 'owner' && (
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{translations.myListings}</h1>
                <ToggleGroup
                    type="single"
                    value={view}
                    onValueChange={(value) => { if (value) setView(value); }}
                    aria-label="View options"
                >
                    <ToggleGroupItem value="grid" aria-label={translations.gridView}><LayoutGrid className="h-5 w-5" /></ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label={translations.listView}><List className="h-5 w-5" /></ToggleGroupItem>
                </ToggleGroup>
            </div>
        )}
      
      {smartSearchResults && role === 'renter' && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-primary/50 bg-primary/10 p-3">
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="font-medium">{translations.smartSearchResults(smartSearchResults.length)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={clearSmartSearch}>{translations.clearSearch}</Button>
        </div>
      )}


      {view === 'map' && role === 'renter' ? (
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg shadow-lg bg-card/80 backdrop-blur-sm">
           <Image
            src="https://placehold.co/1200x800.png"
            alt="Map of properties"
            fill
            data-ai-hint="map city dark"
            style={{objectFit: 'cover'}}
            className="opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold">{translations.mapComingSoon}</h2>
              <p className="mt-2 text-lg text-muted-foreground">{translations.mapUnderDevelopment}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {filteredProperties.length > 0 ? (
            <div
              className={
                view === 'grid'
                  ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-6'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  view={view}
                  role={role}
                  onDelete={() => deleteProperty(property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
              <h2 className="text-2xl font-bold">{translations.noListingsFound}</h2>
              <p className="text-muted-foreground mt-2">{smartSearchResults ? translations.noListingsSmartSearch : translations.noListingsDescription}</p>
               {role === 'owner' && <p className="text-muted-foreground mt-2">{translations.noListingsOwner}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

    

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';
import { usePropertyContext } from '@/context/property-context';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon, Home, Building, BedDouble, Warehouse, PlusCircle, Loader2, Bed } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import locationData from '@/lib/ph-locations.json';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const t = {
    en: {
        loading: "Loading...",
        createNewListing: "Create a New Listing",
        fillDetails: "Fill out the details below to put your property on the market.",
        propertyDetails: "Property Details",
        startWithBasics: "Start with the basics. You can add more details later.",
        listingTitle: "Listing Title",
        titlePlaceholder: "e.g., Cozy 1-Bedroom Apartment in Makati",
        titleDescription: "A catchy title helps attract renters.",
        propertyType: "Property Type",
        selectPropertyType: "Select a property type",
        apartment: "Apartment",
        house: "House",
        room: "Room",
        bedspace: "Bedspace",
        commercial: "Commercial",
        location: "Location",
        locationDescription: "Specify the location of your property using the dropdowns below.",
        region: "Region",
        selectRegion: "Select a region",
        province: "Province",
        selectProvince: "Select a province",
        city: "City / Municipality",
        selectCity: "Select a city/municipality",
        barangay: "Barangay",
        selectBarangay: "Select a barangay",
        streetAddress: "Street, Building, or Landmark (Optional)",
        streetPlaceholder: "e.g., 123 Rizal St, The Grand Towers",
        rentalCosts: "Rental Costs",
        rentalCostsDescription: "Define the pricing structure for your property.",
        monthlyRent: "Monthly Rent (PHP)",
        rentPlaceholder: "25000",
        advancePayment: "Advance Payment (Months)",
        advancePlaceholder: "1",
        securityDeposit: "Security Deposit (Months)",
        depositPlaceholder: "2",
        availabilityAndDescription: "Availability and Description",
        availabilityDescription: "Provide more information for potential renters.",
        availableFrom: "Available From",
        pickADate: "Pick a date",
        furnishingStatus: "Furnishing Status",
        furnished: "Furnished",
        unfurnished: "Unfurnished",
        partially: "Partially",
        description: "Description",
        descriptionPlaceholder: "Tell us a little bit about your property. What makes it special?",
        houseRules: "House Rules (Optional)",
        rulesPlaceholder: "e.g., No pets allowed, no smoking indoors, etc.",
        uploadPhotos: "Upload Photos",
        photosDescription: "Upload high-quality images to attract more interest. The first image will be the cover photo.",
        imageUploadFailed: "Image Upload Failed",
        imageUploadError: "There was an error processing your images. Please try again.",
        listingCreated: "Listing Created!",
        listingCreatedSuccess: "Your new property has been successfully listed.",
        submitting: "Submitting...",
        createListingBtn: "Create Listing"
    },
    tl: {
        loading: "Naglo-load...",
        createNewListing: "Gumawa ng Bagong Listing",
        fillDetails: "Punan ang mga detalye sa ibaba para ilagay ang iyong ari-arian sa market.",
        propertyDetails: "Mga Detalye ng Ari-arian",
        startWithBasics: "Magsimula sa mga pangunahing kaalaman. Maaari kang magdagdag ng higit pang mga detalye sa ibang pagkakataon.",
        listingTitle: "Pamagat ng Listing",
        titlePlaceholder: "hal., Maaliwalas na 1-Bedroom Apartment sa Makati",
        titleDescription: "Nakatutulong ang isang kaakit-akit na pamagat para maka-attract ng mga umuupa.",
        propertyType: "Uri ng Ari-arian",
        selectPropertyType: "Pumili ng uri ng ari-arian",
        apartment: "Apartment",
        house: "Bahay",
        room: "Kwarto",
        bedspace: "Bedspace",
        commercial: "Commercial",
        location: "Lokasyon",
        locationDescription: "Tukuyin ang lokasyon ng iyong ari-arian gamit ang mga dropdown sa ibaba.",
        region: "Rehiyon",
        selectRegion: "Pumili ng rehiyon",
        province: "Probinsya",
        selectProvince: "Pumili ng probinsya",
        city: "Lungsod / Munisipalidad",
        selectCity: "Pumili ng lungsod/munisipalidad",
        barangay: "Barangay",
        selectBarangay: "Pumili ng barangay",
        streetAddress: "Kalye, Gusali, o Landmark (Opsyonal)",
        streetPlaceholder: "hal., 123 Rizal St, The Grand Towers",
        rentalCosts: "Mga Gastos sa Pag-upa",
        rentalCostsDescription: "Tukuyin ang istraktura ng pagpepresyo para sa iyong ari-arian.",
        monthlyRent: "Buwanang Upa (PHP)",
        rentPlaceholder: "25000",
        advancePayment: "Paunang Bayad (Buwan)",
        advancePlaceholder: "1",
        securityDeposit: "Security Deposit (Buwan)",
        depositPlaceholder: "2",
        availabilityAndDescription: "Availability at Deskripsyon",
        availabilityDescription: "Magbigay ng karagdagang impormasyon para sa mga potensyal na umuupa.",
        availableFrom: "Available Mula",
        pickADate: "Pumili ng petsa",
        furnishingStatus: "Katayuan ng Furnishing",
        furnished: "Furnished",
        unfurnished: "Unfurnished",
        partially: "Bahagyang Furnished",
        description: "Deskripsyon",
        descriptionPlaceholder: "Sabihin sa amin ang kaunti tungkol sa iyong ari-arian. Ano ang nagpapa-espesyal dito?",
        houseRules: "Mga Panuntunan sa Bahay (Opsyonal)",
        rulesPlaceholder: "hal., Bawal ang alagang hayop, bawal manigarilyo sa loob, atbp.",
        uploadPhotos: "Mag-upload ng mga Litrato",
        photosDescription: "Mag-upload ng mga de-kalidad na larawan para maka-attract ng mas maraming interes. Ang unang larawan ang magiging cover photo.",
        imageUploadFailed: "Nabigo ang Pag-upload ng Larawan",
        imageUploadError: "Nagkaroon ng error sa pag-proseso ng iyong mga larawan. Pakisubukang muli.",
        listingCreated: "Nagawa na ang Listing!",
        listingCreatedSuccess: "Matagumpay na na-lista ang iyong bagong ari-arian.",
        submitting: "Nagsusumite...",
        createListingBtn: "Gumawa ng Listing"
    }
};

const listingFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  propertyType: z.enum(['apartment', 'room', 'bedspace', 'commercial', 'house'], {
    required_error: 'You need to select a property type.',
  }),
  region: z.string({ required_error: 'Please select a region.'}),
  province: z.string({ required_error: 'Please select a province.'}),
  city: z.string({ required_error: 'Please select a city/municipality.'}),
  barangay: z.string({ required_error: 'Please select a barangay.'}),
  streetAddress: z.string().optional(),
  monthlyRent: z.coerce.number().positive({ message: 'Monthly rent must be a positive number.' }),
  advance: z.coerce.number().min(0, { message: 'Advance payment cannot be negative.' }),
  deposit: z.coerce.number().min(0, { message: 'Deposit cannot be negative.' }),
  availableFrom: z.date({
    required_error: 'An availability date is required.',
  }),
  furnishing: z.enum(['furnished', 'unfurnished', 'partially'], {
    required_error: 'You need to select a furnishing status.',
  }),
  rules: z.string().optional(),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  photos: z.any().refine((files) => files?.length > 0, 'At least one photo is required.'),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

type LocationData = typeof locationData;

export default function CreateListingPage() {
  const { isAuthenticated, role, user, language } = useAuth();
  const { addProperty } = usePropertyContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState<keyof LocationData | ''>('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const translations = t[language];

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: '',
      description: '',
      streetAddress: '',
      rules: '',
      advance: 0,
      deposit: 0,
      furnishing: 'unfurnished',
    },
  });

  useEffect(() => {
    if (isAuthenticated === false || (isAuthenticated && role !== 'owner')) {
      router.push('/login');
    }
  }, [isAuthenticated, role, router]);

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(data: ListingFormValues) {
    setIsSubmitting(true);

    const photoFiles = data.photos as FileList;
    let photoDataUris: string[] = [];

    try {
        photoDataUris = await Promise.all(Array.from(photoFiles).map(fileToDataUri));
    } catch (error) {
        console.error("Error converting images to Data URIs", error);
        toast({
            variant: 'destructive',
            title: translations.imageUploadFailed,
            description: translations.imageUploadError,
        });
        setIsSubmitting(false);
        return;
    }

    const fullLocation = [data.streetAddress, data.barangay, data.city, data.province].filter(Boolean).join(', ');

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: data.title,
      description: data.description,
      type: data.propertyType,
      price: data.monthlyRent,
      location: fullLocation,
      images: photoDataUris.length > 0 ? photoDataUris : ['https://placehold.co/600x400.png'],
      featured: false,
      ownerId: 'owner-1', // Hardcoded for now
      details: {}, // Can be expanded later
      amenities: ['WiFi', 'Kitchen'], // Default amenities
      availableNow: new Date() >= data.availableFrom,
      furnishing: data.furnishing,
    };
    
    addProperty(newProperty as any);

    toast({
      title: translations.listingCreated,
      description: translations.listingCreatedSuccess,
    });
    
    setIsSubmitting(false);
    router.push('/listings');
  }

  const handleRegionChange = (value: string) => {
    form.setValue('region', value);
    setSelectedRegion(value as keyof LocationData);
    form.resetField('province');
    form.resetField('city');
    form.resetField('barangay');
    setSelectedProvince('');
    setSelectedCity('');
  };

  const handleProvinceChange = (value: string) => {
    form.setValue('province', value);
    setSelectedProvince(value);
    form.resetField('city');
    form.resetField('barangay');
    setSelectedCity('');
  };

   const handleCityChange = (value: string) => {
    form.setValue('city', value);
    setSelectedCity(value);
    form.resetField('barangay');
  };

  const provinces = selectedRegion ? Object.keys((locationData as LocationData)[selectedRegion].province_list) : [];
  const cities = selectedRegion && selectedProvince ? Object.keys((locationData as LocationData)[selectedRegion].province_list[selectedProvince].municipality_list) : [];
  const barangays = selectedRegion && selectedProvince && selectedCity ? (locationData as LocationData)[selectedRegion].province_list[selectedProvince].municipality_list[selectedCity].barangay_list : [];


  if (!isAuthenticated || role !== 'owner') {
    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="space-y-8">
                 <Skeleton className="h-12 w-1/2" />
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-12 w-32" />
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 flex items-center gap-4">
        <PlusCircle className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translations.createNewListing}</h1>
          <p className="text-muted-foreground">{translations.fillDetails}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{translations.propertyDetails}</CardTitle>
              <CardDescription>{translations.startWithBasics}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.listingTitle}</FormLabel>
                    <FormControl>
                      <Input placeholder={translations.titlePlaceholder} {...field} />
                    </FormControl>
                    <FormDescription>{translations.titleDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.propertyType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={translations.selectPropertyType} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment"><Building className="mr-2 h-4 w-4" /> {translations.apartment}</SelectItem>
                          <SelectItem value="house"><Home className="mr-2 h-4 w-4" /> {translations.house}</SelectItem>
                          <SelectItem value="room"><BedDouble className="mr-2 h-4 w-4" /> {translations.room}</SelectItem>
                          <SelectItem value="bedspace"><Bed className="mr-2 h-4 w-4" /> {translations.bedspace}</SelectItem>
                          <SelectItem value="commercial"><Warehouse className="mr-2 h-4 w-4" /> {translations.commercial}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>{translations.location}</CardTitle>
                <CardDescription>{translations.locationDescription}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.region}</FormLabel>
                            <Select onValueChange={handleRegionChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder={translations.selectRegion} /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(locationData).map(([regionCode, regionDetails]) => (
                                        <SelectItem key={regionCode} value={regionCode}>{regionDetails.region_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.province}</FormLabel>
                            <Select onValueChange={handleProvinceChange} value={field.value} disabled={!selectedRegion}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder={translations.selectProvince} /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {provinces.map(province => (
                                        <SelectItem key={province} value={province}>{province}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.city}</FormLabel>
                            <Select onValueChange={handleCityChange} value={field.value} disabled={!selectedProvince}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder={translations.selectCity} /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                     {cities.map(city => (
                                        <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="barangay"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.barangay}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder={translations.selectBarangay} /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {barangays.map(barangay => (
                                        <SelectItem key={barangay} value={barangay}>{barangay}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>{translations.streetAddress}</FormLabel>
                        <FormControl>
                            <Input placeholder={translations.streetPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
           </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations.rentalCosts}</CardTitle>
              <CardDescription>{translations.rentalCostsDescription}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
               <FormField
                  control={form.control}
                  name="monthlyRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.monthlyRent}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={translations.rentPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="advance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.advancePayment}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={translations.advancePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.securityDeposit}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={translations.depositPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>{translations.availabilityAndDescription}</CardTitle>
                <CardDescription>{translations.availabilityDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="availableFrom"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{translations.availableFrom}</FormLabel>
                            <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                    format(field.value, "PPP")
                                    ) : (
                                    <span>{translations.pickADate}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date(new Date().setHours(0,0,0,0))
                                }
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="furnishing"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>{translations.furnishingStatus}</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="furnished" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{translations.furnished}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="unfurnished" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{translations.unfurnished}</FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="partially" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{translations.partially}</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{translations.description}</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder={translations.descriptionPlaceholder}
                            className="resize-y min-h-[120px]"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rules"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{translations.houseRules}</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder={translations.rulesPlaceholder}
                            className="resize-y"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="photos"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{translations.uploadPhotos}</FormLabel>
                        <FormControl>
                            <Input type="file" multiple accept="image/*" {...form.register('photos')} />
                        </FormControl>
                         <FormDescription>
                           {translations.photosDescription}
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {translations.submitting}</> : translations.createListingBtn}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

    
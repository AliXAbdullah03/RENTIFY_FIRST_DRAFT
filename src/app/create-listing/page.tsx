
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
  const { isAuthenticated, role, user } = useAuth();
  const { addProperty } = usePropertyContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState<keyof LocationData | ''>('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
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
            title: 'Image Upload Failed',
            description: 'There was an error processing your images. Please try again.',
        });
        setIsSubmitting(false);
        return;
    }

    const fullLocation = [data.streetAddress, data.barangay, data.city].filter(Boolean).join(', ');

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
      title: 'Listing Created!',
      description: 'Your new property has been successfully listed.',
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
  const barangays = selectedRegion && selectedCity ? (locationData as LocationData)[selectedRegion].province_list[selectedProvince].municipality_list[selectedCity].barangay_list : [];


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
          <h1 className="text-3xl font-bold tracking-tight">Create a New Listing</h1>
          <p className="text-muted-foreground">Fill out the details below to put your property on the market.</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Start with the basics. You can add more details later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Cozy 1-Bedroom Apartment in Makati" {...field} />
                    </FormControl>
                    <FormDescription>A catchy title helps attract renters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment"><Building className="mr-2 h-4 w-4" /> Apartment</SelectItem>
                          <SelectItem value="house"><Home className="mr-2 h-4 w-4" /> House</SelectItem>
                          <SelectItem value="room"><BedDouble className="mr-2 h-4 w-4" /> Room</SelectItem>
                          <SelectItem value="bedspace"><Bed className="mr-2 h-4 w-4" /> Bedspace</SelectItem>
                          <SelectItem value="commercial"><Warehouse className="mr-2 h-4 w-4" /> Commercial</SelectItem>
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
                <CardTitle>Location</CardTitle>
                <CardDescription>Specify the location of your property using the dropdowns below.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select onValueChange={handleRegionChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a region" /></SelectTrigger>
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
                            <FormLabel>Province</FormLabel>
                            <Select onValueChange={handleProvinceChange} value={field.value} disabled={!selectedRegion}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a province" /></SelectTrigger>
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
                            <FormLabel>City / Municipality</FormLabel>
                            <Select onValueChange={handleCityChange} value={field.value} disabled={!selectedProvince}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a city/municipality" /></SelectTrigger>
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
                            <FormLabel>Barangay</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a barangay" /></SelectTrigger>
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
                        <FormLabel>Street, Building, or Landmark (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 123 Rizal St, The Grand Towers" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
           </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rental Costs</CardTitle>
              <CardDescription>Define the pricing structure for your property.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
               <FormField
                  control={form.control}
                  name="monthlyRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent (PHP)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25000" {...field} />
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
                      <FormLabel>Advance Payment (Months)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
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
                      <FormLabel>Security Deposit (Months)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Availability and Description</CardTitle>
                <CardDescription>Provide more information for potential renters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="availableFrom"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Available From</FormLabel>
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
                                    <span>Pick a date</span>
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
                                <FormLabel>Furnishing Status</FormLabel>
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
                                        <FormLabel className="font-normal">Furnished</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="unfurnished" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Unfurnished</FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="partially" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Partially</FormLabel>
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us a little bit about your property. What makes it special?"
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
                        <FormLabel>House Rules (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="e.g., No pets allowed, no smoking indoors, etc."
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
                        <FormLabel>Upload Photos</FormLabel>
                        <FormControl>
                            <Input type="file" multiple accept="image/*" {...form.register('photos')} />
                        </FormControl>
                         <FormDescription>
                            Upload high-quality images to attract more interest. The first image will be the cover photo.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Create Listing'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

    
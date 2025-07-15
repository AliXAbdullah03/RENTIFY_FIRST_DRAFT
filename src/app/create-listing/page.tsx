
'use client';

import { useEffect } from 'react';
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
import { CalendarIcon, Home, Building, BedDouble, Warehouse, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const listingFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  propertyType: z.enum(['apartment', 'room', 'bedspace', 'commercial'], {
    required_error: 'You need to select a property type.',
  }),
  monthlyRent: z.coerce.number().positive({ message: 'Monthly rent must be a positive number.' }),
  advance: z.coerce.number().min(0, { message: 'Advance payment cannot be negative.' }),
  deposit: z.coerce.number().min(0, { message: 'Deposit cannot be negative.' }),
  location: z.string().min(5, { message: 'Location must be at least 5 characters long.' }),
  availableFrom: z.date({
    required_error: 'An availability date is required.',
  }),
  rules: z.string().optional(),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  photos: z.any().refine((files) => files?.length > 0, 'At least one photo is required.'),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export default function CreateListingPage() {
  const { isAuthenticated, role, user } = useAuth();
  const { addProperty } = usePropertyContext();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated === false || (isAuthenticated && role !== 'owner')) {
      router.push('/login');
    }
  }, [isAuthenticated, role, router]);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      advance: 0,
      deposit: 0,
    },
  });

  function onSubmit(data: ListingFormValues) {
    const newProperty = {
      id: `prop-${Date.now()}`,
      title: data.title,
      description: data.description,
      type: data.propertyType,
      price: data.monthlyRent,
      location: data.location,
      images: ['https://placehold.co/600x400.png'], // Placeholder for uploaded images
      featured: false,
      ownerId: 'owner-1', // Hardcoded for now
      details: {}, // Can be expanded later
      amenities: ['WiFi', 'Kitchen'], // Default amenities
      availableNow: new Date() >= data.availableFrom,
      furnishing: 'unfurnished', // Default
    };
    
    addProperty(newProperty as any);

    toast({
      title: 'Listing Created!',
      description: 'Your new property has been successfully listed.',
    });
    router.push('/listings');
  }

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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                          <SelectItem value="apartment"><Home className="mr-2 h-4 w-4" /> Apartment</SelectItem>
                          <SelectItem value="room"><BedDouble className="mr-2 h-4 w-4" /> Room</SelectItem>
                          <SelectItem value="bedspace"><Building className="mr-2 h-4 w-4" /> Bedspace</SelectItem>
                          <SelectItem value="commercial"><Warehouse className="mr-2 h-4 w-4" /> Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Poblacion, Makati City" {...field} />
                        </FormControl>
                        <FormDescription>Be as specific as possible.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>
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
                            <Input type="file" multiple {...form.register('photos')} />
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
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

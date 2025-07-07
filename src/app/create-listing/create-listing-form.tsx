'use client';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, AlertTriangle, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { enhanceDescriptionAction } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  propertyType: z.enum(['apartment', 'house', 'car', 'commercial'], {
    required_error: 'You need to select a property type.',
  }),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(500, 'Description must not exceed 500 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  location: z.string().min(2, 'Location is required.'),
  keyFeatures: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateListingForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      location: '',
      keyFeatures: '',
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: 'Listing Created!',
      description: 'Your property has been successfully listed.',
    });
  }

  const handleEnhanceDescription = () => {
    const { description, propertyType, keyFeatures } = form.getValues();
    if (!description || !propertyType) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a description and select a property type before using AI enhancement.',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await enhanceDescriptionAction({
          description,
          propertyType,
          keyFeatures,
        });
        form.setValue('description', result.enhancedDescription, {
          shouldValidate: true,
        });
        setAiSuggestions(result.suggestedImprovements);
        toast({
          title: 'Description Enhanced!',
          description: 'Your property description has been improved by AI.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'AI Enhancement Failed',
          description:
            error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <>
    <Separator className="my-6" />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Modern Downtown Apartment" {...field} />
                </FormControl>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="commercial">Commercial Space</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="flex items-center justify-between">
                <FormLabel>Description</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEnhanceDescription}
                  disabled={isPending}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isPending ? 'Enhancing...' : 'Enhance with AI'}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Describe your property in detail..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {aiSuggestions && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>AI Suggestions</AlertTitle>
            <AlertDescription>{aiSuggestions}</AlertDescription>
          </Alert>
        )}

        <FormField
            control={form.control}
            name="keyFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Features (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Pool, Gym, Lake View" {...field} />
                </FormControl>
                <FormDescription>
                    A comma-separated list of key features.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Price per Month ($)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="e.g., 2200" {...field} />
                    </FormControl>
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
                    <Input placeholder="e.g., New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Demo Application</AlertTitle>
            <AlertDescription>
                This is a demo application. Submitting this form will not create a real listing. Functionality for image uploads and detailed property specifics would be added in a full implementation.
            </AlertDescription>
        </Alert>

        <Button type="submit" size="lg" className="w-full md:w-auto">
          Create Listing
        </Button>
      </form>
    </Form>
    </>
  );
}

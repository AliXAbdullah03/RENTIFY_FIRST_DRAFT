
'use client';
import { useState, useTransition, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, AlertTriangle, Info, UploadCloud, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { enhanceDescriptionAction, generateTitleAction } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  images: z
    .array(z.instanceof(File))
    .min(1, { message: 'Please upload at least one image.' })
    .max(5, { message: 'You can upload a maximum of 5 images.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateListingForm() {
  const { toast } = useToast();
  const [isEnhancing, startDescriptionTransition] = useTransition();
  const [isGeneratingTitles, startTitleTransition] = useTransition();
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [titlePopoverOpen, setTitlePopoverOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      location: '',
      keyFeatures: '',
      images: [],
    },
  });

  useEffect(() => {
    // Cleanup object URLs on component unmount
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!files.length) return;

    const currentFiles = form.getValues('images') || [];
    const spaceLeft = 5 - currentFiles.length;
    if (spaceLeft <= 0) {
      toast({
        variant: 'destructive',
        title: 'Upload Limit Reached',
        description: 'You can only upload a maximum of 5 images.',
      });
      return;
    }

    const filesToAdd = files.slice(0, spaceLeft);
    form.setValue('images', [...currentFiles, ...filesToAdd], { shouldValidate: true });

    const previewsToAdd = filesToAdd.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previewsToAdd]);
  };

  const handleRemoveImage = (index: number) => {
    const currentFiles = [...(form.getValues('images') || [])];
    const currentPreviews = [...imagePreviews];

    URL.revokeObjectURL(currentPreviews[index]); // Clean up memory

    currentFiles.splice(index, 1);
    currentPreviews.splice(index, 1);

    form.setValue('images', currentFiles, { shouldValidate: true });
    setImagePreviews(currentPreviews);
  };

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

    startDescriptionTransition(async () => {
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
  
  const handleGenerateTitles = () => {
    const { propertyType, location, keyFeatures } = form.getValues();
    if (!propertyType || !location) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a property type and location to generate titles.',
      });
      return;
    }

    startTitleTransition(async () => {
      try {
        const result = await generateTitleAction({
          propertyType,
          location,
          keyFeatures,
        });
        setSuggestedTitles(result.titles);
        setTitlePopoverOpen(true);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'AI Title Generation Failed',
          description:
            error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Title</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input placeholder="e.g., Modern Downtown Apartment" {...field} />
                  </FormControl>
                  <Popover open={titlePopoverOpen} onOpenChange={setTitlePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleGenerateTitles}
                        disabled={isGeneratingTitles}
                        aria-label="Generate titles with AI"
                      >
                         <Sparkles className={`h-4 w-4 ${isGeneratingTitles ? 'animate-spin' : ''}`} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Suggested Titles</h4>
                          <p className="text-sm text-muted-foreground">
                            Click a title to use it.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {suggestedTitles.map((title, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className="h-auto justify-start text-left"
                              onClick={() => {
                                form.setValue('title', title, { shouldValidate: true });
                                setTitlePopoverOpen(false);
                              }}
                            >
                              {title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
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
                  disabled={isEnhancing}
                >
                  <Wand2 className={`mr-2 h-4 w-4 ${isEnhancing ? 'animate-spin' : ''}`} />
                  {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
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
            name="images"
            render={() => (
                <FormItem>
                    <FormLabel>Property Images (up to 5)</FormLabel>
                     <div className="p-6 border-2 border-dashed rounded-lg border-muted-foreground/30 bg-card hover:border-primary">
                        <FormControl>
                            <div className="relative flex flex-col items-center justify-center w-full">
                                <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, etc. (max 5 images)</p>
                                <Input
                                    type="file"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
        
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {imagePreviews.map((src, index) => (
              <div key={src} className="relative group aspect-square">
                <Image
                  src={src}
                  alt={`Image preview ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            ))}
          </div>
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
              </I>
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
  );
}

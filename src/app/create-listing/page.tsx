import { CreateListingForm } from './create-listing-form';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

export default function CreateListingPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="flex items-center gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post Your Ad</h1>
          <p className="text-muted-foreground">
            Fill out the form below to post your property on Rentify.
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <CreateListingForm />
    </div>
  );
}

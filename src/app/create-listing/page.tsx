import { CreateListingForm } from './create-listing-form';

export default function CreateListingPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Listing</h1>
        <p className="text-muted-foreground">
          Fill out the form below to post your property on Rentify.
        </p>
      </div>
      <CreateListingForm />
    </div>
  );
}

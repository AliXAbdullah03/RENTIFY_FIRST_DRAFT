
'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

const t = {
    en: {
        areYouSure: "Are you absolutely sure?",
        cannotBeUndone: "This action cannot be undone. This will permanently delete your listing and remove its data from our servers.",
        cancel: "Cancel",
        continue: "Continue",
        listingDeleted: "Listing Deleted",
        listingDeletedDesc: (title: string) => `The listing "${title}" has been permanently deleted.`,
    },
    tl: {
        areYouSure: "Sigurado ka ba?",
        cannotBeUndone: "Ang aksyon na ito ay hindi na mababawi. Permanenteng tatanggalin nito ang iyong listing at aalisin ang data nito mula sa aming mga server.",
        cancel: "Kanselahin",
        continue: "Magpatuloy",
        listingDeleted: "Listing Tinanggal",
        listingDeletedDesc: (title: string) => `Ang listing na "${title}" ay permanenteng natanggal na.`,
    }
}

interface DeleteListingDialogProps {
  onDelete: () => void;
  listingTitle: string;
}

export function DeleteListingDialog({ onDelete, listingTitle }: DeleteListingDialogProps) {
  const { toast } = useToast();
  const { language } = useAuth();
  const translations = t[language];

  const handleDelete = () => {
    onDelete();
    toast({
      title: translations.listingDeleted,
      description: translations.listingDeletedDesc(listingTitle),
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translations.areYouSure}</AlertDialogTitle>
          <AlertDialogDescription>
            {translations.cannotBeUndone}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations.cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={buttonVariants({ variant: 'destructive' })}
          >
            {translations.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

    
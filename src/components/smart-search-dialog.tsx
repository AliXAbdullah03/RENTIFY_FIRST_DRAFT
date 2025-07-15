
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { smartSearch } from '@/ai/flows/smart-search';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const t = {
    en: {
        smartSearch: "Smart Search",
        smartRentalSearch: "Smart Rental Search",
        dialogDescription: "Describe your ideal rental in your own words. Our AI will find the best matches for you.",
        inquiry: "Inquiry",
        inquiryPlaceholder: "e.g., 'A furnished apartment with 2 bedrooms, good for a small family, under ₱50,000.'",
        queryEmpty: "Query is empty",
        queryEmptyDesc: "Please describe what you are looking for.",
        smartSearchComplete: "Smart Search Complete!",
        smartSearchFailed: "Smart Search Failed",
        smartSearchFailedDesc: "Could not process your request. Please try again.",
        searching: "Searching...",
        findMyRental: "Find My Rental",
    },
    tl: {
        smartSearch: "Smart Search",
        smartRentalSearch: "Matalinong Paghahanap ng Upa",
        dialogDescription: "Ilarawan ang iyong ideal na paupahan sa iyong sariling mga salita. Hahanapin ng aming AI ang pinakamahusay na mga tugma para sa iyo.",
        inquiry: "Pagtatanong",
        inquiryPlaceholder: "hal., 'Isang furnished na apartment na may 2 silid-tulugan, maganda para sa isang maliit na pamilya, na mas mababa sa ₱50,000.'",
        queryEmpty: "Walang laman ang query",
        queryEmptyDesc: "Mangyaring ilarawan kung ano ang iyong hinahanap.",
        smartSearchComplete: "Kumpleto na ang Smart Search!",
        smartSearchFailed: "Nabigo ang Smart Search",
        smartSearchFailedDesc: "Hindi maproseso ang iyong kahilingan. Pakisubukang muli.",
        searching: "Naghahanap...",
        findMyRental: "Hanapin ang Aking Upa",
    }
}

interface SmartSearchDialogProps {
  onSearch: (propertyIds: string[]) => void;
}

export function SmartSearchDialog({ onSearch }: SmartSearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useAuth();
  const translations = t[language];

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        variant: 'destructive',
        title: translations.queryEmpty,
        description: translations.queryEmptyDesc,
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await smartSearch({ query });
      toast({
        title: translations.smartSearchComplete,
        description: result.reasoning,
      });
      onSearch(result.matchedPropertyIds);
      setIsOpen(false);
    } catch (error) {
      console.error('Smart search failed:', error);
      toast({
        variant: 'destructive',
        title: translations.smartSearchFailed,
        description: translations.smartSearchFailedDesc,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          {translations.smartSearch}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.smartRentalSearch}</DialogTitle>
          <DialogDescription>
            {translations.dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="query" className="text-right">
              {translations.inquiry}
            </Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="col-span-3"
              placeholder={translations.inquiryPlaceholder}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.searching}
              </>
            ) : (
              translations.findMyRental
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

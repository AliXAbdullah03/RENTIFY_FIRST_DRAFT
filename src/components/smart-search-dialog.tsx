
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

interface SmartSearchDialogProps {
  onSearch: (propertyIds: string[]) => void;
}

export function SmartSearchDialog({ onSearch }: SmartSearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        variant: 'destructive',
        title: 'Query is empty',
        description: 'Please describe what you are looking for.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await smartSearch({ query });
      toast({
        title: 'Smart Search Complete!',
        description: result.reasoning,
      });
      onSearch(result.matchedPropertyIds);
      setIsOpen(false);
    } catch (error) {
      console.error('Smart search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Smart Search Failed',
        description: 'Could not process your request. Please try again.',
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
          Smart Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Smart Rental Search</DialogTitle>
          <DialogDescription>
            Describe your ideal rental in your own words. Our AI will find the best matches for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="query" className="text-right">
              Inquiry
            </Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 'A furnished apartment with 2 bedrooms, good for a small family, under $2500.'"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Find My Rental'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

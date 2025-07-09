import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, Send } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground">
          Need help? Find answers to your questions here.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>How do I list my property?</AccordionTrigger>
                <AccordionContent>
                You can list your property by navigating to the "Create Listing" page from the sidebar or your profile. Fill out the required details, upload images, and submit the form.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is there a fee for listing?</AccordionTrigger>
                <AccordionContent>
                Currently, listing on Rentify is free! We may introduce premium features in the future, but standard listings will remain free of charge.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>How do I contact a property owner?</AccordionTrigger>
                <AccordionContent>
                On each property details page, you will find a "Contact Host" button. This will allow you to send a message directly to the owner.
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
                <AccordionTrigger>How can I reset my password?</AccordionTrigger>
                <AccordionContent>
                You can reset your password from the Settings page. You will need to enter your current password to set a new one.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
        
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <LifeBuoy className="mr-2 h-5 w-5" />
                        Contact Support
                    </CardTitle>
                    <CardDescription>
                        Can't find an answer? Fill out the form below and we'll get back to you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="e.g., Issue with my listing" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-[120px]"/>
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

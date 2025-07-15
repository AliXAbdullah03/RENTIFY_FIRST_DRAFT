
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const t = {
    en: {
        loading: "Loading...",
        supportCenter: "Support Center",
        getHelp: "Need help? Find answers to your questions here.",
        faq: "Frequently Asked Questions",
        faq1Title: "How do I list my property?",
        faq1Content: "You can list your property by navigating to the \"Create Listing\" page from the sidebar or your profile. Fill out the required details, upload images, and submit the form.",
        faq2Title: "Is there a fee for listing?",
        faq2Content: "Currently, listing on Rentify is free! We may introduce premium features in the future, but standard listings will remain free of charge.",
        faq3Title: "How do I contact a property owner?",
        faq3Content: "On each property details page, you will find a \"Contact Host\" button. This will allow you to send a message directly to the owner.",
        faq4Title: "How can I reset my password?",
        faq4Content: "You can reset your password from the Settings page. You will need to enter your current password to set a new one.",
        contactSupport: "Contact Support",
        contactSupportDesc: "Can't find an answer? Fill out the form below and we'll get back to you.",
        yourName: "Your Name",
        yourNamePlaceholder: "John Doe",
        yourEmail: "Your Email",
        yourEmailPlaceholder: "john.doe@example.com",
        subject: "Subject",
        subjectPlaceholder: "e.g., Issue with my listing",
        message: "Message",
        messagePlaceholder: "Please describe your issue in detail...",
        sendMessage: "Send Message",
    },
    tl: {
        loading: "Naglo-load...",
        supportCenter: "Sentro ng Suporta",
        getHelp: "Kailangan ng tulong? Hanapin ang mga sagot sa iyong mga tanong dito.",
        faq: "Mga Madalas Itanong",
        faq1Title: "Paano ko i-lilista ang aking ari-arian?",
        faq1Content: "Maaari mong i-lista ang iyong ari-arian sa pamamagitan ng pag-navigate sa pahina ng \"Gumawa ng Listing\" mula sa sidebar o sa iyong profile. Punan ang mga kinakailangang detalye, mag-upload ng mga larawan, at isumite ang form.",
        faq2Title: "May bayad ba ang paglilista?",
        faq2Content: "Sa kasalukuyan, ang paglilista sa Rentify ay libre! Maaari kaming magpakilala ng mga premium na feature sa hinaharap, ngunit ang mga karaniwang listing ay mananatiling walang bayad.",
        faq3Title: "Paano ako makikipag-ugnayan sa isang may-ari ng ari-arian?",
        faq3Content: "Sa bawat pahina ng detalye ng ari-arian, makikita mo ang isang pindutan ng \"Makipag-ugnayan sa Host\". Papayagan ka nitong magpadala ng mensahe nang direkta sa may-ari.",
        faq4Title: "Paano ko mai-reset ang aking password?",
        faq4Content: "Maaari mong i-reset ang iyong password mula sa pahina ng Mga Setting. Kailangan mong ipasok ang iyong kasalukuyang password upang magtakda ng bago.",
        contactSupport: "Makipag-ugnayan sa Suporta",
        contactSupportDesc: "Hindi mahanap ang sagot? Punan ang form sa ibaba at babalikan ka namin.",
        yourName: "Iyong Pangalan",
        yourNamePlaceholder: "Juan Dela Cruz",
        yourEmail: "Iyong Email",
        yourEmailPlaceholder: "juan.delacruz@example.com",
        subject: "Paksa",
        subjectPlaceholder: "hal., Problema sa aking listing",
        message: "Mensahe",
        messagePlaceholder: "Mangyaring ilarawan ang iyong isyu nang detalyado...",
        sendMessage: "Ipadala ang Mensahe",
    }
}

export default function SupportPage() {
    const { isAuthenticated, language } = useAuth();
    const router = useRouter();
    const translations = t[language];

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null || isAuthenticated === false) {
        return (
            <div className="mx-auto max-w-4xl space-y-8">
                <div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-5 w-96 mt-2" />
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{translations.supportCenter}</h1>
        <p className="text-muted-foreground">
          {translations.getHelp}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{translations.faq}</h2>
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>{translations.faq1Title}</AccordionTrigger>
                <AccordionContent>
                {translations.faq1Content}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>{translations.faq2Title}</AccordionTrigger>
                <AccordionContent>
                {translations.faq2Content}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>{translations.faq3Title}</AccordionTrigger>
                <AccordionContent>
                {translations.faq3Content}
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
                <AccordionTrigger>{translations.faq4Title}</AccordionTrigger>
                <AccordionContent>
                {translations.faq4Content}
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
        
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <LifeBuoy className="mr-2 h-5 w-5" />
                        {translations.contactSupport}
                    </CardTitle>
                    <CardDescription>
                       {translations.contactSupportDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">{translations.yourName}</Label>
                            <Input id="name" placeholder={translations.yourNamePlaceholder} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">{translations.yourEmail}</Label>
                            <Input id="email" type="email" placeholder={translations.yourEmailPlaceholder} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">{translations.subject}</Label>
                            <Input id="subject" placeholder={translations.subjectPlaceholder} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">{translations.message}</Label>
                            <Textarea id="message" placeholder={translations.messagePlaceholder} className="min-h-[120px]"/>
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            {translations.sendMessage}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    
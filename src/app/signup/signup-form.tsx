
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Building, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useAuth, UserRole } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const t = {
    en: {
        renter: "Renter",
        owner: "Owner",
        createRenterAccount: "Create Renter Account",
        createOwnerAccount: "Create Owner Account",
        findRental: "Sign up to find your next rental property.",
        listProperties: "Join us to list and manage your properties.",
        fullName: "Full Name",
        email: "Email",
        password: "Password",
        createRenterAccountBtn: "Create Renter Account",
        createOwnerAccountBtn: "Create Owner Account",
        alreadyHaveAccount: "Already have an account?",
        logIn: "Log In",
        signupFailedTitle: "Signup Failed",
        signupFailedDesc: "Please fill out all fields.",
        signupSuccessTitle: "Signup Successful!",
        signupSuccessDesc: (name: string, role: string) => `Welcome, ${name}! You're now registered as a ${role}.`
    },
    tl: {
        renter: "Renter",
        owner: "May-ari",
        createRenterAccount: "Gumawa ng Renter Account",
        createOwnerAccount: "Gumawa ng Owner Account",
        findRental: "Mag-sign up para mahanap ang susunod mong uupahang ari-arian.",
        listProperties: "Sumali sa amin para mag-lista at mamahala ng iyong mga ari-arian.",
        fullName: "Buong Pangalan",
        email: "Email",
        password: "Password",
        createRenterAccountBtn: "Gumawa ng Renter Account",
        createOwnerAccountBtn: "Gumawa ng Owner Account",
        alreadyHaveAccount: "May account ka na ba?",
        logIn: "Mag-login",
        signupFailedTitle: "Nabigo ang Pag-signup",
        signupFailedDesc: "Punan ang lahat ng mga field.",
        signupSuccessTitle: "Matagumpay ang Pag-signup!",
        signupSuccessDesc: (name: string, role: string) => `Maligayang pagdating, ${name}! Nakarehistro ka na ngayon bilang isang ${role}.`
    }
}


export function SignupForm() {
  const { toast } = useToast();
  const { signup, language } = useAuth();
  const router = useRouter();

  const translations = t[language];

  const handleSubmit = (role: Exclude<UserRole, 'admin'>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        toast({
            variant: 'destructive',
            title: translations.signupFailedTitle,
            description: translations.signupFailedDesc,
        });
        return;
    }
    
    signup(name, role);

    toast({
      title: translations.signupSuccessTitle,
      description: translations.signupSuccessDesc(name, role),
    });

    router.push('/');
  };

  return (
    <Tabs defaultValue="renter" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="renter">
          <User className="mr-2 h-4 w-4" /> {translations.renter}
        </TabsTrigger>
        <TabsTrigger value="owner">
          <Building className="mr-2 h-4 w-4" /> {translations.owner}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="renter">
        <Card>
          <CardHeader>
            <CardTitle>{translations.createRenterAccount}</CardTitle>
            <CardDescription>
              {translations.findRental}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit('renter')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="renter-name">{translations.fullName}</Label>
                <Input name="name" id="renter-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renter-email">{translations.email}</Label>
                <Input name="email" id="renter-email" type="email" placeholder="renter@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renter-password">{translations.password}</Label>
                <Input name="password" id="renter-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {translations.createRenterAccountBtn}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p>{translations.alreadyHaveAccount}</p>
            <Button variant="link" className="p-0" asChild>
                <Link href="/login">{translations.logIn}</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="owner">
        <Card>
          <CardHeader>
            <CardTitle>{translations.createOwnerAccount}</CardTitle>
            <CardDescription>
              {translations.listProperties}
            </CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleSubmit('owner')} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="owner-name">{translations.fullName}</Label>
                <Input name="name" id="owner-name" placeholder="Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-email">{translations.email}</Label>
                <Input name="email" id="owner-email" type="email" placeholder="owner@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-password">{translations.password}</Label>
                <Input name="password" id="owner-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {translations.createOwnerAccountBtn}
              </Button>
            </form>
          </CardContent>
           <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p>{translations.alreadyHaveAccount}</p>
            <Button variant="link" className="p-0" asChild>
                <Link href="/login">{translations.logIn}</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

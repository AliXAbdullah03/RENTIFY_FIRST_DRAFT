
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Building, User, Info } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import React from 'react';
import { useAuth, UserRole } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const t = {
    en: {
        demoLogin: "Demo Login",
        demoRenter: "<strong>Renter:</strong> Use any email starting with 'renter' and any password.",
        demoOwner: "<strong>Owner:</strong> Use any email starting with 'owner' and any password.",
        demoAdmin: "<strong>Admin:</strong> email: <strong>admin@rentify.com</strong>, password: <strong>adminpassword</strong>",
        renter: "Renter",
        owner: "Owner",
        renterLogin: "Renter Login",
        ownerLogin: "Owner Login",
        accessSavedProperties: "Access your saved properties and manage your rentals.",
        manageListings: "Manage your listings and view renter applications.",
        email: "Email",
        password: "Password",
        loginAsRenter: "Login as Renter",
        loginAsOwner: "Login as Owner",
        noAccount: "Don't have an account?",
        signUpAsRenter: "Sign up as a Renter",
        listProperty: "Looking to list your property?",
        signUpAsOwner: "Sign up as an Owner",
        loginSuccessTitle: "Login Successful",
        loginSuccessDesc: (role: string) => `Welcome! You are now logged in as a ${role}.`,
        loginFailedTitle: "Login Failed",
        loginFailedDesc: "Invalid credentials. Please try again.",
    },
    tl: {
        demoLogin: "Demo sa Pag-login",
        demoRenter: "<strong>Renter:</strong> Gumamit ng anumang email na nagsisimula sa 'renter' at anumang password.",
        demoOwner: "<strong>Owner:</strong> Gumamit ng anumang email na nagsisimula sa 'owner' at anumang password.",
        demoAdmin: "<strong>Admin:</strong> email: <strong>admin@rentify.com</strong>, password: <strong>adminpassword</strong>",
        renter: "Renter",
        owner: "May-ari",
        renterLogin: "Login ng Renter",
        ownerLogin: "Login ng May-ari",
        accessSavedProperties: "I-access ang iyong mga naka-save na ari-arian at pamahalaan ang iyong mga upa.",
        manageListings: "Pamahalaan ang iyong mga listing at tingnan ang mga aplikasyon ng umuupa.",
        email: "Email",
        password: "Password",
        loginAsRenter: "Mag-login bilang Renter",
        loginAsOwner: "Mag-login bilang May-ari",
        noAccount: "Wala ka pang account?",
        signUpAsRenter: "Mag-sign up bilang Renter",
        listProperty: "Naghahanap ka bang mag-lista ng iyong ari-arian?",
        signUpAsOwner: "Mag-sign up bilang May-ari",
        loginSuccessTitle: "Matagumpay ang Pag-login",
        loginSuccessDesc: (role: string) => `Maligayang pagdating! Naka-log in ka na ngayon bilang isang ${role}.`,
        loginFailedTitle: "Nabigo ang Pag-login",
        loginFailedDesc: "Di-wasto ang mga kredensyal. Pakisubukang muli.",
    }
}


export function LoginForm() {
  const { toast } = useToast();
  const { login, language } = useAuth();
  const router = useRouter();

  const translations = t[language];

  const handleSubmit = (role: Exclude<UserRole, 'admin'>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let loginRole: UserRole | null = null;
    let userName = 'User';

    if (email === 'admin@rentify.com' && password === 'adminpassword') {
      loginRole = 'admin';
      userName = 'Admin';
    } else if (role === 'renter' && email.startsWith('renter')) {
      loginRole = 'renter';
      userName = 'Renter';
    } else if (role === 'owner' && email.startsWith('owner')) {
        loginRole = 'owner';
        userName = 'Property Owner';
    }

    if (loginRole) {
      login(userName, loginRole);
      toast({
        title: translations.loginSuccessTitle,
        description: translations.loginSuccessDesc(loginRole),
      });
      router.push('/');
    } else {
      toast({
          variant: 'destructive',
          title: translations.loginFailedTitle,
          description: translations.loginFailedDesc,
      });
    }
  };

  return (
    <>
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>{translations.demoLogin}</AlertTitle>
        <AlertDescription>
            <ul className="list-disc pl-5 space-y-1">
                <li dangerouslySetInnerHTML={{ __html: translations.demoRenter }} />
                <li dangerouslySetInnerHTML={{ __html: translations.demoOwner }} />
                <li dangerouslySetInnerHTML={{ __html: translations.demoAdmin }} />
            </ul>
        </AlertDescription>
      </Alert>
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
              <CardTitle>{translations.renterLogin}</CardTitle>
              <CardDescription>
                {translations.accessSavedProperties}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('renter')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="renter-email">{translations.email}</Label>
                  <Input name="email" id="renter-email" type="email" placeholder="renter@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renter-password">{translations.password}</Label>
                  <Input name="password" id="renter-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  {translations.loginAsRenter}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2 text-sm">
              <p>{translations.noAccount}</p>
              <Button variant="link" className="p-0" asChild>
                  <Link href="/signup">{translations.signUpAsRenter}</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="owner">
          <Card>
            <CardHeader>
              <CardTitle>{translations.ownerLogin}</CardTitle>
              <CardDescription>
                {translations.manageListings}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('owner')} className="space-y-4">
                  <div className="space-y-2">
                  <Label htmlFor="owner-email">{translations.email}</Label>
                  <Input name="email" id="owner-email" type="email" placeholder="owner@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-password">{translations.password}</Label>
                  <Input name="password" id="owner-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  {translations.loginAsOwner}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2 text-sm">
              <p>{translations.listProperty}</p>
              <Button variant="link" className="p-0" asChild>
                  <Link href="/signup">{translations.signUpAsOwner}</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

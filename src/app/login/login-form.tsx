
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Building, User, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import React from 'react';

type Role = 'Renter' | 'Owner' | 'Admin';

export function LoginForm() {
  const { toast } = useToast();

  const handleSubmit = (role: Role) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let loginRole = role;

    // Check for admin credentials
    if (email === 'admin@rentify.com' && password === 'adminpassword') {
      loginRole = 'Admin';
    } else if (role === 'Renter' && email === 'renter' && password === '123') {
      loginRole = 'Renter';
    } else if (role === 'Owner' && email.startsWith('owner')) {
        loginRole = 'Owner';
    }


    console.log(`Logging in as ${loginRole}`);
    toast({
      title: 'Login Successful (Demo)',
      description: `You have successfully logged in as a ${loginRole}.`,
    });
    // In a real app, you would redirect here, e.g., router.push('/')
  };

  return (
    <>
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Demo Login</AlertTitle>
        <AlertDescription>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Renter:</strong> email: <strong>renter</strong>, password: <strong>123</strong></li>
                <li><strong>Owner:</strong> Use any email starting with 'owner' and any password.</li>
                <li><strong>Admin:</strong> email: <strong>admin@rentify.com</strong>, password: <strong>adminpassword</strong></li>
            </ul>
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="renter" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="renter">
            <User className="mr-2 h-4 w-4" /> Renter
          </TabsTrigger>
          <TabsTrigger value="owner">
            <Building className="mr-2 h-4 w-4" /> Owner
          </TabsTrigger>
        </TabsList>
        <TabsContent value="renter">
          <Card>
            <CardHeader>
              <CardTitle>Renter Login</CardTitle>
              <CardDescription>
                Access your saved properties and manage your rentals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('Renter')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="renter-email">Email</Label>
                  <Input name="email" id="renter-email" type="email" placeholder="renter" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renter-password">Password</Label>
                  <Input name="password" id="renter-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login as Renter
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2 text-sm">
              <p>Don't have an account?</p>
              <Button variant="link" className="p-0" asChild>
                  <Link href="#">Sign up as a Renter</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="owner">
          <Card>
            <CardHeader>
              <CardTitle>Owner Login</CardTitle>
              <CardDescription>
                Manage your listings and view renter applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('Owner')} className="space-y-4">
                  <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input name="email" id="owner-email" type="email" placeholder="owner@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-password">Password</Label>
                  <Input name="password" id="owner-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login as Owner
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2 text-sm">
              <p>Looking to list your property?</p>
              <Button variant="link" className="p-0" asChild>
                  <Link href="#">Sign up as an Owner</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

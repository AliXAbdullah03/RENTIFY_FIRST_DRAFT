
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

export function SignupForm() {
  const { toast } = useToast();
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (role: Exclude<UserRole, 'admin'>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!name || !email || !password) {
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: 'Please fill out all fields.',
        });
        return;
    }
    
    // In a real app, you would have more complex logic here.
    // For the prototype, we just sign the user up directly.
    signup(name, role);

    toast({
      title: 'Signup Successful!',
      description: `Welcome, ${name}! You're now registered as a ${role}.`,
    });

    router.push('/');
  };

  return (
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
            <CardTitle>Create Renter Account</CardTitle>
            <CardDescription>
              Sign up to find your next rental property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit('renter')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="renter-name">Full Name</Label>
                <Input name="name" id="renter-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renter-email">Email</Label>
                <Input name="email" id="renter-email" type="email" placeholder="renter@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renter-password">Password</Label>
                <Input name="password" id="renter-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Renter Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p>Already have an account?</p>
            <Button variant="link" className="p-0" asChild>
                <Link href="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="owner">
        <Card>
          <CardHeader>
            <CardTitle>Create Owner Account</CardTitle>
            <CardDescription>
              Join us to list and manage your properties.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleSubmit('owner')} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="owner-name">Full Name</Label>
                <Input name="name" id="owner-name" placeholder="Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-email">Email</Label>
                <Input name="email" id="owner-email" type="email" placeholder="owner@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-password">Password</Label>
                <Input name="password" id="owner-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Owner Account
              </Button>
            </form>
          </CardContent>
           <CardFooter className="flex flex-col items-center space-y-2 text-sm">
            <p>Already have an account?</p>
            <Button variant="link" className="p-0" asChild>
                <Link href="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

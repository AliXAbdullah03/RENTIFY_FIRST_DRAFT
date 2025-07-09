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

export function LoginForm() {
  const { toast } = useToast();

  const handleSubmit = (role: 'Tenant' | 'Owner') => (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Logging in as ${role}`);
    toast({
      title: 'Login Successful (Demo)',
      description: `You have successfully logged in as a ${role}.`,
    });
    // In a real app, you would redirect here, e.g., router.push('/')
  };

  return (
    <>
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Demo Login</AlertTitle>
        <AlertDescription>
          You can use any email and password to proceed. This is for demonstration purposes only.
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="tenant" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tenant">
            <User className="mr-2 h-4 w-4" /> Tenant
          </TabsTrigger>
          <TabsTrigger value="owner">
            <Building className="mr-2 h-4 w-4" /> Owner
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tenant">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Login</CardTitle>
              <CardDescription>
                Access your saved properties and manage your rentals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('Tenant')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant-email">Email</Label>
                  <Input id="tenant-email" type="email" placeholder="tenant@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenant-password">Password</Label>
                  <Input id="tenant-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login as Tenant
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2 text-sm">
              <p>Don't have an account?</p>
              <Button variant="link" className="p-0" asChild>
                  <Link href="#">Sign up as a Tenant</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="owner">
          <Card>
            <CardHeader>
              <CardTitle>Owner Login</CardTitle>
              <CardDescription>
                Manage your listings and view tenant applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit('Owner')} className="space-y-4">
                  <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input id="owner-email" type="email" placeholder="owner@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-password">Password</Label>
                  <Input id="owner-password" type="password" required />
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

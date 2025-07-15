
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Palette, Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const t = {
    en: {
        loading: "Loading...",
        settings: "Settings",
        manageSettings: "Manage your account settings and preferences.",
        profileInfo: "Profile Information",
        updateDetails: "Update your personal details here.",
        fullName: "Full Name",
        emailAddress: "Email Address",
        saveChanges: "Save Changes",
        changePassword: "Change Password",
        passwordSecurity: "For your security, we recommend using a strong password.",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmNewPassword: "Confirm New Password",
        updatePassword: "Update Password",
        notifications: "Notifications",
        manageNotifications: "Manage how you receive notifications from us.",
        emailNotifications: "Email Notifications",
        emailNotificationsDesc: "Receive updates about your listings and messages.",
        pushNotifications: "Push Notifications",
        pushNotificationsDesc: "Get real-time alerts on your devices.",
        appearance: "Appearance",
        customizeAppearance: "Customize the look and feel of the app.",
        darkMode: "Dark Mode",
        darkModeDesc: "Toggle between light and dark themes.",
        themeSwitchingSoon: "Theme switching will be implemented in a future update."
    },
    tl: {
        loading: "Naglo-load...",
        settings: "Mga Setting",
        manageSettings: "Pamahalaan ang mga setting at preference ng iyong account.",
        profileInfo: "Impormasyon ng Profile",
        updateDetails: "I-update ang iyong mga personal na detalye dito.",
        fullName: "Buong Pangalan",
        emailAddress: "Email Address",
        saveChanges: "I-save ang mga Pagbabago",
        changePassword: "Palitan ang Password",
        passwordSecurity: "Para sa iyong seguridad, inirerekomenda namin ang paggamit ng isang malakas na password.",
        currentPassword: "Kasalukuyang Password",
        newPassword: "Bagong Password",
        confirmNewPassword: "Kumpirmahin ang Bagong Password",
        updatePassword: "I-update ang Password",
        notifications: "Mga Abiso",
        manageNotifications: "Pamahalaan kung paano ka makakatanggap ng mga abiso mula sa amin.",
        emailNotifications: "Mga Abiso sa Email",
        emailNotificationsDesc: "Makatanggap ng mga update tungkol sa iyong mga listing at mensahe.",
        pushNotifications: "Mga Push Notification",
        pushNotificationsDesc: "Makatanggap ng mga real-time na alerto sa iyong mga device.",
        appearance: "Hitsura",
        customizeAppearance: "I-customize ang itsura at pakiramdam ng app.",
        darkMode: "Dark Mode",
        darkModeDesc: "Magpalit sa pagitan ng light at dark na tema.",
        themeSwitchingSoon: "Ang pagpapalit ng tema ay ipapatupad sa isang update sa hinaharap."
    }
}

export default function SettingsPage() {
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
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-5 w-80 mt-2" />
                </div>
                <Separator />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-52 w-full" />
             </div>
        )
    }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{translations.settings}</h1>
        <p className="text-muted-foreground">
          {translations.manageSettings}
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            {translations.profileInfo}
          </CardTitle>
          <CardDescription>{translations.updateDetails}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.fullName}</Label>
              <Input id="name" defaultValue="Ali Abdullah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{translations.emailAddress}</Label>
              <Input id="email" type="email" defaultValue="ali.abdullah@gmail.com" disabled />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>{translations.saveChanges}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            {translations.changePassword}
          </CardTitle>
          <CardDescription>{translations.passwordSecurity}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">{translations.currentPassword}</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">{translations.newPassword}</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{translations.confirmNewPassword}</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>{translations.updatePassword}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            {translations.notifications}
          </CardTitle>
          <CardDescription>{translations.manageNotifications}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <Label htmlFor="email-notifications" className="font-medium">{translations.emailNotifications}</Label>
                <p className="text-sm text-muted-foreground">{translations.emailNotificationsDesc}</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <Label htmlFor="push-notifications" className="font-medium">{translations.pushNotifications}</Label>
                <p className="text-sm text-muted-foreground">{translations.pushNotificationsDesc}</p>
            </div>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            {translations.appearance}
          </CardTitle>
          <CardDescription>{translations.customizeAppearance}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
             <div>
                <Label htmlFor="dark-mode" className="font-medium">{translations.darkMode}</Label>
                <p className="text-sm text-muted-foreground">{translations.darkModeDesc}</p>
            </div>
            <Switch id="dark-mode" defaultChecked disabled/>
            
          </div>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">{translations.themeSwitchingSoon}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

    
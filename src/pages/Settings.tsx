import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import BusinessProfileSection from "@/components/settings/BusinessProfileSection";
import ThemeBrandingSection from "@/components/settings/ThemeBrandingSection";
import IntegrationsSection from "@/components/settings/IntegrationsSection";
import UserRolesSection from "@/components/settings/UserRolesSection";
import BusinessHoursSection from "@/components/settings/BusinessHoursSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const { saveSettings } = useSettings();

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings & Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Configure your AI assistant and integrations
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={saveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <BusinessProfileSection />
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <ThemeBrandingSection />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <IntegrationsSection />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserRolesSection />
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <BusinessHoursSection />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

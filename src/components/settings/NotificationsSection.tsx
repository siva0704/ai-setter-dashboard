import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";

export default function NotificationsSection() {
  const { notifications, updateNotifications } = useSettings();

  const updateNotification = (key: string, value: any) => {
    updateNotifications({ [key]: value });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Notifications & Reminders</CardTitle>
        <CardDescription>Configure how and when to send reminders to clients</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send appointment reminders via email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => updateNotification('email', checked)}
            />
          </div>
          {notifications.email && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="emailTime">Send reminder</Label>
              <Select
                value={notifications.emailTime}
                onValueChange={(value) => updateNotification('emailTime', value)}
              >
                <SelectTrigger id="emailTime">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 hours before</SelectItem>
                  <SelectItem value="12h">12 hours before</SelectItem>
                  <SelectItem value="6h">6 hours before</SelectItem>
                  <SelectItem value="1h">1 hour before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Send text message reminders
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => updateNotification('sms', checked)}
            />
          </div>
          {notifications.sms && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="smsTime">Send reminder</Label>
              <Select
                value={notifications.smsTime}
                onValueChange={(value) => updateNotification('smsTime', value)}
              >
                <SelectTrigger id="smsTime">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 hours before</SelectItem>
                  <SelectItem value="12h">12 hours before</SelectItem>
                  <SelectItem value="6h">6 hours before</SelectItem>
                  <SelectItem value="1h">1 hour before</SelectItem>
                  <SelectItem value="30m">30 minutes before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>WhatsApp Messages</Label>
              <p className="text-sm text-muted-foreground">
                Send reminders via WhatsApp
              </p>
            </div>
            <Switch
              checked={notifications.whatsapp}
              onCheckedChange={(checked) => updateNotification('whatsapp', checked)}
            />
          </div>
          {notifications.whatsapp && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="whatsappTime">Send reminder</Label>
              <Select
                value={notifications.whatsappTime}
                onValueChange={(value) => updateNotification('whatsappTime', value)}
              >
                <SelectTrigger id="whatsappTime">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 hours before</SelectItem>
                  <SelectItem value="12h">12 hours before</SelectItem>
                  <SelectItem value="6h">6 hours before</SelectItem>
                  <SelectItem value="2h">2 hours before</SelectItem>
                  <SelectItem value="1h">1 hour before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

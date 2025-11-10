import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Zap, Mail, Bell, Shield, CreditCard } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings & Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Configure your AI assistant and integrations
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic configuration for your appointment system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Your Clinic Name" defaultValue="AI Medical Clinic" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" placeholder="contact@clinic.com" defaultValue="contact@clinic.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" placeholder="UTC-5" defaultValue="America/New_York" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Assistant Configuration</CardTitle>
              <CardDescription>
                Customize your AI's behavior and responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-booking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to automatically book appointments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Smart Rescheduling</Label>
                  <p className="text-sm text-muted-foreground">
                    AI can suggest alternative times
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sentiment Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Detect and respond to client emotions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Multi-language Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto-detect and respond in client's language
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates for new appointments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get text messages for urgent matters
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive daily performance reports
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with your favorite tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Gmail</p>
                    <p className="text-xs text-muted-foreground">Email integration</p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Zapier</p>
                    <p className="text-xs text-muted-foreground">Automation</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-xs text-muted-foreground">Payments</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium">Twilio</p>
                    <p className="text-xs text-muted-foreground">SMS service</p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Two-factor auth</span>
                  <Badge className="bg-success/10 text-success border-success/20">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Data encryption</span>
                  <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">HIPAA compliant</span>
                  <Badge className="bg-success/10 text-success border-success/20">Certified</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

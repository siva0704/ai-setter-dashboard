import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function BusinessProfileSection() {
  const { businessProfile, updateBusinessProfile } = useSettings();
  const [errors, setErrors] = useState({ companyName: '', email: '' });

  const validateField = (field: string, value: string) => {
    if (field === 'companyName' && !value.trim()) {
      setErrors(prev => ({ ...prev, companyName: 'Company name is required' }));
    } else if (field === 'companyName') {
      setErrors(prev => ({ ...prev, companyName: '' }));
    }

    if (field === 'email' && !value.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    } else if (field === 'email') {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBusinessProfile({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>Manage your company information and branding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
              {businessProfile.logo ? (
                <img src={businessProfile.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <Label htmlFor="logo" className="cursor-pointer text-sm text-primary hover:underline">
              Upload Logo
            </Label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={businessProfile.companyName}
                onChange={(e) => {
                  updateBusinessProfile({ companyName: e.target.value });
                  validateField('companyName', e.target.value);
                }}
                onBlur={(e) => validateField('companyName', e.target.value)}
                className={errors.companyName ? 'border-destructive' : ''}
              />
              {errors.companyName && (
                <p className="text-xs text-destructive">{errors.companyName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email *</Label>
            <Input
              id="email"
              type="email"
              value={businessProfile.email}
              onChange={(e) => {
                updateBusinessProfile({ email: e.target.value });
                validateField('email', e.target.value);
              }}
              onBlur={(e) => validateField('email', e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={businessProfile.phone}
              onChange={(e) => updateBusinessProfile({ phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={businessProfile.timezone}
              onValueChange={(value) => updateBusinessProfile({ timezone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={businessProfile.language}
              onValueChange={(value) => updateBusinessProfile({ language: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

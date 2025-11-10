import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ThemeBrandingSection() {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState("#6366f1");

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Theme & Branding</CardTitle>
        <CardDescription>Customize the look and feel of your platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Theme Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark mode
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accentColor">Primary Accent Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              id="accentColor"
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#6366f1"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This color will be used for buttons, links, and highlights
          </p>
        </div>

        <div className="space-y-2">
          <Label>Brand Preview</Label>
          <div className="p-6 rounded-lg border border-border bg-muted/30 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <p className="font-medium">AI Medical Clinic</p>
                <p className="text-sm text-muted-foreground">Your branding preview</p>
              </div>
            </div>
            <Button style={{ backgroundColor: accentColor }} className="text-white">
              Sample Button
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

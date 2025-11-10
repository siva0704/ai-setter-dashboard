import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";
import { Calendar, Users, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";

const iconMap: { [key: string]: any } = {
  Calendar,
  Users,
  CreditCard,
};

export default function IntegrationsSection() {
  const { integrations, toggleIntegration } = useSettings();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (id: string) => {
    setLoadingId(id);
    await toggleIntegration(id);
    setLoadingId(null);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect your favorite tools and services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => {
          const Icon = iconMap[integration.icon];
          const isLoading = loadingId === integration.id;

          return (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {integration.connected ? 'Connected and syncing' : 'Not connected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected && !isLoading && (
                  <Badge className="bg-success/10 text-success border-success/20">
                    Connected
                  </Badge>
                )}
                <Button
                  variant={integration.connected ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => handleToggle(integration.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {integration.connected ? 'Disconnecting...' : 'Connecting...'}
                    </>
                  ) : integration.connected ? (
                    'Disconnect'
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

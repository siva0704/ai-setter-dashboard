import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Mail, Phone, Calendar, TrendingUp } from "lucide-react";
import { useAppActions } from "@/contexts/AppActionsContext";
import { useState } from "react";

const providers = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    specialty: "General Practice",
    status: "active",
    utilization: 92,
    appointments: 128,
    rating: 4.9,
    email: "sarah.smith@clinic.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Dr. Michael Davis",
    specialty: "Cardiology",
    status: "active",
    utilization: 88,
    appointments: 115,
    rating: 4.8,
    email: "michael.davis@clinic.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialty: "Pediatrics",
    status: "active",
    utilization: 85,
    appointments: 142,
    rating: 5.0,
    email: "emily.johnson@clinic.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    status: "inactive",
    utilization: 0,
    appointments: 0,
    rating: 4.7,
    email: "james.wilson@clinic.com",
    phone: "+1 (555) 456-7890",
  },
];

export default function Providers() {
  const { handleAddProvider, handleViewSchedule, handleEditProvider } = useAppActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    await handleAddProvider();
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Providers Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your healthcare providers and their schedules
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={handleAdd} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? 'Opening...' : 'Add Provider'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground mt-1">
              Total Providers
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground mt-1">
              Active Today
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">88.3%</div>
            <div className="text-sm text-muted-foreground mt-1">
              Avg. Utilization
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">4.85</div>
            <div className="text-sm text-muted-foreground mt-1">
              Avg. Rating
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {provider.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    provider.status === "active"
                      ? "bg-success/10 text-success border-success/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {provider.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{provider.phone}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Utilization
                    </div>
                    <div className="text-lg font-semibold">{provider.utilization}%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      Appointments
                    </div>
                    <div className="text-lg font-semibold">{provider.appointments}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Rating</div>
                    <div className="text-lg font-semibold">{provider.rating}/5.0</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => handleViewSchedule(provider.id)}>
                    View Schedule
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleEditProvider(provider.id)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

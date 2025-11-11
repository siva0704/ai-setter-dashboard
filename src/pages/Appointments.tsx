import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppActions } from "@/contexts/AppActionsContext";
import { useState } from "react";

const appointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    provider: "Dr. Smith",
    time: "09:00 AM",
    date: "Today",
    status: "confirmed",
    type: "Consultation",
  },
  {
    id: 2,
    client: "Michael Chen",
    provider: "Dr. Davis",
    time: "10:30 AM",
    date: "Today",
    status: "pending",
    type: "Follow-up",
  },
  {
    id: 3,
    client: "Emily Brown",
    provider: "Dr. Smith",
    time: "02:00 PM",
    date: "Today",
    status: "confirmed",
    type: "New Patient",
  },
  {
    id: 4,
    client: "David Wilson",
    provider: "Dr. Johnson",
    time: "03:30 PM",
    date: "Tomorrow",
    status: "confirmed",
    type: "Consultation",
  },
  {
    id: 5,
    client: "Lisa Anderson",
    provider: "Dr. Davis",
    time: "11:00 AM",
    date: "Tomorrow",
    status: "cancelled",
    type: "Follow-up",
  },
];

const statusColors = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Appointments() {
  const { handleNewAppointment, handleViewAppointment, handleFilterAppointments, handleCalendarView } = useAppActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleNew = async () => {
    setIsLoading(true);
    await handleNewAppointment();
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all appointments
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={handleNew} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? 'Opening...' : 'New Appointment'}
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search appointments..." className="pl-9" />
        </div>
        <Button variant="outline" onClick={handleFilterAppointments}>
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button variant="outline" onClick={handleCalendarView}>
          <Calendar className="w-4 h-4 mr-2" />
          Calendar View
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{appointment.client}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {appointment.provider}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {appointment.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {appointment.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize ${statusColors[appointment.status as keyof typeof statusColors]}`}
                  >
                    {appointment.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleViewAppointment(appointment.id)}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

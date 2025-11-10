import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function BusinessHoursSection() {
  const { businessHours, updateBusinessHours, services, addService, updateService, deleteService } = useSettings();
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({ name: '', duration: 30, price: 0, buffer: 5 });

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const handleDayToggle = (day: string) => {
    updateBusinessHours({
      ...businessHours,
      [day]: { ...businessHours[day], enabled: !businessHours[day].enabled },
    });
  };

  const handleTimeChange = (day: string, field: 'start' | 'end', value: string) => {
    updateBusinessHours({
      ...businessHours,
      [day]: { ...businessHours[day], [field]: value },
    });
  };

  const handleOpenServiceDialog = (service?: any) => {
    if (service) {
      setEditingService(service);
      setServiceForm({ name: service.name, duration: service.duration, price: service.price, buffer: service.buffer });
    } else {
      setEditingService(null);
      setServiceForm({ name: '', duration: 30, price: 0, buffer: 5 });
    }
    setIsServiceDialogOpen(true);
  };

  const handleServiceSubmit = () => {
    if (editingService) {
      updateService(editingService.id, serviceForm);
    } else {
      addService(serviceForm);
    }
    setIsServiceDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
            <CardDescription>Set your operating hours for each day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {days.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3 w-32">
                  <Switch
                    checked={businessHours[key].enabled}
                    onCheckedChange={() => handleDayToggle(key)}
                  />
                  <Label className="cursor-pointer">{label}</Label>
                </div>
                {businessHours[key].enabled && (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={businessHours[key].start}
                      onChange={(e) => handleTimeChange(key, 'start', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={businessHours[key].end}
                      onChange={(e) => handleTimeChange(key, 'end', e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Service Types</CardTitle>
              <CardDescription>Manage your service offerings</CardDescription>
            </div>
            <Button onClick={() => handleOpenServiceDialog()} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration} min · ${service.price} · {service.buffer} min buffer
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenServiceDialog(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteService(service.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer">Buffer (min)</Label>
                <Input
                  id="buffer"
                  type="number"
                  value={serviceForm.buffer}
                  onChange={(e) => setServiceForm({ ...serviceForm, buffer: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleServiceSubmit}>
              {editingService ? 'Update' : 'Add'} Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

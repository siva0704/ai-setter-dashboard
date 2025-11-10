import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface BusinessProfile {
  companyName: string;
  logo: string;
  timezone: string;
  language: string;
  email: string;
  phone: string;
}

interface Integration {
  id: string;
  name: string;
  connected: boolean;
  icon: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'viewer';
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  buffer: number;
}

interface BusinessHours {
  [key: string]: { enabled: boolean; start: string; end: string };
}

interface SettingsContextType {
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  integrations: Integration[];
  toggleIntegration: (id: string) => Promise<void>;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  businessHours: BusinessHours;
  updateBusinessHours: (hours: BusinessHours) => void;
  saveSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    companyName: 'AI Medical Clinic',
    logo: '',
    timezone: 'America/New_York',
    language: 'en',
    email: 'contact@clinic.com',
    phone: '+1 (555) 123-4567',
  });

  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'google-calendar', name: 'Google Calendar', connected: false, icon: 'Calendar' },
    { id: 'outlook', name: 'Outlook Calendar', connected: false, icon: 'Calendar' },
    { id: 'crm', name: 'CRM System', connected: false, icon: 'Users' },
    { id: 'payment', name: 'Payment Gateway', connected: false, icon: 'CreditCard' },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Admin', email: 'john@clinic.com', role: 'admin' },
    { id: '2', name: 'Sarah Staff', email: 'sarah@clinic.com', role: 'staff' },
    { id: '3', name: 'Mike Viewer', email: 'mike@clinic.com', role: 'viewer' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'General Consultation', duration: 30, price: 150, buffer: 10 },
    { id: '2', name: 'Follow-up Visit', duration: 15, price: 75, buffer: 5 },
    { id: '3', name: 'Annual Check-up', duration: 60, price: 300, buffer: 15 },
  ]);

  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '10:00', end: '14:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' },
  });

  const updateBusinessProfile = (profile: Partial<BusinessProfile>) => {
    setBusinessProfile(prev => ({ ...prev, ...profile }));
  };

  const toggleIntegration = async (id: string) => {
    toast.loading('Connecting...', { id: 'integration' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast.success(
      integration?.connected ? 'Disconnected successfully' : 'Connected successfully',
      { id: 'integration' }
    );
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
    toast.success('User added successfully');
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...user } : u))
    );
    toast.success('User updated successfully');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User deleted successfully');
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
    toast.success('Service added successfully');
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, ...service } : s))
    );
    toast.success('Service updated successfully');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast.success('Service deleted successfully');
  };

  const updateBusinessHours = (hours: BusinessHours) => {
    setBusinessHours(hours);
  };

  const saveSettings = async () => {
    toast.loading('Saving settings...', { id: 'save' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Settings saved successfully', { id: 'save' });
  };

  return (
    <SettingsContext.Provider
      value={{
        businessProfile,
        updateBusinessProfile,
        integrations,
        toggleIntegration,
        users,
        addUser,
        updateUser,
        deleteUser,
        services,
        addService,
        updateService,
        deleteService,
        businessHours,
        updateBusinessHours,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

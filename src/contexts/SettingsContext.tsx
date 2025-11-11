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

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  emailTime: string;
  smsTime: string;
  whatsappTime: string;
}

interface SettingsContextType {
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  integrations: Integration[];
  toggleIntegration: (id: string) => Promise<void>;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  businessHours: BusinessHours;
  updateBusinessHours: (hours: BusinessHours) => void;
  notifications: NotificationSettings;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  saveSettings: () => Promise<void>;
  isFormValid: boolean;
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

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: true,
    whatsapp: false,
    emailTime: '24h',
    smsTime: '1h',
    whatsappTime: '2h',
  });

  // Form validation
  const isFormValid = 
    businessProfile.companyName.trim().length > 0 &&
    businessProfile.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessProfile.email);

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

  const addUser = async (user: Omit<User, 'id'>) => {
    toast.loading('Adding user...', { id: 'user-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = { ...user, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
    toast.success('User added successfully', { id: 'user-action' });
  };

  const updateUser = async (id: string, user: Partial<User>) => {
    toast.loading('Updating user...', { id: 'user-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...user } : u))
    );
    toast.success('User updated successfully', { id: 'user-action' });
  };

  const deleteUser = async (id: string) => {
    toast.loading('Deleting user...', { id: 'user-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User deleted successfully', { id: 'user-action' });
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    toast.loading('Adding service...', { id: 'service-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
    toast.success('Service added successfully', { id: 'service-action' });
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    toast.loading('Updating service...', { id: 'service-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, ...service } : s))
    );
    toast.success('Service updated successfully', { id: 'service-action' });
  };

  const deleteService = async (id: string) => {
    toast.loading('Deleting service...', { id: 'service-action' });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setServices(prev => prev.filter(s => s.id !== id));
    toast.success('Service deleted successfully', { id: 'service-action' });
  };

  const updateBusinessHours = (hours: BusinessHours) => {
    setBusinessHours(hours);
  };

  const updateNotifications = (updatedNotifications: Partial<NotificationSettings>) => {
    setNotifications(prev => ({ ...prev, ...updatedNotifications }));
  };

  const saveSettings = async () => {
    if (!isFormValid) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    toast.loading('Saving settings...', { id: 'save' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
        notifications,
        updateNotifications,
        saveSettings,
        isFormValid,
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

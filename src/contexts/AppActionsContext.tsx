import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AppActionsContextType {
  // Dashboard actions
  handleAddAppointment: () => void;
  handleViewAIDetails: () => void;
  handleDateFilter: () => void;
  
  // Appointments actions
  handleNewAppointment: () => Promise<void>;
  handleViewAppointment: (id: number) => void;
  handleFilterAppointments: () => void;
  handleCalendarView: () => void;
  
  // Conversations actions
  handleSelectConversation: (id: number) => void;
  
  // Providers actions
  handleAddProvider: () => Promise<void>;
  handleViewSchedule: (id: number) => void;
  handleEditProvider: (id: number) => void;
  
  // Analytics actions
  handleExportReport: () => Promise<void>;
  handleDateRangeFilter: () => void;
}

const AppActionsContext = createContext<AppActionsContextType | undefined>(undefined);

export const AppActionsProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // Dashboard actions
  const handleAddAppointment = () => {
    navigate('/appointments');
    toast.success('Redirected to appointments page');
  };

  const handleViewAIDetails = () => {
    toast.info('AI Insights panel opening...', { duration: 2000 });
    // In a real app, this would open a modal or navigate to a details page
  };

  const handleDateFilter = () => {
    toast.info('Date filter applied', { duration: 2000 });
    // In a real app, this would update the dashboard data
  };

  // Appointments actions
  const handleNewAppointment = async () => {
    toast.loading('Opening appointment form...', { id: 'new-appointment' });
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success('Appointment form ready', { id: 'new-appointment' });
    // In a real app, this would open a modal with a form
  };

  const handleViewAppointment = (id: number) => {
    toast.info(`Viewing appointment #${id}`, { duration: 2000 });
    // In a real app, this would open appointment details
  };

  const handleFilterAppointments = () => {
    toast.info('Opening filters...', { duration: 2000 });
    // In a real app, this would open a filter panel
  };

  const handleCalendarView = () => {
    toast.info('Switching to calendar view...', { duration: 2000 });
    // In a real app, this would change the view layout
  };

  // Conversations actions
  const handleSelectConversation = (id: number) => {
    toast.info(`Loading conversation #${id}...`, { duration: 1500 });
    // In a real app, this would load the full conversation
  };

  // Providers actions
  const handleAddProvider = async () => {
    toast.loading('Opening provider form...', { id: 'new-provider' });
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success('Provider form ready', { id: 'new-provider' });
    // In a real app, this would open a modal with a form
  };

  const handleViewSchedule = (id: number) => {
    toast.info(`Loading schedule for provider #${id}...`, { duration: 2000 });
    // In a real app, this would show the provider's schedule
  };

  const handleEditProvider = (id: number) => {
    toast.info(`Opening editor for provider #${id}...`, { duration: 2000 });
    // In a real app, this would open an edit form
  };

  // Analytics actions
  const handleExportReport = async () => {
    toast.loading('Generating report...', { id: 'export-report' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Report downloaded successfully', { id: 'export-report' });
    // In a real app, this would generate and download a PDF/CSV
  };

  const handleDateRangeFilter = () => {
    toast.info('Date range filter applied', { duration: 2000 });
    // In a real app, this would update the analytics data
  };

  return (
    <AppActionsContext.Provider
      value={{
        handleAddAppointment,
        handleViewAIDetails,
        handleDateFilter,
        handleNewAppointment,
        handleViewAppointment,
        handleFilterAppointments,
        handleCalendarView,
        handleSelectConversation,
        handleAddProvider,
        handleViewSchedule,
        handleEditProvider,
        handleExportReport,
        handleDateRangeFilter,
      }}
    >
      {children}
    </AppActionsContext.Provider>
  );
};

export const useAppActions = () => {
  const context = useContext(AppActionsContext);
  if (!context) {
    throw new Error('useAppActions must be used within AppActionsProvider');
  }
  return context;
};

import { ThemeProvider } from '@emotion/react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';

// Define a simple theme that matches Twenty's design system
const theme = {
  font: {
    family: 'Inter, sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    weight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
    },
    color: {
      primary: '#111827',
      secondary: '#4B5563',
      tertiary: '#9CA3AF',
      light: '#6B7280',
    },
  },
  color: {
    blue: '#3F76FF',
    green: '#16A34A',
    red: '#EF4444',
    yellow: '#F59E0B',
    gray: '#9CA3AF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    transparent: {
      primary: 'rgba(255, 255, 255, 0.8)',
      secondary: 'rgba(249, 250, 251, 0.8)',
    },
  },
  border: {
    color: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      strong: '#9CA3AF',
    },
    radius: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
  },
  boxShadow: {
    light: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    medium: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    strong: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  blur: {
    medium: 'blur(8px)',
  },
  spacing: (...values: number[]) => values.map(value => `${value * 0.25}rem`).join(' '),
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </ThemeProvider>
  );
}; 
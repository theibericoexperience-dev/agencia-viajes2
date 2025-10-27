"use client";
import { useNotification } from './NotificationProvider';

// Hook personalizado para usar toast en componentes
export const useToast = () => {
  const notification = useNotification();

  return {
    success: (title: string, message: string, duration?: number) => {
      notification.success(title, message, duration);
    },
    error: (title: string, message: string, duration?: number) => {
      notification.error(title, message, duration);
    },
    warning: (title: string, message: string, duration?: number) => {
      notification.warning(title, message, duration);
    },
    info: (title: string, message: string, duration?: number) => {
      notification.info(title, message, duration);
    },
  };
};

// Legacy exports for backward compatibility - REMOVED to prevent hook errors
// export const toast = { ... };
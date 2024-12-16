import { format, isValid } from 'date-fns';

export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  
  return format(dateObj, 'MMMM d, yyyy');
}

export function formatTime(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid time';
  
  return format(dateObj, 'h:mm a');
}

export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return 'Not specified';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return 'Invalid date/time';
  
  return format(dateObj, 'MMMM d, yyyy h:mm a');
}
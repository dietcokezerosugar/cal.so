import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGroupFromPRN(prn: string): string {
  const groups = ['A1', 'A2', 'B1', 'B2'];
  const prnDigits = prn.replace(/\D/g, '');
  if (!prnDigits) {
    return groups[0];
  }
  // Use last 3 digits for better distribution
  const prnNumber = parseInt(prnDigits.slice(-3), 10); 
  return groups[prnNumber % groups.length];
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

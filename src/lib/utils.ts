import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGroupFromPRN(prn: string): string {
  const groups = [
    'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 
    'D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3',
    'G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3',
    'J1', 'J2', 'J3'
  ];
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

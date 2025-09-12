import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prnData from '../../public/prn-data.json';

type StudentData = {
  "PRN NO": number;
  "DIV": string;
  "Batch "?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGroupFromPRN(prn: string): string {
  const prnNumber = parseInt(prn, 10);

  if (isNaN(prnNumber)) {
    return "A1"; // Default or error case
  }

  const student = (prnData as StudentData[]).find(item => item["PRN NO"] === prnNumber);

  if (student) {
    // The key "Batch " has a trailing space in the provided JSON.
    const batch = student["Batch "];
    if (batch) {
      return batch.trim();
    }
    // Fallback to DIV if Batch is not specified
    if (student.DIV) {
        // Simple logic to derive a default batch from DIV if not specified, e.g., DIV 'A' -> 'A1'
        return `${student.DIV.trim()}1`;
    }
  }

  // Fallback for PRNs not in the JSON data, you might want to refine this
  const lastDigit = parseInt(prn.slice(-1), 10);
  if (lastDigit <= 3) return `A${lastDigit || 1}`;
  
  return "A1"; 
}


export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  
  if (new Date().toDateString() === date.toDateString()) {
    return `Today, ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
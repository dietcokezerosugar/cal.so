import { type ClassValue, clsx } from "clsx"
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
    if (batch && batch.trim()) {
      return batch.trim();
    }
    // Fallback to DIV if Batch is not specified
    if (student.DIV && student.DIV.trim()) {
        const division = student.DIV.trim();
        // Default to batch 1 if no specific batch is assigned
        return `${division}1`;
    }
  }

  // Fallback for PRNs not in the JSON data, though this should be rare.
  return "A1"; 
}


export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  
  const today = new Date();
  const isToday = today.getDate() === date.getDate() &&
                  today.getMonth() === date.getMonth() &&
                  today.getFullYear() === date.getFullYear();

  if (isToday) {
    return `Today, ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

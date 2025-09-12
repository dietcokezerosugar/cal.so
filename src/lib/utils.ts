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
    return "A1"; 
  }

  const student = (prnData as StudentData[]).find(item => item["PRN NO"] === prnNumber);

  if (student) {
    const batch = student["Batch "];
    if (batch && batch.trim()) {
      return batch.trim();
    }
    if (student.DIV && student.DIV.trim()) {
        const division = student.DIV.trim();
        
        const divisionPrns = prnData.filter(s => s.DIV === division);
        const studentIndexInDiv = divisionPrns.findIndex(s => s["PRN NO"] === prnNumber);

        if (studentIndexInDiv !== -1) {
            const batchSize = 20; 
            const batchNumber = Math.floor(studentIndexInDiv / batchSize) + 1;
            return `${division}${batchNumber}`;
        }
    }
  }

  return "A1"; 
}


export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  if (today.getTime() === compareDate.getTime()) {
    return `Today, ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date)}`;
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

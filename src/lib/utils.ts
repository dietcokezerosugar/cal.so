import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prnData from '../../public/prn-data.json';

type StudentData = {
  "PRN NO": number;
  "Batch": string;
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

  if (student && student.Batch) {
    return student.Batch;
  }
  
  // Fallback logic for PRNs not in the provided list
  if (prn.length === 11) {
    if (prnNumber >= 20250802001 && prnNumber <= 20250802053) return "A1";
    if (prnNumber >= 20250802054 && prnNumber <= 20250802104) return "A2";
    if (prnNumber >= 20250802105 && prnNumber <= 20250802154) return "A3";
    if (prnNumber >= 20250802155 && prnNumber <= 20250802203) return "B1";
    if (prnNumber >= 20250802204 && prnNumber <= 20250802257) return "B2";
    if (prnNumber >= 20250802258 && prnNumber <= 20250802304) return "B3";
    if (prnNumber >= 20250802305 && prnNumber <= 20250802352) return "C1";
    if (prnNumber >= 20250802353 && prnNumber <= 20250802402) return "C2";
    if (prnNumber >= 20250802404 && prnNumber <= 20250802451) return "C3";
    if (prnNumber >= 20250802452 && prnNumber <= 20250802496) return "D1";
    if (prnNumber >= 20250802497 && prnNumber <= 20250802544) return "D2";
    if (prnNumber >= 20250802545 && prnNumber <= 20250802591) return "D3";
    if (prnNumber >= 20250802592 && prnNumber <= 20250802637) return "E1";
    if (prnNumber >= 20250802638 && prnNumber <= 20250802684) return "E2";
    if (prnNumber >= 20250802685 && prnNumber <= 20250802733) return "E3";
    if (prnNumber >= 20250802734 && prnNumber <= 20250802780) return "F1";
    if (prnNumber >= 20250802781 && prnNumber <= 20250802829) return "F2";
    if (prnNumber >= 20250802830 && prnNumber <= 20250802877) return "F3";
    if (prnNumber >= 20250802878 && prnNumber <= 20250802923) return "G1";
    if (prnNumber >= 20250802924 && prnNumber <= 20250802972) return "G2";
    if (prnNumber >= 20250802973 && prnNumber <= 20250803018) return "G3";
    if (prnNumber >= 202508021019 && prnNumber <= 202508021063) return "H1";
    if (prnNumber >= 202508021064 && prnNumber <= 202508021109) return "H2";
    if (prnNumber >= 202508021111 && prnNumber <= 202508021158) return "H3";
    if (prnNumber >= 202508021159 && prnNumber <= 202508021203) return "I1";
    if (prnNumber >= 202508021204 && prnNumber <= 202508021248) return "I2";
    if (prnNumber >= 202508021249 && prnNumber <= 202508021293) return "I3";
    if (prnNumber >= 202508021294 && prnNumber <= 202508021338) return "J1";
    if (prnNumber >= 202508021339 && prnNumber <= 202508021383) return "J2";
    if (prnNumber >= 202508021384 && prnNumber <= 202508021425) return "J3";
  }

  // A simple fallback for other cases, you might want to refine this
  const lastDigit = parseInt(prn.slice(-1), 10);
  if (lastDigit <= 3) return `A${lastDigit || 1}`;
  
  return "A1"; 
}


export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGroupFromPRN(prn: string): string {
  const prnNumber = parseInt(prn, 10);

  if (isNaN(prnNumber)) {
    return "A1"; // Default or error case
  }

  // PRN ranges are inclusive
  const ranges: { [group: string]: { start: number; end: number } } = {
    A1: { start: 20250802001, end: 20250802053 },
    A2: { start: 20250802054, end: 20250802104 },
    A3: { start: 20250802105, end: 20250802154 },
    B1: { start: 20250802155, end: 20250802203 },
    B2: { start: 20250802204, end: 20250802257 },
    B3: { start: 20250802258, end: 20250802304 },
    C1: { start: 20250802305, end: 20250802352 },
    C2: { start: 20250802353, end: 20250802402 },
    C3: { start: 20250802404, end: 20250802451 },
    D1: { start: 20250802452, end: 20250802496 },
    D2: { start: 20250802497, end: 20250802544 },
    D3: { start: 20250802545, end: 20250802591 },
    E1: { start: 20250802592, end: 20250802637 },
    E2: { start: 20250802638, end: 20250802684 },
    E3: { start: 20250802685, end: 20250802733 },
    F1: { start: 20250802734, end: 20250802780 },
    F2: { start: 20250802781, end: 20250802829 },
    F3: { start: 20250802830, end: 20250802877 },
    G1: { start: 20250802878, end: 20250802923 },
    G2: { start: 20250802924, end: 20250802972 },
    G3: { start: 20250802973, end: 20250803018 },
    H1: { start: 20250803019, end: 20250803063 },
    H2: { start: 20250803064, end: 20250803109 },
    H3: { start: 20250803111, end: 20250803158 },
    I1: { start: 20250803159, end: 20250803203 },
    I2: { start: 20250803204, end: 20250803248 },
    I3: { start: 20250803249, end: 20250803293 },
    J1: { start: 20250803294, end: 20250803338 },
    J2: { start: 20250803339, end: 20250803383 },
    J3: { start: 20250803384, end: 20250803425 },
  };

  for (const group in ranges) {
    if (prnNumber >= ranges[group].start && prnNumber <= ranges[group].end) {
      return group;
    }
  }

  return "A1"; // Default if not in any range
}


export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

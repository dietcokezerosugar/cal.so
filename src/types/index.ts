export interface ClassDetails {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface DailySchedule {
  [dayOfWeek: string]: ClassDetails[];
}

export interface Timetable {
  [group: string]: DailySchedule;
}

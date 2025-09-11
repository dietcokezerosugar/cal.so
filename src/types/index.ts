export interface ClassDetails {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface DailySchedule {
  [group: string]: ClassDetails[];
}

export interface WeeklySchedule {
  [dayOfWeek: string]: DailySchedule;
}

export interface Timetable {
  schedule: WeeklySchedule;
}

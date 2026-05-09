export type LocalTime = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export type ScheduleRequest = {
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: LocalTime;
  location: string;
};

export type ScheduleResponse = {
  id: number;
  matchId: number;
  applicantId: number;
  receiverId: number;
  scheduledDate: string;
  scheduledTime: LocalTime;
  location: string;
  createdAt: string;
};

export function toLocalTime(hhmm: string): LocalTime {
  const [h, m] = hhmm.split(':').map(Number);
  return { hour: h, minute: m, second: 0, nano: 0 };
}

export function localTimeToString(t: LocalTime): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(t.hour)}:${pad(t.minute)}`;
}

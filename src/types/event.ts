export interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
  location?: string;
  attendees: Attendee[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: Date;
  timeSlots: TimeSlot[];
  defaultIncentiveType: IncentiveType;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  attended?: boolean;
  incentiveStatus?: IncentiveStatus;
  incentiveType?: IncentiveType;
}

export enum IncentiveStatus {
  PENDING = 'PENDING',
  GRANTED = 'GRANTED',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export enum IncentiveType {
  COURSE_CREDIT = 'COURSE_CREDIT',
  PAYMENT = 'PAYMENT',
  OTHER = 'OTHER'
}

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface ScheduleConfig {
  dates: string[];
  timeRanges: TimeRange[];
  slotDuration: number;
  capacityPerSlot: number;
  defaultLocation: string;
}
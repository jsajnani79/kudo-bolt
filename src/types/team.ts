import { Event } from './event';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  events?: Event[];
  createdAt: Date;
  updatedAt: Date;
}
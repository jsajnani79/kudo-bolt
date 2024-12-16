import { Event, IncentiveType } from '../types/event';
import { addHours, setHours, setMinutes, startOfToday } from 'date-fns';

const today = startOfToday();

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Learn the fundamentals of modern web development with React and TypeScript.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    location: 'Tech Hub - Room 101',
    date: today,
    defaultIncentiveType: IncentiveType.COURSE_CREDIT,
    timeSlots: [
      {
        id: '1-1',
        startTime: setHours(setMinutes(today, 0), 9),
        endTime: setHours(setMinutes(today, 0), 11),
        capacity: 20,
        attendees: []
      },
      {
        id: '1-2',
        startTime: setHours(setMinutes(today, 0), 13),
        endTime: setHours(setMinutes(today, 0), 15),
        capacity: 20,
        attendees: []
      }
    ]
  },
  {
    id: '2',
    title: 'Data Science Masterclass',
    description: 'Deep dive into data analysis, machine learning, and AI fundamentals.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    location: 'Innovation Center',
    date: addHours(today, 24),
    defaultIncentiveType: IncentiveType.PAYMENT,
    timeSlots: [
      {
        id: '2-1',
        startTime: setHours(setMinutes(addHours(today, 24), 0), 10),
        endTime: setHours(setMinutes(addHours(today, 24), 0), 12),
        capacity: 15,
        attendees: []
      },
      {
        id: '2-2',
        startTime: setHours(setMinutes(addHours(today, 24), 0), 14),
        endTime: setHours(setMinutes(addHours(today, 24), 0), 16),
        capacity: 15,
        attendees: []
      }
    ]
  }
];
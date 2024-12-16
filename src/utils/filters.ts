import { Event } from '../types/event';

export function filterEventsByDate(events: Event[], filter: 'all' | 'upcoming' | 'past'): Event[] {
  const now = new Date();
  return events.filter(event => {
    switch (filter) {
      case 'upcoming':
        return event.date >= now;
      case 'past':
        return event.date < now;
      default:
        return true;
    }
  });
}

export function filterParticipantsBySearchTerm(participants: any[], searchTerm: string) {
  const searchLower = searchTerm.toLowerCase();
  return participants.filter(participant =>
    participant.name.toLowerCase().includes(searchLower) ||
    participant.email.toLowerCase().includes(searchLower) ||
    participant.eventTitle.toLowerCase().includes(searchLower)
  );
}
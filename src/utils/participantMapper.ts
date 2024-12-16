import { Event, Attendee } from '../types/event';

export function mapParticipantsWithEventDetails(events: Event[]) {
  return events.flatMap(event =>
    event.timeSlots.flatMap(slot =>
      slot.attendees.map(attendee => ({
        ...attendee,
        eventTitle: event.title,
        eventDate: event.date,
        slotTime: {
          start: slot.startTime,
          end: slot.endTime
        },
        eventId: event.id,
        slotId: slot.id
      }))
    )
  );
}
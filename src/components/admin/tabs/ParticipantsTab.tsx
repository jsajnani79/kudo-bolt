import React from 'react';
import { ParticipantList } from '../participants/ParticipantList';
import { useEventStore } from '../../../store/eventStore';

export function ParticipantsTab() {
  const events = useEventStore(state => state.events);

  return (
    <div className="space-y-6">
      <ParticipantList events={events} />
    </div>
  );
}
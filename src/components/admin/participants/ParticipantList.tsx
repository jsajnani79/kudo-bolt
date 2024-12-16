import React, { useState } from 'react';
import { Event, Attendee, IncentiveStatus, IncentiveType } from '../../../types/event';
import { useEventStore } from '../../../store/eventStore';
import { ParticipantFilters } from './ParticipantFilters';
import { ParticipantTable } from './ParticipantTable';
import { AddParticipantForm } from './AddParticipantForm';
import { EventSlotSelector } from './EventSlotSelector';
import { filterEventsByDate, filterParticipantsBySearchTerm } from '../../../utils/filters';
import { mapParticipantsWithEventDetails } from '../../../utils/participantMapper';

interface ParticipantListProps {
  events: Event[];
}

export function ParticipantList({ events }: ParticipantListProps) {
  const { updateParticipant } = useEventStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');

  const filteredEvents = filterEventsByDate(events, filter);
  const mappedParticipants = mapParticipantsWithEventDetails(filteredEvents);
  const filteredParticipants = filterParticipantsBySearchTerm(mappedParticipants, searchTerm);

  const handleAddParticipant = (data: { name: string; email: string; incentiveType?: IncentiveType }) => {
    const newParticipant: Attendee = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      attended: false,
      incentiveStatus: data.incentiveType ? IncentiveStatus.PENDING : IncentiveStatus.NOT_APPLICABLE,
      incentiveType: data.incentiveType,
    };
    
    useEventStore.getState().addParticipant(selectedEventId, selectedSlotId, newParticipant);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <ParticipantFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        onAddClick={() => setShowAddForm(true)}
      />

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Add New Participant</h3>
          <EventSlotSelector
            events={events}
            selectedEventId={selectedEventId}
            selectedSlotId={selectedSlotId}
            onEventChange={setSelectedEventId}
            onSlotChange={setSelectedSlotId}
          />
          <AddParticipantForm
            onSubmit={handleAddParticipant}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <ParticipantTable
        participants={filteredParticipants}
        onUpdateParticipant={updateParticipant}
      />
    </div>
  );
}
import React from 'react';
import { ParticipantRow } from './ParticipantRow';
import { Attendee, IncentiveStatus, IncentiveType } from '../../../types/event';

interface ParticipantTableProps {
  participants: Array<Attendee & {
    eventTitle: string;
    eventDate: Date;
    slotTime: { start: Date; end: Date };
    eventId: string;
    slotId: string;
  }>;
  onUpdateParticipant: (
    eventId: string,
    slotId: string,
    updates: Partial<Attendee>
  ) => void;
}

export function ParticipantTable({ participants, onUpdateParticipant }: ParticipantTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Incentive
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.map((participant) => (
            <ParticipantRow
              key={`${participant.id}-${participant.slotId}`}
              participant={participant}
              onUpdateAttendance={(attended) => {
                onUpdateParticipant(participant.eventId, participant.slotId, {
                  ...participant,
                  attended,
                });
              }}
              onUpdateIncentive={(status, type) => {
                onUpdateParticipant(participant.eventId, participant.slotId, {
                  ...participant,
                  incentiveStatus: status,
                  incentiveType: type,
                });
              }}
            />
          ))}
        </tbody>
      </table>
      {participants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No participants found
        </div>
      )}
    </div>
  );
}
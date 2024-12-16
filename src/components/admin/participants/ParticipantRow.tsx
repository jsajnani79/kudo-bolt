import React from 'react';
import { format } from 'date-fns';
import { Check, Clock, Mail, User, X } from 'lucide-react';
import { Attendee, IncentiveStatus, IncentiveType } from '../../../types/event';

interface ParticipantRowProps {
  participant: Attendee & {
    eventTitle: string;
    eventDate: Date;
    slotTime: {
      start: Date;
      end: Date;
    };
  };
  onUpdateAttendance: (attended: boolean) => void;
  onUpdateIncentive: (status: IncentiveStatus, type?: IncentiveType) => void;
}

export function ParticipantRow({
  participant,
  onUpdateAttendance,
  onUpdateIncentive,
}: ParticipantRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <User size={16} />
            {participant.name}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Mail size={16} />
            {participant.email}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{participant.eventTitle}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {format(participant.eventDate, 'MMM d, yyyy')}
          </div>
          <div>
            {format(participant.slotTime.start, 'h:mm a')} -{' '}
            {format(participant.slotTime.end, 'h:mm a')}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateAttendance(true)}
            className={`p-1 rounded ${
              participant.attended
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-400 hover:text-green-600'
            }`}
            title="Mark as attended"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => onUpdateAttendance(false)}
            className={`p-1 rounded ${
              participant.attended === false
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-400 hover:text-red-600'
            }`}
            title="Mark as not attended"
          >
            <X size={16} />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <select
            value={participant.incentiveType || ''}
            onChange={(e) =>
              onUpdateIncentive(
                participant.incentiveStatus || IncentiveStatus.PENDING,
                e.target.value as IncentiveType
              )
            }
            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {Object.values(IncentiveType).map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
          <select
            value={participant.incentiveStatus || IncentiveStatus.NOT_APPLICABLE}
            onChange={(e) =>
              onUpdateIncentive(
                e.target.value as IncentiveStatus,
                participant.incentiveType
              )
            }
            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.values(IncentiveStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </td>
    </tr>
  );
}
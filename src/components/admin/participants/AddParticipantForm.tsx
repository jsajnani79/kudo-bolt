import React, { useState } from 'react';
import { IncentiveStatus, IncentiveType } from '../../../types/event';

interface AddParticipantFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    incentiveType?: IncentiveType;
  }) => void;
  onCancel: () => void;
}

export function AddParticipantForm({ onSubmit, onCancel }: AddParticipantFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [incentiveType, setIncentiveType] = useState<IncentiveType | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      incentiveType: incentiveType as IncentiveType || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Incentive Type</label>
        <select
          value={incentiveType}
          onChange={(e) => setIncentiveType(e.target.value as IncentiveType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">No Incentive</option>
          {Object.values(IncentiveType).map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Participant
        </button>
      </div>
    </form>
  );
}
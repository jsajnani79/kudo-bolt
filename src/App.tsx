import React, { useState } from 'react';
import { Calendar, Settings } from 'lucide-react';
import { EventsView } from './components/events/EventsView';
import { AdminView } from './components/admin/AdminView';
import { ParticipantProfile } from './components/profile/ParticipantProfile';
import { Tabs } from './components/Tabs';

const tabs = [
  { id: 'events', label: 'Events' },
  { id: 'profile', label: 'My Profile' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
              </div>
              <button
                onClick={() => setShowAdmin(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                ← Back to Events
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <AdminView />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Event Booking</h1>
            </div>
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
              <span>Admin</span>
            </button>
          </div>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'events' ? (
          <EventsView />
        ) : (
          <ParticipantProfile />
        )}
      </main>
    </div>
  );
}
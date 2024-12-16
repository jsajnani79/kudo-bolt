import React, { useState } from 'react';
import { AdminSidebar } from './layout/AdminSidebar';
import { AdminHeader } from './layout/AdminHeader';
import { EventsTab } from './tabs/EventsTab';
import { ParticipantsTab } from './tabs/ParticipantsTab';
import { TeamTab } from './tabs/TeamTab';
import { DefaultsTab } from './tabs/DefaultsTab';

type AdminTab = 'events' | 'participants' | 'team' | 'defaults';

export function AdminView() {
  const [activeTab, setActiveTab] = useState<AdminTab>('events');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsTab />;
      case 'participants':
        return <ParticipantsTab />;
      case 'team':
        return <TeamTab />;
      case 'defaults':
        return <DefaultsTab />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <AdminHeader activeTab={activeTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
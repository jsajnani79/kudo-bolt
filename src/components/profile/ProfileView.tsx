import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { DemographicsSection } from './sections/DemographicsSection';
import { HealthSection } from './sections/HealthSection';
import { SocioeconomicSection } from './sections/SocioeconomicSection';
import { BookedEventsSection } from './sections/BookedEventsSection';

interface ProfileViewProps {
  profile: ParticipantProfile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <BookedEventsSection participantEmail={profile.email} />
      <BasicInfoSection profile={profile} />
      <DemographicsSection profile={profile} />
      <SocioeconomicSection profile={profile} />
      <HealthSection profile={profile} />
    </div>
  );
}
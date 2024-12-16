import React from 'react';
import { GraduationCap, Briefcase, Home } from 'lucide-react';
import { ParticipantProfile } from '../../../types/participant';

interface SocioeconomicSectionProps {
  profile: ParticipantProfile;
}

export function SocioeconomicSection({ profile }: SocioeconomicSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Education & Employment</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Education Level</label>
            <p className="font-medium">{profile.education}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Employment Status</label>
            <div className="flex items-center gap-2 mt-1">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <p className="font-medium">{profile.employmentStatus}</p>
            </div>
          </div>
          
          {profile.occupation && (
            <div>
              <label className="text-sm text-gray-500">Occupation</label>
              <p className="font-medium">{profile.occupation}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Marital Status</label>
            <div className="flex items-center gap-2 mt-1">
              <Home className="w-4 h-4 text-gray-600" />
              <p className="font-medium">{profile.maritalStatus}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Household Income Range</label>
            <p className="font-medium">{profile.householdIncome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
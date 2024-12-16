import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Ethnicity, Race, LanguageProficiency } from '../../../../types/demographics';
import { LANGUAGES } from '../../../../utils/constants/languages';

interface DemographicsFormProps {
  formData: any;
  onChange: (updates: any) => void;
  onMultiSelect: (field: string, value: string) => void;
}

export function DemographicsForm({ formData, onChange, onMultiSelect }: DemographicsFormProps) {
  const [newLanguage, setNewLanguage] = React.useState({ name: '', proficiency: LanguageProficiency.BASIC });
  const [showOtherLanguage, setShowOtherLanguage] = React.useState(false);

  const handlePrimaryLanguageChange = (value: string) => {
    if (value === 'other') {
      setShowOtherLanguage(true);
    } else {
      setShowOtherLanguage(false);
      onChange({ primaryLanguage: value });
    }
  };

  const addLanguage = () => {
    if (newLanguage.name) {
      const languages = formData.otherLanguages || [];
      onChange({
        otherLanguages: [...languages, newLanguage]
      });
      setNewLanguage({ name: '', proficiency: LanguageProficiency.BASIC });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
        <div className="mt-2 space-y-2">
          {Object.values(Ethnicity).map(eth => (
            <label key={eth} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(formData.ethnicity || []).includes(eth)}
                onChange={() => onMultiSelect('ethnicity', eth)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{eth}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Race</label>
        <div className="mt-2 space-y-2">
          {Object.values(Race).map(race => (
            <label key={race} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(formData.race || []).includes(race)}
                onChange={() => onMultiSelect('race', race)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{race}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Primary Language</label>
        <select
          value={formData.primaryLanguage || ''}
          onChange={(e) => handlePrimaryLanguageChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select primary language</option>
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.name}>{lang.name}</option>
          ))}
        </select>
        
        {showOtherLanguage && (
          <input
            type="text"
            value={formData.primaryLanguage || ''}
            onChange={(e) => onChange({ primaryLanguage: e.target.value })}
            placeholder="Enter your primary language"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Languages</label>
        <div className="space-y-2">
          {(formData.otherLanguages || []).map((lang: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1">{lang.name}</span>
              <span className="text-sm text-gray-500">{lang.proficiency}</span>
              <button
                type="button"
                onClick={() => {
                  const newLanguages = [...(formData.otherLanguages || [])];
                  newLanguages.splice(index, 1);
                  onChange({ otherLanguages: newLanguages });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <select
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select language</option>
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.name}>{lang.name}</option>
              ))}
            </select>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as LanguageProficiency })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(LanguageProficiency).map(prof => (
                <option key={prof} value={prof}>{prof}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={addLanguage}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
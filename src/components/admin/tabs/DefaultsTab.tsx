import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { LocationList } from '../defaults/LocationList';
import { LocationForm } from '../defaults/LocationForm';
import { useLocationStore } from '../../../store/locationStore';
import { Location } from '../../../types/location';

export function DefaultsTab() {
  const { locations, addLocation, updateLocation, deleteLocation } = useLocationStore();
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleSubmit = (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingLocation) {
      updateLocation(editingLocation.id, data);
    } else {
      addLocation(data);
    }
    setShowForm(false);
    setEditingLocation(null);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (id === 'online') {
      alert('The Online location cannot be deleted.');
      return;
    }
    if (confirm('Are you sure you want to delete this location?')) {
      deleteLocation(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Study Locations</h2>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Location
            </button>
          )}
        </div>

        {showForm ? (
          <LocationForm
            initialData={editingLocation}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingLocation(null);
            }}
          />
        ) : (
          <LocationList
            locations={locations}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
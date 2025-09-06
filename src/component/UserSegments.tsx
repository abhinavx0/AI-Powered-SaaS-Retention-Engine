import React, { useState } from 'react';
import { segments } from '../data/sampleData';
import { Users, Plus, Target } from 'lucide-react';

interface UserSegmentsProps {
  onViewChange: (view: string) => void;
}

export default function UserSegments({ onViewChange }: UserSegmentsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Segments</h1>
          <p className="text-gray-500 mt-1">Organize users into actionable groups</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Segment
        </button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search segments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSegments.map(segment => (
          <div key={segment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {segment.userCount} users
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{segment.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{segment.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Average CLV:</span>
                <span className="font-medium">${segment.avgClv.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => onViewChange('campaigns')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Users className="h-4 w-4 mr-2" />
              Launch Campaign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
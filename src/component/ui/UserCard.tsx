import React from 'react';
import { User } from '../../types';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface UserCardProps {
  user: User;
  type: 'risk' | 'opportunity';
  onAction: (action: string, userId: string) => void;
}

export default function UserCard({ user, type, onAction }: UserCardProps) {
  const isRisk = type === 'risk';
  const score = isRisk ? user.churnProbability : (1 - user.churnProbability);
  const scoreColor = isRisk 
    ? score > 0.7 ? 'text-red-600' : score > 0.4 ? 'text-orange-600' : 'text-green-600'
    : 'text-green-600';

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.company}</p>
        </div>
        <div className="flex items-center">
          {isRisk ? (
            <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${scoreColor}`}>
            {Math.round(score * 100)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">CLV:</span>
          <span className="font-medium">${user.clv.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Active:</span>
          <span className="font-medium">
            {Math.floor((Date.now() - user.lastLogin.getTime()) / (24 * 60 * 60 * 1000))}d ago
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onAction('campaign', user.id)}
          className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Send Campaign
        </button>
        <button
          onClick={() => onAction('profile', user.id)}
          className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
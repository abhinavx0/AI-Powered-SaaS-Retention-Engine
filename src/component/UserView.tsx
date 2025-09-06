import React from 'react';
import { users } from '../data/sampleData';
import { generateAIRecommendation } from '../utils/ai';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Activity, 
  Brain,
  Clock,
  Target,
  AlertCircle 
} from 'lucide-react';

interface UserViewProps {
  userId: string;
  onBack: () => void;
}

export default function UserView({ userId, onBack }: UserViewProps) {
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">User not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Go back
        </button>
      </div>
    );
  }

  const recommendation = generateAIRecommendation(user);
  const healthScore = Math.round((1 - user.churnProbability) * 100);
  const healthColor = healthScore > 70 ? 'text-green-600' : healthScore > 40 ? 'text-orange-600' : 'text-red-600';
  const healthBg = healthScore > 70 ? 'bg-green-50' : healthScore > 40 ? 'bg-orange-50' : 'bg-red-50';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">{user.email} • {user.company}</p>
        </div>
      </div>

      {/* Health Score */}
      <div className={`${healthBg} rounded-xl p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">User Health Score</h2>
            <p className="text-sm text-gray-600 mt-1">Based on engagement, usage, and behavior patterns</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${healthColor}`}>{healthScore}%</div>
            <p className="text-sm text-gray-600">
              {healthScore > 70 ? 'Healthy' : healthScore > 40 ? 'At Risk' : 'High Risk'}
            </p>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600 bg-green-50 p-2 rounded-lg" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Customer Lifetime Value</p>
              <p className="text-2xl font-semibold text-gray-900">${user.clv.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Days Active</p>
              <p className="text-2xl font-semibold text-gray-900">{user.daysActive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 bg-purple-50 p-2 rounded-lg" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Login</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.floor((Date.now() - user.lastLogin.getTime()) / (24 * 60 * 60 * 1000))}d
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Plan</p>
              <p className="text-2xl font-semibold text-gray-900">{user.plan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{recommendation.action}</h3>
              <p className="text-gray-600 mt-2">{recommendation.message}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-600">
                {Math.round(recommendation.confidence * 100)}% confidence
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Best time: {recommendation.bestTime}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Expected impact: {recommendation.expectedImpact}</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200">
          Execute Recommendation
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {user.activities.slice(0, 10).map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
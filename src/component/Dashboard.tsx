import React from 'react';
import { users, metrics } from '../data/sampleData';
import MetricCard from './ui/MetricCard';
import UserCard from './ui/UserCard';
import { DollarSign, Users, TrendingUp, AlertTriangle, Plus } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: string) => void;
  onUserSelect: (userId: string) => void;
}

export default function Dashboard({ onViewChange, onUserSelect }: DashboardProps) {
  const highRiskUsers = users
    .filter(u => u.churnProbability > 0.6)
    .sort((a, b) => b.churnProbability - a.churnProbability)
    .slice(0, 10);

  const upgradeOpportunities = users
    .filter(u => u.churnProbability < 0.3 && u.plan !== 'Enterprise')
    .sort((a, b) => b.clv - a.clv)
    .slice(0, 10);

  const handleUserAction = (action: string, userId: string) => {
    if (action === 'profile') {
      onUserSelect(userId);
      onViewChange('user-detail');
    } else if (action === 'campaign') {
      onViewChange('campaigns');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor your retention metrics and take action</p>
        </div>
        <button
          onClick={() => onViewChange('campaigns')}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Recurring Revenue"
          value={`$${metrics.mrr.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toString()}
          change="+5% from last month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Average CLV"
          value={`$${metrics.avgClv.toLocaleString()}`}
          change="+8% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Churn Rate"
          value={`${(metrics.churnRate * 100).toFixed(1)}%`}
          change="-2.1% from last month"
          changeType="positive"
          icon={AlertTriangle}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users at Risk */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Users at Risk</h2>
            <button
              onClick={() => onViewChange('segments')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {highRiskUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                type="risk"
                onAction={handleUserAction}
              />
            ))}
          </div>
        </div>

        {/* Upgrade Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upgrade Opportunities</h2>
            <button
              onClick={() => onViewChange('segments')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upgradeOpportunities.map(user => (
              <UserCard
                key={user.id}
                user={user}
                type="opportunity"
                onAction={handleUserAction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
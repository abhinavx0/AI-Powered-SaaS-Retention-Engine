export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  clv: number;
  churnProbability: number;
  lastLogin: Date;
  daysActive: number;
  signupDate: Date;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  featureUsage: {
    feature1: number;
    feature2: number;
    feature3: number;
  };
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'login' | 'feature_use' | 'campaign_opened' | 'campaign_clicked' | 'support_ticket';
  description: string;
  timestamp: Date;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  avgClv: number;
  criteria: SegmentCriteria;
}

export interface SegmentCriteria {
  churnProbability?: { min?: number; max?: number };
  clv?: { min?: number; max?: number };
  daysActive?: { min?: number; max?: number };
  daysSinceSignup?: { min?: number; max?: number };
  plan?: string[];
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'In-app' | 'Push';
  segmentId: string;
  status: 'Draft' | 'Active' | 'Completed';
  message: string;
  sentTo: number;
  openRate: number;
  conversionRate: number;
  revenueImpact: number;
  createdAt: Date;
  scheduledAt?: Date;
}

export interface Metrics {
  mrr: number;
  activeUsers: number;
  avgClv: number;
  churnRate: number;
}

export interface AIRecommendation {
  action: string;
  message: string;
  confidence: number;
  bestTime: string;
  expectedImpact: string;
}

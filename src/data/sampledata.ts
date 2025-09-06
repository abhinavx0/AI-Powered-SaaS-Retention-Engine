import { User, Segment, Campaign, Metrics } from '../types';

const companies = [
  'TechFlow Solutions', 'DataStream Inc', 'CloudVerse Corp', 'InnovateLab',
  'DigitalForge', 'ScaleWorks', 'FlowState Technologies', 'NextGen Systems',
  'PulseTech', 'VelocityCore', 'QuantumLeap Co', 'ByteCraft Solutions',
  'AppSphere', 'CodeWave Industries', 'SmartGrid Technologies', 'FusionPoint',
  'DevStorm', 'TechNova', 'DataPulse', 'CloudSync Solutions'
];

const firstNames = [
  'Alex', 'Morgan', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Cameron', 'Blake', 'Sage', 'River', 'Phoenix', 'Emery', 'Reese', 'Drew',
  'Jamie', 'Skyler', 'Rowan', 'Finley'
];

const lastNames = [
  'Chen', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore',
  'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Garcia',
  'Martinez', 'Robinson', 'Clark', 'Rodriguez'
];

const plans = ['Starter', 'Pro', 'Enterprise'] as const;

function generateRandomUser(index: number): User {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const signupDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
  const lastLogin = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  const plan = plans[Math.floor(Math.random() * plans.length)];
  
  const baseClv = plan === 'Starter' ? 2400 : plan === 'Pro' ? 7200 : 18000;
  const clv = baseClv + (Math.random() - 0.5) * baseClv * 0.4;
  
  const daysSinceSignup = Math.floor((Date.now() - signupDate.getTime()) / (24 * 60 * 60 * 1000));
  const daysSinceLogin = Math.floor((Date.now() - lastLogin.getTime()) / (24 * 60 * 60 * 1000));
  
  let churnProbability = 0;
  if (daysSinceLogin > 14) churnProbability += 0.4;
  if (daysSinceLogin > 7) churnProbability += 0.2;
  if (clv < baseClv * 0.8) churnProbability += 0.2;
  if (daysSinceSignup < 30) churnProbability += 0.1;
  churnProbability = Math.min(0.95, Math.max(0.05, churnProbability + (Math.random() - 0.5) * 0.3));

  return {
    id: `user-${index}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
    company,
    clv: Math.round(clv),
    churnProbability: Math.round(churnProbability * 100) / 100,
    lastLogin,
    daysActive: Math.floor(Math.random() * daysSinceSignup),
    signupDate,
    plan,
    featureUsage: {
      feature1: Math.floor(Math.random() * 100),
      feature2: Math.floor(Math.random() * 100),
      feature3: Math.floor(Math.random() * 100),
    },
    activities: generateActivities(5)
  };
}

function generateActivities(count: number) {
  const types = ['login', 'feature_use', 'campaign_opened', 'campaign_clicked', 'support_ticket'] as const;
  const descriptions = {
    login: 'User logged into dashboard',
    feature_use: 'Used analytics feature',
    campaign_opened: 'Opened retention email',
    campaign_clicked: 'Clicked campaign CTA',
    support_ticket: 'Created support ticket'
  };

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    description: descriptions[types[Math.floor(Math.random() * types.length)]],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
  }));
}

export const users: User[] = Array.from({ length: 500 }, (_, i) => generateRandomUser(i));

export const segments: Segment[] = [
  {
    id: 'high-risk',
    name: 'High Risk',
    description: 'Users with churn probability > 70%',
    userCount: users.filter(u => u.churnProbability > 0.7).length,
    avgClv: Math.round(users.filter(u => u.churnProbability > 0.7).reduce((sum, u) => sum + u.clv, 0) / users.filter(u => u.churnProbability > 0.7).length),
    criteria: { churnProbability: { min: 0.7 } }
  },
  {
    id: 'power-users',
    name: 'Power Users',
    description: 'High engagement, upgrade ready',
    userCount: users.filter(u => u.featureUsage.feature1 > 80 && u.plan !== 'Enterprise').length,
    avgClv: Math.round(users.filter(u => u.featureUsage.feature1 > 80 && u.plan !== 'Enterprise').reduce((sum, u) => sum + u.clv, 0) / users.filter(u => u.featureUsage.feature1 > 80 && u.plan !== 'Enterprise').length),
    criteria: { plan: ['Starter', 'Pro'] }
  },
  {
    id: 'new-users',
    name: 'New Users',
    description: 'Users signed up in last 30 days',
    userCount: users.filter(u => (Date.now() - u.signupDate.getTime()) / (24 * 60 * 60 * 1000) < 30).length,
    avgClv: Math.round(users.filter(u => (Date.now() - u.signupDate.getTime()) / (24 * 60 * 60 * 1000) < 30).reduce((sum, u) => sum + u.clv, 0) / users.filter(u => (Date.now() - u.signupDate.getTime()) / (24 * 60 * 60 * 1000) < 30).length),
    criteria: { daysSinceSignup: { max: 30 } }
  },
  {
    id: 'dormant',
    name: 'Dormant',
    description: 'No activity in 14+ days',
    userCount: users.filter(u => (Date.now() - u.lastLogin.getTime()) / (24 * 60 * 60 * 1000) > 14).length,
    avgClv: Math.round(users.filter(u => (Date.now() - u.lastLogin.getTime()) / (24 * 60 * 60 * 1000) > 14).reduce((sum, u) => sum + u.clv, 0) / users.filter(u => (Date.now() - u.lastLogin.getTime()) / (24 * 60 * 60 * 1000) > 14).length),
    criteria: { daysSinceSignup: { min: 14 } }
  }
];

export const campaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'High Risk Recovery',
    type: 'Email',
    segmentId: 'high-risk',
    status: 'Completed',
    message: 'We noticed you haven\'t been active lately. Here\'s a special offer to help you get more value...',
    sentTo: 45,
    openRate: 0.32,
    conversionRate: 0.08,
    revenueImpact: 12400,
    createdAt: new Date('2024-12-15'),
  },
  {
    id: 'campaign-2',
    name: 'Upgrade Opportunity',
    type: 'In-app',
    segmentId: 'power-users',
    status: 'Active',
    message: 'Ready to unlock advanced features? Upgrade to Pro and save 20%',
    sentTo: 67,
    openRate: 0.78,
    conversionRate: 0.24,
    revenueImpact: 28900,
    createdAt: new Date('2024-12-18'),
  }
];

export const metrics: Metrics = {
  mrr: 145600,
  activeUsers: 378,
  avgClv: Math.round(users.reduce((sum, u) => sum + u.clv, 0) / users.length),
  churnRate: 0.067
};

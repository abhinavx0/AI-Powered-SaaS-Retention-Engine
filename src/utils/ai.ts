import { User, AIRecommendation } from '../types';

export function generateAIRecommendation(user: User): AIRecommendation {
  const recommendations = [
    {
      action: 'Offer discount on annual plan',
      message: `Hi ${user.name.split(' ')[0]}, we'd love to help you save 25% with our annual plan upgrade!`,
      confidence: 0.85,
      bestTime: 'Tuesday 2:00 PM',
      expectedImpact: 'Reduce churn risk by 40%'
    },
    {
      action: 'Send feature tutorial',
      message: `${user.name.split(' ')[0]}, unlock the full potential of our analytics dashboard with this quick guide.`,
      confidence: 0.72,
      bestTime: 'Wednesday 10:00 AM',
      expectedImpact: 'Increase engagement by 35%'
    },
    {
      action: 'Schedule check-in call',
      message: `Hi ${user.name.split(' ')[0]}, our success team would love to ensure you're getting maximum value from ${user.company}'s subscription.`,
      confidence: 0.91,
      bestTime: 'Thursday 3:00 PM',
      expectedImpact: 'Reduce churn risk by 60%'
    }
  ];

  let selectedRecommendation;
  
  if (user.churnProbability > 0.7) {
    selectedRecommendation = recommendations[2]; // Check-in call for high risk
  } else if (user.featureUsage.feature1 < 30) {
    selectedRecommendation = recommendations[1]; // Tutorial for low usage
  } else {
    selectedRecommendation = recommendations[0]; // Discount for others
  }

  return selectedRecommendation;
}

export function generateCampaignMessage(segmentName: string, campaignType: string): string {
  const templates = {
    'High Risk': {
      Email: 'We miss you! Here\'s an exclusive offer to help you get back on track with a 30% discount on your next billing cycle.',
      'In-app': 'Welcome back! Discover what\'s new and claim your personalized recommendations.',
      Push: 'Don\'t miss out on your success! New features are waiting for you.'
    },
    'Power Users': {
      Email: 'You\'re crushing it! Ready to unlock even more power with our advanced features? Upgrade now with 20% off.',
      'In-app': 'You\'ve mastered the basics! Time to explore our advanced features designed for power users like you.',
      Push: 'New advanced features available! Perfect for power users like you.'
    },
    'New Users': {
      Email: 'Welcome to the team! Here\'s your personalized onboarding guide to help you succeed.',
      'In-app': 'Great to have you aboard! Let\'s get you set up for success with these key features.',
      Push: 'Ready to get started? Your personalized setup guide is here!'
    },
    'Dormant': {
      Email: 'We\'ve missed you! Here\'s what\'s new and how it can help your business grow.',
      'In-app': 'Welcome back! See what\'s improved since your last visit.',
      Push: 'Time to check in! New features are waiting for you.'
    }
  };

  return templates[segmentName as keyof typeof templates]?.[campaignType as keyof typeof templates['High Risk']] 
    || 'Personalized message will be generated based on user behavior and preferences.';
}

export function simulateAIProcessing(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('AI analysis complete');
    }, 1500);
  });
}

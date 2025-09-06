import React, { useState } from 'react';
import { segments } from '../data/sampleData';
import { generateCampaignMessage, simulateAIProcessing } from '../utils/ai';
import { Wand2, Send, Calendar, Users } from 'lucide-react';

interface CampaignBuilderProps {
  onViewChange: (view: string) => void;
}

export default function CampaignBuilder({ onViewChange }: CampaignBuilderProps) {
  const [step, setStep] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [message, setMessage] = useState('');
  const [timing, setTiming] = useState('immediate');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMessage = async () => {
    if (!selectedSegment || !campaignType) return;
    
    setIsGenerating(true);
    await simulateAIProcessing();
    
    const segmentName = segments.find(s => s.id === selectedSegment)?.name || '';
    const generatedMessage = generateCampaignMessage(segmentName, campaignType);
    setMessage(generatedMessage);
    setIsGenerating(false);
  };

  const handleNext = () => {
    if (step === 2 && !message) {
      handleGenerateMessage();
    }
    setStep(step + 1);
  };

  const handleLaunchCampaign = () => {
    // Simulate campaign launch
    alert('Campaign launched successfully!');
    onViewChange('performance');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Create Campaign</h1>
        <p className="text-gray-500 mt-1">Build personalized retention campaigns with AI</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-16 h-0.5 ml-4 ${
                step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Select Target Segment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map(segment => (
                <label key={segment.id} className="relative">
                  <input
                    type="radio"
                    name="segment"
                    value={segment.id}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedSegment === segment.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{segment.name}</h3>
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{segment.userCount} users</span>
                      <span className="font-medium">${segment.avgClv.toLocaleString()} avg CLV</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Choose Campaign Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Email', 'In-app', 'Push'].map(type => (
                <label key={type} className="relative">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={(e) => setCampaignType(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${
                    campaignType === type 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <h3 className="font-medium text-gray-900">{type}</h3>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">AI-Generated Message</h2>
              <button
                onClick={handleGenerateMessage}
                disabled={isGenerating}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Regenerate'}
              </button>
            </div>
            
            {isGenerating ? (
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">AI is crafting your message...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Preview:</h3>
                  <p className="text-gray-700 italic">{message || 'Generate a message to see preview'}</p>
                </div>
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="AI will generate a personalized message based on your segment and campaign type"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Set Timing</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timing"
                  value="immediate"
                  checked={timing === 'immediate'}
                  onChange={(e) => setTiming(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">Send immediately</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timing"
                  value="scheduled"
                  checked={timing === 'scheduled'}
                  onChange={(e) => setTiming(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">Schedule for later</span>
              </label>
            </div>
            
            {timing === 'scheduled' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select date and time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Campaign Summary */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Campaign Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segment:</span>
                  <span className="font-medium">{segments.find(s => s.id === selectedSegment)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{campaignType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">{segments.find(s => s.id === selectedSegment)?.userCount} users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timing:</span>
                  <span className="font-medium">{timing === 'immediate' ? 'Immediate' : 'Scheduled'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={(step === 1 && !selectedSegment) || (step === 2 && !campaignType)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleLaunchCampaign}
              disabled={!message}
              className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              Launch Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
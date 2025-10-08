import React from 'react';
import { CheckCircle } from 'lucide-react';
import { benefitsData } from '../data/gameData';
import NavigationBar from './NavigationBar';
import FeedbackNotification from './FeedbackNotification';

interface Benefit {
  id: number;
  text: string;
  points: number;
}

interface BenefitsScreenProps {
  strategyChoice: string;
  selectedBenefits: Benefit[];
  onToggleBenefit: (benefit: Benefit) => void;
  onContinue: () => void;
  onBack: () => void;
  onReset: () => void;
  feedback: Array<{ message: string; type: 'success' | 'error' }>;
  showFeedback: boolean;
}

export default function BenefitsScreen({
  strategyChoice,
  selectedBenefits,
  onToggleBenefit,
  onContinue,
  onBack,
  onReset,
  feedback,
  showFeedback
}: BenefitsScreenProps) {
  const availableBenefits = benefitsData[strategyChoice as keyof typeof benefitsData] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <FeedbackNotification feedback={feedback} showFeedback={showFeedback} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <NavigationBar showBack={true} backAction={onBack} onReset={onReset} />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Level 2: Customer Benefits</h2>
          <p className="text-sm text-gray-600 mb-6">Select 3-4 benefits</p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-900">Selected: <strong>{selectedBenefits.length} of 3-4</strong></p>
          </div>
          <div className="space-y-4 mb-8">
            {availableBenefits.map(benefit => {
              const isSelected = selectedBenefits.some(b => b.id === benefit.id);
              return (
                <div
                  key={benefit.id}
                  onClick={() => onToggleBenefit(benefit)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-gray-900">{benefit.text}</span>
                    {isSelected && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                  </div>
                </div>
              );
            })}
          </div>
          {selectedBenefits.length >= 3 && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold py-3 px-6 rounded-xl"
            >
              See Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { featuresData } from '../data/gameData';
import NavigationBar from './NavigationBar';
import FeedbackNotification from './FeedbackNotification';

interface Feature {
  id: number;
  name: string;
  points: number;
}

interface FeaturesScreenProps {
  strategyChoice: string;
  productCategory: string;
  selectedFeatures: Feature[];
  onToggleFeature: (feature: Feature) => void;
  onContinue: () => void;
  onBack: () => void;
  onReset: () => void;
  feedback: Array<{ message: string; type: 'success' | 'error' }>;
  showFeedback: boolean;
}

export default function FeaturesScreen({
  strategyChoice,
  productCategory,
  selectedFeatures,
  onToggleFeature,
  onContinue,
  onBack,
  onReset,
  feedback,
  showFeedback
}: FeaturesScreenProps) {
  const availableFeatures = featuresData[productCategory as keyof typeof featuresData]?.[strategyChoice as keyof typeof featuresData['personal-care']] || [];
  const misalignedFeatures = featuresData[productCategory as keyof typeof featuresData]?.misaligned || [];
  const allFeatures = [...(availableFeatures as Feature[]), ...(misalignedFeatures as Feature[])];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <FeedbackNotification feedback={feedback} showFeedback={showFeedback} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <NavigationBar showBack={true} backAction={onBack} onReset={onReset} />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Level 1: Product Features</h2>
          <p className="text-sm text-gray-600 mb-6">Select 3-5 features that align with your strategy</p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-900">Selected: <strong>{selectedFeatures.length} of 3-5</strong></p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {allFeatures.map(feature => {
              const isSelected = selectedFeatures.some(f => f.id === feature.id);
              const isAligned = feature.points > 0;
              return (
                <div
                  key={feature.id}
                  onClick={() => onToggleFeature(feature)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected ? (isAligned ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500') : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-gray-900 font-medium">{feature.name}</span>
                    {isSelected && (isAligned ? <CheckCircle className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-600 ml-2 flex-shrink-0" />)}
                  </div>
                </div>
              );
            })}
          </div>
          {selectedFeatures.length >= 3 && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold py-3 px-6 rounded-xl"
            >
              Continue to Benefits
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
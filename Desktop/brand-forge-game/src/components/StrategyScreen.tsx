import React from 'react';
import { Target } from 'lucide-react';
import { strategies } from '../data/gameData';
import NavigationBar from './NavigationBar';
import FeedbackNotification from './FeedbackNotification';

interface StrategyScreenProps {
  onSelectStrategy: (strategy: string) => void;
  onReset: () => void;
  feedback: Array<{ message: string; type: 'success' | 'error' }>;
  showFeedback: boolean;
}

export default function StrategyScreen({ onSelectStrategy, onReset, feedback, showFeedback }: StrategyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <FeedbackNotification feedback={feedback} showFeedback={showFeedback} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <NavigationBar showBack={true} backAction={() => window.location.reload()} onReset={onReset} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Phase 1: Strategic Direction</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(strategies).map(([key, strategy]) => (
              <div 
                key={key} 
                onClick={() => onSelectStrategy(key)}
                className="bg-white rounded-xl p-6 cursor-pointer border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{strategy.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Award } from 'lucide-react';

interface PhaseScoreScreenProps {
  currentPhaseScore: number;
  totalScore: number;
  onContinue: () => void;
}

export default function PhaseScoreScreen({ currentPhaseScore, totalScore, onContinue }: PhaseScoreScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Phase Complete!</h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white my-6">
            <div className="text-sm mb-1">Phase Score</div>
            <div className="text-5xl font-bold">{currentPhaseScore}</div>
            <div className="text-sm mt-2">Total: {totalScore}</div>
          </div>
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-shadow"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
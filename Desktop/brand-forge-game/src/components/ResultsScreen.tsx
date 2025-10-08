import React from 'react';
import { Award } from 'lucide-react';
import { strategies } from '../data/gameData';
import { calculateTier } from '../utils/gameHelpers';

interface ResultsScreenProps {
  totalScore: number;
  strategyChoice: string;
  productCategory: string;
  featuresCount: number;
  benefitsCount: number;
  onReset: () => void;
}

export default function ResultsScreen({
  totalScore,
  strategyChoice,
  productCategory,
  featuresCount,
  benefitsCount,
  onReset
}: ResultsScreenProps) {
  const tier = calculateTier(totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Award className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Brand Strategy Complete!</h1>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white my-6">
              <div className="text-6xl font-bold mb-2">{totalScore}</div>
              <div className="text-2xl font-semibold">{tier}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Brand Summary</h3>
            <div className="space-y-2">
              <p className="text-lg"><span className="font-semibold">Strategy:</span> {strategies[strategyChoice as keyof typeof strategies]?.name}</p>
              <p className="text-lg"><span className="font-semibold">Product Category:</span> {productCategory}</p>
              <p className="text-lg"><span className="font-semibold">Features Selected:</span> {featuresCount}</p>
              <p className="text-lg"><span className="font-semibold">Benefits Selected:</span> {benefitsCount}</p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-shadow"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
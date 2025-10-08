import React from 'react';
import { CheckCircle } from 'lucide-react';
import { strategies, productCategories } from '../data/gameData';
import NavigationBar from './NavigationBar';
import FeedbackNotification from './FeedbackNotification';

interface ProductScreenProps {
  strategyChoice: string;
  onSelectProduct: (categoryId: string, isGoodFit: boolean) => void;
  onBack: () => void;
  onReset: () => void;
  feedback: Array<{ message: string; type: 'success' | 'error' }>;
  showFeedback: boolean;
}

export default function ProductScreen({ 
  strategyChoice, 
  onSelectProduct, 
  onBack, 
  onReset, 
  feedback, 
  showFeedback 
}: ProductScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <FeedbackNotification feedback={feedback} showFeedback={showFeedback} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <NavigationBar showBack={true} backAction={onBack} onReset={onReset} />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Product Category</h2>
          <p className="text-sm text-gray-600 mb-6">
            Strategy: <span className="font-bold text-blue-600">{strategies[strategyChoice as keyof typeof strategies]?.name}</span>
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {productCategories.map(cat => {
              const isGoodFit = cat.fit.includes(strategyChoice);
              return (
                <div 
                  key={cat.id} 
                  onClick={() => onSelectProduct(cat.id, isGoodFit)}
                  className={`rounded-xl p-6 cursor-pointer border-2 transition-all hover:shadow-xl ${
                    isGoodFit ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
                  {isGoodFit && <CheckCircle className="w-6 h-6 text-green-600 mt-2" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Brand Forge</h1>
            <p className="text-xl text-gray-600">From Concept to Market Leader</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, Brand Manager!</h2>
            <p className="text-gray-700 mb-4">Create a complete brand strategy for NexGen Consumer Solutions.</p>
            <div className="bg-white rounded-lg p-4 mt-4">
              <p className="font-bold text-gray-900">Duration: 15-20 minutes</p>
              <p className="font-bold text-gray-900">Phases: Strategy → Product → Features → Benefits</p>
            </div>
          </div>
          <button 
            onClick={onStart} 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-shadow"
          >
            Start Your Brand Journey
          </button>
        </div>
      </div>
    </div>
  );
}
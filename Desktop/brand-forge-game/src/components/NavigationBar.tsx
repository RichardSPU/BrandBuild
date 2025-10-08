import React from 'react';
import { Home, ArrowLeft, RotateCcw } from 'lucide-react';

interface NavigationBarProps {
  showBack?: boolean;
  backAction?: (() => void) | null;
  onReset: () => void;
}

export default function NavigationBar({ showBack = false, backAction = null, onReset }: NavigationBarProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex gap-2">
        {showBack && backAction && (
          <button 
            onClick={backAction} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
        >
          <Home className="w-4 h-4" /> Home
        </button>
      </div>
      <button 
        onClick={onReset} 
        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
      >
        <RotateCcw className="w-4 h-4" /> Reset
      </button>
    </div>
  );
}
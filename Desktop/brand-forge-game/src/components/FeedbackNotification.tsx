import React from 'react';

interface Feedback {
  message: string;
  type: 'success' | 'error';
}

interface FeedbackNotificationProps {
  feedback: Feedback[];
  showFeedback: boolean;
}

export default function FeedbackNotification({ feedback, showFeedback }: FeedbackNotificationProps) {
  if (!showFeedback || feedback.length === 0) return null;
  
  const latest = feedback[feedback.length - 1];
  const bgColor = latest.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
  
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`${bgColor} border-l-4 p-4 rounded-lg shadow-lg`}>
        <p className="text-gray-900 font-medium">{latest.message}</p>
      </div>
    </div>
  );
}
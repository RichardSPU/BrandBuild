export const calculateTier = (score: number): string => {
  if (score >= 120) return 'Brand Master';
  if (score >= 90) return 'Senior Strategist';
  if (score >= 60) return 'Brand Manager';
  if (score >= 30) return 'Brand Coordinator';
  return 'Brand Apprentice';
};

export const checkAlignment = (selection: any, alignedOptions: any[]): boolean => {
  return alignedOptions.some(opt => opt.id === selection.id);
};
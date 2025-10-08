import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import StrategyScreen from './components/StrategyScreen';
import ProductScreen from './components/ProductScreen';
import FeaturesScreen from './components/FeaturesScreen';
import BenefitsScreen from './components/BenefitsScreen';
import PhaseScoreScreen from './components/PhaseScoreScreen';
import ResultsScreen from './components/ResultsScreen';
import { checkAlignment } from './utils/gameHelpers';
import { featuresData } from './data/gameData';

export default function BrandForgeGame() {
  const [gamePhase, setGamePhase] = useState('intro');
  const [strategyChoice, setStrategyChoice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [phaseScore, setPhaseScore] = useState(0);
  const [currentPhaseScore, setCurrentPhaseScore] = useState(0);
  const [showPhaseScore, setShowPhaseScore] = useState(false);
  const [decisions, setDecisions] = useState({
    features: [] as any[],
    benefits: [] as any[]
  });
  const [feedback, setFeedback] = useState<Array<{ message: string; type: 'success' | 'error' }>>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const resetGame = () => {
    setGamePhase('intro');
    setStrategyChoice('');
    setProductCategory('');
    setTotalScore(0);
    setPhaseScore(0);
    setCurrentPhaseScore(0);
    setShowPhaseScore(false);
    setDecisions({ features: [], benefits: [] });
    setFeedback([]);
    setShowFeedback(false);
  };

  const addScore = (points: number) => setPhaseScore(prev => prev + points);

  const commitPhaseScore = () => {
    setCurrentPhaseScore(phaseScore);
    setTotalScore(prev => prev + phaseScore);
    setShowPhaseScore(true);
    setPhaseScore(0);
  };

  const addFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback(prev => [...prev, { message, type }]);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const handleSelectStrategy = (strategy: string) => {
    setStrategyChoice(strategy);
    setGamePhase('product');
  };

  const handleSelectProduct = (categoryId: string, isGoodFit: boolean) => {
    setProductCategory(categoryId);
    const score = isGoodFit ? 10 : -10;
    addScore(score);
    addFeedback(isGoodFit ? 'Excellent alignment!' : 'Weak alignment', isGoodFit ? 'success' : 'error');
    setTimeout(() => commitPhaseScore(), 500);
  };

 const handleToggleFeature = (feature: any) => {
  const isSelected = decisions.features.some(f => f.id === feature.id);
  if (isSelected) {
    setDecisions(prev => ({ ...prev, features: prev.features.filter(f => f.id !== feature.id) }));
  } else if (decisions.features.length < 5) {
    setDecisions(prev => ({ ...prev, features: [...prev.features, feature] }));
    
    // Get available features for alignment check
    const categoryData = featuresData[productCategory as keyof typeof featuresData];
    const availableFeatures = categoryData ? (categoryData as any)[strategyChoice] || [] : [];
    
    const isAligned = checkAlignment(feature, availableFeatures);
    addScore(feature.points);
    addFeedback(isAligned ? 'Excellent choice!' : 'Weak alignment', isAligned ? 'success' : 'error');
  }
};

  const handleToggleBenefit = (benefit: any) => {
    const isSelected = decisions.benefits.some(b => b.id === benefit.id);
    if (isSelected) {
      setDecisions(prev => ({ ...prev, benefits: prev.benefits.filter(b => b.id !== benefit.id) }));
    } else if (decisions.benefits.length < 4) {
      setDecisions(prev => ({ ...prev, benefits: [...prev.benefits, benefit] }));
      addScore(benefit.points);
      addFeedback('Great benefit!', 'success');
    }
  };

  const handleContinueFromPhaseScore = () => {
    setShowPhaseScore(false);
    const phases = ['product', 'features', 'benefits', 'results'];
    const idx = phases.indexOf(gamePhase);
    if (idx >= 0 && idx < phases.length - 1) {
      setGamePhase(phases[idx + 1]);
    }
  };

  if (showPhaseScore) {
    return (
      <PhaseScoreScreen
        currentPhaseScore={currentPhaseScore}
        totalScore={totalScore}
        onContinue={handleContinueFromPhaseScore}
      />
    );
  }

  if (gamePhase === 'intro') {
    return <IntroScreen onStart={() => setGamePhase('strategy')} />;
  }

  if (gamePhase === 'strategy') {
    return (
      <StrategyScreen
        onSelectStrategy={handleSelectStrategy}
        onReset={resetGame}
        feedback={feedback}
        showFeedback={showFeedback}
      />
    );
  }

  if (gamePhase === 'product') {
    return (
      <ProductScreen
        strategyChoice={strategyChoice}
        onSelectProduct={handleSelectProduct}
        onBack={() => setGamePhase('strategy')}
        onReset={resetGame}
        feedback={feedback}
        showFeedback={showFeedback}
      />
    );
  }

  if (gamePhase === 'features') {
    return (
      <FeaturesScreen
        strategyChoice={strategyChoice}
        productCategory={productCategory}
        selectedFeatures={decisions.features}
        onToggleFeature={handleToggleFeature}
        onContinue={() => commitPhaseScore()}
        onBack={() => setGamePhase('product')}
        onReset={resetGame}
        feedback={feedback}
        showFeedback={showFeedback}
      />
    );
  }

  if (gamePhase === 'benefits') {
    return (
      <BenefitsScreen
        strategyChoice={strategyChoice}
        selectedBenefits={decisions.benefits}
        onToggleBenefit={handleToggleBenefit}
        onContinue={() => commitPhaseScore()}
        onBack={() => setGamePhase('features')}
        onReset={resetGame}
        feedback={feedback}
        showFeedback={showFeedback}
      />
    );
  }

  if (gamePhase === 'results') {
    return (
      <ResultsScreen
        totalScore={totalScore}
        strategyChoice={strategyChoice}
        productCategory={productCategory}
        featuresCount={decisions.features.length}
        benefitsCount={decisions.benefits.length}
        onReset={resetGame}
      />
    );
  }

  return null;
}
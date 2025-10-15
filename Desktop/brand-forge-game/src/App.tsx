import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, Target, Home, ArrowLeft, RotateCcw } from 'lucide-react';

export default function App() {
  const [gamePhase, setGamePhase] = useState('intro');
  const [strategyChoice, setStrategyChoice] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [phaseScore, setPhaseScore] = useState(0);
  const [currentPhaseScore, setCurrentPhaseScore] = useState(0);
  const [showPhaseScore, setShowPhaseScore] = useState(false);
  const [decisions, setDecisions] = useState({
    features: [], 
    benefits: [], 
    values: [], 
    personality: [], 
    essence: '', 
    brandName: '', 
    tagline: ''
  });
  const [feedback, setFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Product categories with strategies
  const categories = {
    smartphone: {
      name: 'Premium Smartphone',
      strategies: ['Innovation Leader', 'Value Champion', 'Lifestyle Brand']
    },
    sneakers: {
      name: 'Athletic Sneakers',
      strategies: ['Performance Focus', 'Fashion Forward', 'Sustainability Pioneer']
    },
    coffee: {
      name: 'Coffee Brand',
      strategies: ['Premium Artisan', 'Everyday Comfort', 'Health & Wellness']
    }
  };

  // Game data for each phase
  const gameData = {
    features: {
      title: 'Product Features',
      description: 'Select the key features that align with your strategy',
      options: {
        'Innovation Leader': [
          { id: 'ai-camera', text: 'AI-Powered Camera System', correct: true, points: 20 },
          { id: 'foldable', text: 'Foldable Display Technology', correct: true, points: 20 },
          { id: 'budget-price', text: 'Budget-Friendly Price Point', correct: false, points: 0 },
          { id: 'long-battery', text: 'Extended Battery Life', correct: true, points: 15 }
        ],
        'Value Champion': [
          { id: 'affordable', text: 'Competitive Pricing', correct: true, points: 20 },
          { id: 'reliable', text: 'Reliable Performance', correct: true, points: 20 },
          { id: 'luxury-materials', text: 'Luxury Materials', correct: false, points: 0 },
          { id: 'essential-features', text: 'Essential Features Only', correct: true, points: 15 }
        ],
        'Lifestyle Brand': [
          { id: 'sleek-design', text: 'Sleek, Premium Design', correct: true, points: 20 },
          { id: 'exclusive-colors', text: 'Exclusive Color Options', correct: true, points: 20 },
          { id: 'basic-specs', text: 'Basic Technical Specs', correct: false, points: 0 },
          { id: 'seamless-ecosystem', text: 'Seamless Ecosystem Integration', correct: true, points: 15 }
        ],
        'Performance Focus': [
          { id: 'advanced-cushioning', text: 'Advanced Cushioning Tech', correct: true, points: 20 },
          { id: 'lightweight', text: 'Ultra-Lightweight Materials', correct: true, points: 20 },
          { id: 'fashion-collab', text: 'Fashion Designer Collaboration', correct: false, points: 0 },
          { id: 'breathable', text: 'Enhanced Breathability', correct: true, points: 15 }
        ],
        'Fashion Forward': [
          { id: 'trendy-design', text: 'Trendy, Eye-Catching Design', correct: true, points: 20 },
          { id: 'limited-edition', text: 'Limited Edition Releases', correct: true, points: 20 },
          { id: 'performance-tech', text: 'Performance Technology Focus', correct: false, points: 0 },
          { id: 'celebrity-endorsed', text: 'Celebrity Endorsements', correct: true, points: 15 }
        ],
        'Sustainability Pioneer': [
          { id: 'recycled-materials', text: 'Recycled Materials', correct: true, points: 20 },
          { id: 'carbon-neutral', text: 'Carbon-Neutral Production', correct: true, points: 20 },
          { id: 'fast-fashion', text: 'Fast Fashion Approach', correct: false, points: 0 },
          { id: 'repairable', text: 'Repairable Design', correct: true, points: 15 }
        ],
        'Premium Artisan': [
          { id: 'single-origin', text: 'Single-Origin Beans', correct: true, points: 20 },
          { id: 'small-batch', text: 'Small-Batch Roasting', correct: true, points: 20 },
          { id: 'instant-coffee', text: 'Instant Coffee Line', correct: false, points: 0 },
          { id: 'tasting-notes', text: 'Detailed Tasting Notes', correct: true, points: 15 }
        ],
        'Everyday Comfort': [
          { id: 'consistent-taste', text: 'Consistent, Familiar Taste', correct: true, points: 20 },
          { id: 'affordable-price', text: 'Affordable Daily Price', correct: true, points: 20 },
          { id: 'exotic-blends', text: 'Exotic Rare Blends', correct: false, points: 0 },
          { id: 'convenient-packaging', text: 'Convenient Packaging', correct: true, points: 15 }
        ],
        'Health & Wellness': [
          { id: 'organic', text: 'Organic Certified', correct: true, points: 20 },
          { id: 'antioxidants', text: 'High Antioxidants', correct: true, points: 20 },
          { id: 'sugar-added', text: 'Added Sugar Flavors', correct: false, points: 0 },
          { id: 'functional', text: 'Functional Additives', correct: true, points: 15 }
        ]
      }
    },
    benefits: {
      title: 'Customer Benefits',
      description: 'Choose benefits that resonate with your target audience',
      options: {
        'Innovation Leader': [
          { id: 'cutting-edge', text: 'Stay ahead with cutting-edge technology', correct: true, points: 20 },
          { id: 'save-money', text: 'Save money on your purchase', correct: false, points: 0 },
          { id: 'productivity', text: 'Boost productivity and creativity', correct: true, points: 15 },
          { id: 'status', text: 'Show your tech-savvy status', correct: true, points: 15 }
        ],
        'Value Champion': [
          { id: 'best-value', text: 'Get the best value for your money', correct: true, points: 20 },
          { id: 'exclusive-tech', text: 'Access exclusive technology', correct: false, points: 0 },
          { id: 'reliable', text: 'Rely on proven performance', correct: true, points: 15 },
          { id: 'smart-choice', text: 'Make a smart, practical choice', correct: true, points: 15 }
        ],
        'Lifestyle Brand': [
          { id: 'express-style', text: 'Express your personal style', correct: true, points: 20 },
          { id: 'budget-friendly', text: 'Budget-friendly option', correct: false, points: 0 },
          { id: 'seamless-life', text: 'Seamlessly fits your life', correct: true, points: 15 },
          { id: 'elevate-image', text: 'Elevate your social image', correct: true, points: 15 }
        ],
        'Performance Focus': [
          { id: 'reach-goals', text: 'Reach your fitness goals faster', correct: true, points: 20 },
          { id: 'look-stylish', text: 'Look stylish at social events', correct: false, points: 0 },
          { id: 'reduce-injury', text: 'Reduce injury risk', correct: true, points: 15 },
          { id: 'train-harder', text: 'Train harder, recover faster', correct: true, points: 15 }
        ],
        'Fashion Forward': [
          { id: 'stand-out', text: 'Stand out from the crowd', correct: true, points: 20 },
          { id: 'athletic-performance', text: 'Maximize athletic performance', correct: false, points: 0 },
          { id: 'trend-setter', text: 'Be a trendsetter', correct: true, points: 15 },
          { id: 'versatile-style', text: 'Versatile style for any occasion', correct: true, points: 15 }
        ],
        'Sustainability Pioneer': [
          { id: 'positive-impact', text: 'Make a positive environmental impact', correct: true, points: 20 },
          { id: 'cheap-price', text: 'Get the cheapest price', correct: false, points: 0 },
          { id: 'conscious-choice', text: 'Feel good about your conscious choice', correct: true, points: 15 },
          { id: 'quality-lasts', text: 'Quality that lasts longer', correct: true, points: 15 }
        ],
        'Premium Artisan': [
          { id: 'taste-excellence', text: 'Experience exceptional taste', correct: true, points: 20 },
          { id: 'quick-caffeine', text: 'Quick caffeine fix', correct: false, points: 0 },
          { id: 'coffee-ritual', text: 'Elevate your coffee ritual', correct: true, points: 15 },
          { id: 'discover-flavors', text: 'Discover unique flavor profiles', correct: true, points: 15 }
        ],
        'Everyday Comfort': [
          { id: 'reliable-start', text: 'Reliable start to your day', correct: true, points: 20 },
          { id: 'impress-guests', text: 'Impress coffee connoisseurs', correct: false, points: 0 },
          { id: 'comfort-familiar', text: 'Comfort in familiar taste', correct: true, points: 15 },
          { id: 'affordable-daily', text: 'Affordable daily enjoyment', correct: true, points: 15 }
        ],
        'Health & Wellness': [
          { id: 'support-health', text: 'Support your health goals', correct: true, points: 20 },
          { id: 'indulgent-treat', text: 'Indulgent dessert-like treat', correct: false, points: 0 },
          { id: 'clean-energy', text: 'Clean, sustained energy', correct: true, points: 15 },
          { id: 'guilt-free', text: 'Guilt-free coffee experience', correct: true, points: 15 }
        ]
      }
    },
    values: {
      title: 'Brand Values',
      description: 'Select values that define your brand\'s character',
      options: {
        'Innovation Leader': [
          { id: 'innovation', text: 'Innovation', correct: true, points: 20 },
          { id: 'tradition', text: 'Tradition', correct: false, points: 0 },
          { id: 'excellence', text: 'Excellence', correct: true, points: 15 },
          { id: 'progress', text: 'Progress', correct: true, points: 15 }
        ],
        'Value Champion': [
          { id: 'accessibility', text: 'Accessibility', correct: true, points: 20 },
          { id: 'exclusivity', text: 'Exclusivity', correct: false, points: 0 },
          { id: 'reliability', text: 'Reliability', correct: true, points: 15 },
          { id: 'transparency', text: 'Transparency', correct: true, points: 15 }
        ],
        'Lifestyle Brand': [
          { id: 'sophistication', text: 'Sophistication', correct: true, points: 20 },
          { id: 'practicality', text: 'Practicality', correct: false, points: 0 },
          { id: 'creativity', text: 'Creativity', correct: true, points: 15 },
          { id: 'self-expression', text: 'Self-Expression', correct: true, points: 15 }
        ],
        'Performance Focus': [
          { id: 'achievement', text: 'Achievement', correct: true, points: 20 },
          { id: 'leisure', text: 'Leisure', correct: false, points: 0 },
          { id: 'determination', text: 'Determination', correct: true, points: 15 },
          { id: 'excellence-performance', text: 'Excellence', correct: true, points: 15 }
        ],
        'Fashion Forward': [
          { id: 'boldness', text: 'Boldness', correct: true, points: 20 },
          { id: 'conformity', text: 'Conformity', correct: false, points: 0 },
          { id: 'self-expression-fashion', text: 'Self-Expression', correct: true, points: 15 },
          { id: 'creativity-fashion', text: 'Creativity', correct: true, points: 15 }
        ],
        'Sustainability Pioneer': [
          { id: 'responsibility', text: 'Responsibility', correct: true, points: 20 },
          { id: 'convenience', text: 'Convenience', correct: false, points: 0 },
          { id: 'transparency-sustain', text: 'Transparency', correct: true, points: 15 },
          { id: 'care', text: 'Care', correct: true, points: 15 }
        ],
        'Premium Artisan': [
          { id: 'craftsmanship', text: 'Craftsmanship', correct: true, points: 20 },
          { id: 'mass-appeal', text: 'Mass Appeal', correct: false, points: 0 },
          { id: 'authenticity', text: 'Authenticity', correct: true, points: 15 },
          { id: 'quality', text: 'Quality', correct: true, points: 15 }
        ],
        'Everyday Comfort': [
          { id: 'dependability', text: 'Dependability', correct: true, points: 20 },
          { id: 'adventure', text: 'Adventure', correct: false, points: 0 },
          { id: 'warmth', text: 'Warmth', correct: true, points: 15 },
          { id: 'familiarity', text: 'Familiarity', correct: true, points: 15 }
        ],
        'Health & Wellness': [
          { id: 'wellbeing', text: 'Wellbeing', correct: true, points: 20 },
          { id: 'indulgence', text: 'Indulgence', correct: false, points: 0 },
          { id: 'vitality', text: 'Vitality', correct: true, points: 15 },
          { id: 'mindfulness', text: 'Mindfulness', correct: true, points: 15 }
        ]
      }
    },
    personality: {
      title: 'Brand Personality',
      description: 'Choose personality traits for your brand',
      options: {
        'Innovation Leader': [
          { id: 'visionary', text: 'Visionary', correct: true, points: 20 },
          { id: 'traditional', text: 'Traditional', correct: false, points: 0 },
          { id: 'confident', text: 'Confident', correct: true, points: 15 },
          { id: 'bold', text: 'Bold', correct: true, points: 15 }
        ],
        'Value Champion': [
          { id: 'friendly', text: 'Friendly', correct: true, points: 20 },
          { id: 'elitist', text: 'Elitist', correct: false, points: 0 },
          { id: 'honest', text: 'Honest', correct: true, points: 15 },
          { id: 'approachable', text: 'Approachable', correct: true, points: 15 }
        ],
        'Lifestyle Brand': [
          { id: 'sophisticated-personality', text: 'Sophisticated', correct: true, points: 20 },
          { id: 'casual', text: 'Casual', correct: false, points: 0 },
          { id: 'elegant', text: 'Elegant', correct: true, points: 15 },
          { id: 'inspiring', text: 'Inspiring', correct: true, points: 15 }
        ],
        'Performance Focus': [
          { id: 'driven', text: 'Driven', correct: true, points: 20 },
          { id: 'relaxed', text: 'Relaxed', correct: false, points: 0 },
          { id: 'powerful', text: 'Powerful', correct: true, points: 15 },
          { id: 'motivating', text: 'Motivating', correct: true, points: 15 }
        ],
        'Fashion Forward': [
          { id: 'daring', text: 'Daring', correct: true, points: 20 },
          { id: 'conservative', text: 'Conservative', correct: false, points: 0 },
          { id: 'expressive', text: 'Expressive', correct: true, points: 15 },
          { id: 'trendy', text: 'Trendy', correct: true, points: 15 }
        ],
        'Sustainability Pioneer': [
          { id: 'responsible-personality', text: 'Responsible', correct: true, points: 20 },
          { id: 'wasteful', text: 'Wasteful', correct: false, points: 0 },
          { id: 'caring', text: 'Caring', correct: true, points: 15 },
          { id: 'thoughtful', text: 'Thoughtful', correct: true, points: 15 }
        ],
        'Premium Artisan': [
          { id: 'refined', text: 'Refined', correct: true, points: 20 },
          { id: 'ordinary', text: 'Ordinary', correct: false, points: 0 },
          { id: 'passionate', text: 'Passionate', correct: true, points: 15 },
          { id: 'knowledgeable', text: 'Knowledgeable', correct: true, points: 15 }
        ],
        'Everyday Comfort': [
          { id: 'warm-personality', text: 'Warm', correct: true, points: 20 },
          { id: 'distant', text: 'Distant', correct: false, points: 0 },
          { id: 'reliable-personality', text: 'Reliable', correct: true, points: 15 },
          { id: 'comforting', text: 'Comforting', correct: true, points: 15 }
        ],
        'Health & Wellness': [
          { id: 'energetic', text: 'Energetic', correct: true, points: 20 },
          { id: 'sluggish', text: 'Sluggish', correct: false, points: 0 },
          { id: 'balanced', text: 'Balanced', correct: true, points: 15 },
          { id: 'nurturing', text: 'Nurturing', correct: true, points: 15 }
        ]
      }
    }
  };

  const essenceOptions = {
    'Innovation Leader': [
      { id: 'future', text: 'The Future, Today', correct: true, points: 30 },
      { id: 'reliable-choice', text: 'Your Reliable Choice', correct: false, points: 0 },
      { id: 'tech-pioneer', text: 'Technology Pioneer', correct: true, points: 25 }
    ],
    'Value Champion': [
      { id: 'smart-value', text: 'Smart Value for Everyone', correct: true, points: 30 },
      { id: 'luxury-status', text: 'Luxury Status Symbol', correct: false, points: 0 },
      { id: 'accessible-quality', text: 'Accessible Quality', correct: true, points: 25 }
    ],
    'Lifestyle Brand': [
      { id: 'style-statement', text: 'Your Style Statement', correct: true, points: 30 },
      { id: 'basic-tool', text: 'A Basic Tool', correct: false, points: 0 },
      { id: 'life-elevated', text: 'Life, Elevated', correct: true, points: 25 }
    ],
    'Performance Focus': [
      { id: 'unleash-potential', text: 'Unleash Your Potential', correct: true, points: 30 },
      { id: 'casual-wear', text: 'Casual Everyday Wear', correct: false, points: 0 },
      { id: 'performance-edge', text: 'The Performance Edge', correct: true, points: 25 }
    ],
    'Fashion Forward': [
      { id: 'style-revolution', text: 'Style Revolution', correct: true, points: 30 },
      { id: 'function-first', text: 'Function First', correct: false, points: 0 },
      { id: 'wearable-art', text: 'Wearable Art', correct: true, points: 25 }
    ],
    'Sustainability Pioneer': [
      { id: 'planet-positive', text: 'Planet-Positive Performance', correct: true, points: 30 },
      { id: 'disposable-fashion', text: 'Disposable Fashion', correct: false, points: 0 },
      { id: 'conscious-choice', text: 'The Conscious Choice', correct: true, points: 25 }
    ],
    'Premium Artisan': [
      { id: 'craft-cup', text: 'Crafted for Your Cup', correct: true, points: 30 },
      { id: 'quick-energy', text: 'Quick Energy Boost', correct: false, points: 0 },
      { id: 'coffee-artistry', text: 'Coffee Artistry', correct: true, points: 25 }
    ],
    'Everyday Comfort': [
      { id: 'daily-ritual', text: 'Your Daily Ritual', correct: true, points: 30 },
      { id: 'luxury-indulgence', text: 'Luxury Indulgence', correct: false, points: 0 },
      { id: 'comfort-cup', text: 'Comfort in Every Cup', correct: true, points: 25 }
    ],
    'Health & Wellness': [
      { id: 'wellness-cup', text: 'Wellness in Every Cup', correct: true, points: 30 },
      { id: 'sweet-treat', text: 'Sweet Treat Coffee', correct: false, points: 0 },
      { id: 'energize-naturally', text: 'Energize Naturally', correct: true, points: 25 }
    ]
  };

  const handleCategorySelect = (category) => {
    setProductCategory(category);
    setGamePhase('strategy');
  };

  const handleStrategySelect = (strategy) => {
    setStrategyChoice(strategy);
    setGamePhase('features');
  };

  const handleSelection = (phase, optionId, isCorrect, points) => {
    const newDecisions = { ...decisions };
    
    if (phase === 'essence') {
      newDecisions.essence = optionId;
      setDecisions(newDecisions);
      
      const earnedPoints = isCorrect ? points : 0;
      setCurrentPhaseScore(earnedPoints);
      setTotalScore(totalScore + earnedPoints);
      
      const newFeedback = isCorrect 
        ? { type: 'success', message: `Perfect! +${points} points` }
        : { type: 'error', message: 'Not quite aligned with your strategy' };
      
      setFeedback([newFeedback]);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        setGamePhase('naming');
      }, 2000);
      
      return;
    }
    
    const phaseArray = newDecisions[phase];
    const index = phaseArray.indexOf(optionId);
    const maxSelections = 3; // Limit to 3 selections per phase
    
    if (index > -1) {
      // Deselect
      phaseArray.splice(index, 1);
    } else {
      // Select - but check limit first
      if (phaseArray.length >= maxSelections) {
        return; // Don't allow more selections
      }
      phaseArray.push(optionId);
    }
    
    setDecisions(newDecisions);
  };

  const handlePhaseComplete = (phase) => {
    const phaseOptions = gameData[phase].options[strategyChoice];
    const selectedOptions = decisions[phase];
    
    let newFeedback = [];
    let phasePoints = 0;
    
    selectedOptions.forEach(selectedId => {
      const option = phaseOptions.find(opt => opt.id === selectedId);
      if (option) {
        if (option.correct) {
          phasePoints += option.points;
          newFeedback.push({ 
            type: 'success', 
            message: `${option.text}: +${option.points} points` 
          });
        } else {
          newFeedback.push({ 
            type: 'error', 
            message: `${option.text}: Not aligned with your strategy` 
          });
        }
      }
    });
    
    setFeedback(newFeedback);
    setShowFeedback(true);
    setPhaseScore(phasePoints);
    setTotalScore(totalScore + phasePoints);
    setCurrentPhaseScore(0);
    
    setTimeout(() => {
      setShowFeedback(false);
      setShowPhaseScore(true);
      
      setTimeout(() => {
        setShowPhaseScore(false);
        const phases = ['features', 'benefits', 'values', 'personality'];
        const currentIndex = phases.indexOf(phase);
        if (currentIndex < phases.length - 1) {
          setGamePhase(phases[currentIndex + 1]);
        } else {
          setGamePhase('essence');
        }
      }, 2500);
    }, 3000);
  };

  const handleBrandNameSubmit = () => {
    if (decisions.brandName.trim()) {
      setGamePhase('tagline');
    }
  };

  const handleTaglineSubmit = () => {
    if (decisions.tagline.trim()) {
      setGamePhase('results');
    }
  };

  const resetGame = () => {
    setGamePhase('intro');
    setStrategyChoice(null);
    setProductCategory(null);
    setTotalScore(0);
    setPhaseScore(0);
    setCurrentPhaseScore(0);
    setShowPhaseScore(false);
    setDecisions({
      features: [],
      benefits: [],
      values: [],
      personality: [],
      essence: '',
      brandName: '',
      tagline: ''
    });
    setFeedback([]);
    setShowFeedback(false);
    setShowResetConfirm(false);
  };

  const ScoreDisplay = ({ score, label }) => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg">
      <div className="text-sm font-medium opacity-90">{label}</div>
      <div className="text-3xl font-bold">{score}</div>
    </div>
  );

  if (gamePhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Target className="w-20 h-20 mx-auto mb-4 text-purple-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Brand Builder Game
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Master the art of brand strategy by building a compelling brand identity
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Product</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 bg-white hover:bg-purple-50"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{category.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {category.strategies.map((strategy, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        {strategy}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-3 text-blue-900">How to Play:</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">1.</span>
                <span>Choose a product category and brand strategy</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">2.</span>
                <span>Make strategic decisions about features, benefits, values, and personality</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">3.</span>
                <span>Create your brand name and tagline</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3">4.</span>
                <span>Earn points for choices that align with your strategy</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'strategy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <button
            onClick={() => setGamePhase('intro')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Categories
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Choose Your Brand Strategy
            </h2>
            <p className="text-center text-gray-600 mb-8">
              For your <span className="font-semibold text-purple-600">{categories[productCategory].name}</span>
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {categories[productCategory].strategies.map((strategy, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStrategySelect(strategy)}
                  className="p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 bg-white hover:bg-purple-50 text-center"
                >
                  <div className="text-2xl font-bold text-gray-800 mb-2">{strategy}</div>
                  <div className="text-sm text-gray-600">Click to select</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (['features', 'benefits', 'values', 'personality'].includes(gamePhase)) {
    const currentPhaseData = gameData[gamePhase];
    const options = currentPhaseData.options[strategyChoice];
    const maxSelections = 3;
    const currentSelections = decisions[gamePhase].length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Start Over
            </button>
            <ScoreDisplay score={totalScore} label="Total Score" />
          </div>

          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md">
                <h3 className="text-xl font-bold mb-4">Start Over?</h3>
                <p className="text-gray-600 mb-6">This will reset all your progress. Are you sure?</p>
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{currentPhaseData.title}</h2>
                  <p className="text-gray-600 mt-2">{currentPhaseData.description}</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
                  {currentSelections} / {maxSelections} selected
                </div>
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Strategy: {strategyChoice}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {options.map((option) => {
                const isSelected = decisions[gamePhase].includes(option.id);
                const canSelect = currentSelections < maxSelections || isSelected;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelection(gamePhase, option.id, option.correct, option.points)}
                    disabled={!canSelect}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : canSelect
                        ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-800">{option.text}</span>
                      {isSelected && <CheckCircle className="w-6 h-6 text-purple-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mb-6 space-y-2 animate-fadeIn">
                {feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg flex items-start ${
                      item.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {item.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                    )}
                    <span className={item.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                      {item.message}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {showPhaseScore && (
              <div className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-center animate-fadeIn">
                <div className="text-2xl font-bold mb-2">Phase Complete!</div>
                <div className="text-4xl font-bold">+{phaseScore} Points</div>
              </div>
            )}

            <button
              onClick={() => handlePhaseComplete(gamePhase)}
              disabled={currentSelections === 0 || showFeedback}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {currentSelections === 0 ? 'Select at least 1 option' : 'Submit Selections'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'essence') {
    const options = essenceOptions[strategyChoice];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Start Over
            </button>
            <ScoreDisplay score={totalScore} label="Total Score" />
          </div>

          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md">
                <h3 className="text-xl font-bold mb-4">Start Over?</h3>
                <p className="text-gray-600 mb-6">This will reset all your progress. Are you sure?</p>
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Brand Essence</h2>
              <p className="text-gray-600">Choose the core essence that captures your brand</p>
              <div className="text-sm text-purple-600 font-medium mt-2">
                Strategy: {strategyChoice}
              </div>
            </div>

            <div className="space-y-4">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelection('essence', option.id, option.correct, option.points)}
                  disabled={showFeedback}
                  className="w-full p-8 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 text-center disabled:opacity-50"
                >
                  <div className="text-2xl font-bold text-gray-800">{option.text}</div>
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mt-6 animate-fadeIn">
                {feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl text-center text-lg font-semibold ${
                      item.type === 'success'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-red-50 border-2 border-red-200 text-red-800'
                    }`}
                  >
                    {item.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'naming') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Start Over
            </button>
            <ScoreDisplay score={totalScore} label="Total Score" />
          </div>

          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md">
                <h3 className="text-xl font-bold mb-4">Start Over?</h3>
                <p className="text-gray-600 mb-6">This will reset all your progress. Are you sure?</p>
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Brand Name</h2>
              <p className="text-gray-600">Give your brand a memorable name</p>
              <div className="text-sm text-purple-600 font-medium mt-2">
                Strategy: {strategyChoice}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Brand Name
              </label>
              <input
                type="text"
                value={decisions.brandName}
                onChange={(e) => setDecisions({ ...decisions, brandName: e.target.value })}
                placeholder="Enter your brand name..."
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            <button
              onClick={handleBrandNameSubmit}
              disabled={!decisions.brandName.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Continue to Tagline
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'tagline') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Start Over
            </button>
            <ScoreDisplay score={totalScore} label="Total Score" />
          </div>

          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md">
                <h3 className="text-xl font-bold mb-4">Start Over?</h3>
                <p className="text-gray-600 mb-6">This will reset all your progress. Are you sure?</p>
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Tagline</h2>
              <p className="text-gray-600">Craft a compelling tagline for {decisions.brandName}</p>
              <div className="text-sm text-purple-600 font-medium mt-2">
                Strategy: {strategyChoice}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Tagline
              </label>
              <input
                type="text"
                value={decisions.tagline}
                onChange={(e) => setDecisions({ ...decisions, tagline: e.target.value })}
                placeholder="Enter your tagline..."
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            <button
              onClick={handleTaglineSubmit}
              disabled={!decisions.tagline.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              See Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'results') {
    const maxScore = 200;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let grade, message, color;
    if (percentage >= 90) {
      grade = 'A+';
      message = 'Outstanding! You\'ve created a highly coherent brand strategy!';
      color = 'from-green-500 to-emerald-600';
    } else if (percentage >= 80) {
      grade = 'A';
      message = 'Excellent work! Your brand strategy is well-aligned!';
      color = 'from-green-500 to-emerald-600';
    } else if (percentage >= 70) {
      grade = 'B';
      message = 'Good job! Your brand has a solid foundation!';
      color = 'from-blue-500 to-cyan-600';
    } else if (percentage >= 60) {
      grade = 'C';
      message = 'Not bad! There\'s room for improvement in your strategy!';
      color = 'from-yellow-500 to-orange-600';
    } else {
      grade = 'D';
      message = 'Keep practicing! Brand strategy takes time to master!';
      color = 'from-orange-500 to-red-600';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Award className="w-20 h-20 mx-auto mb-4 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Brand Complete!</h2>
              
              <div className={`inline-block bg-gradient-to-r ${color} text-white px-8 py-4 rounded-xl mb-4`}>
                <div className="text-6xl font-bold mb-2">{grade}</div>
                <div className="text-xl">{totalScore} / {maxScore} points</div>
              </div>
              
              <p className="text-xl text-gray-700 font-medium">{message}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Brand</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-purple-600 mb-1">Product Category</div>
                  <div className="text-xl text-gray-800">{categories[productCategory].name}</div>
                </div>
                
                <div>
                  <div className="text-sm font-semibold text-purple-600 mb-1">Strategy</div>
                  <div className="text-xl text-gray-800">{strategyChoice}</div>
                </div>
                
                <div>
                  <div className="text-sm font-semibold text-purple-600 mb-1">Brand Name</div>
                  <div className="text-3xl font-bold text-gray-800">{decisions.brandName}</div>
                </div>
                
                <div>
                  <div className="text-sm font-semibold text-purple-600 mb-1">Tagline</div>
                  <div className="text-xl italic text-gray-700">"{decisions.tagline}"</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

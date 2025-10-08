export const strategies = {
  premium: { name: "Premium Innovation Leader" },
  conscious: { name: "Conscious Community Builder" },
  everyday: { name: "Everyday Excellence Provider" }
};

export const featuresData = {
  'personal-care': {
    conscious: [
      { id: 1, name: '100% biodegradable packaging', points: 12 },
      { id: 2, name: 'Organic, locally-sourced ingredients', points: 10 },
      { id: 3, name: 'Refillable container system', points: 11 },
      { id: 4, name: 'Carbon-neutral production', points: 10 }
    ],
    premium: [
      { id: 11, name: 'Swiss-engineered precision formula', points: 12 },
      { id: 12, name: 'Rare botanical extracts', points: 11 },
      { id: 13, name: 'Clinical-grade active ingredients', points: 10 }
    ],
    everyday: [
      { id: 21, name: 'Multi-purpose functionality', points: 11 },
      { id: 22, name: 'Family-size value packs', points: 10 },
      { id: 23, name: 'Long-lasting 24hr protection', points: 12 }
    ],
    misaligned: [
      { id: 8, name: 'Luxury gold-leaf packaging', points: -15 },
      { id: 9, name: 'Exclusive limited editions', points: -12 }
    ]
  },
  'smart-home': {
    premium: [
      { id: 31, name: 'AI-powered automation', points: 12 },
      { id: 32, name: 'Scandinavian minimalist design', points: 11 },
      { id: 33, name: 'Advanced sensor technology', points: 12 }
    ],
    everyday: [
      { id: 41, name: 'Simple plug-and-play setup', points: 11 },
      { id: 42, name: 'Voice control compatibility', points: 10 },
      { id: 43, name: 'Energy-saving mode', points: 12 }
    ],
    conscious: [
      { id: 51, name: 'Solar-powered operation', points: 11 },
      { id: 52, name: 'Recycled materials construction', points: 10 },
      { id: 53, name: 'Energy monitoring display', points: 12 }
    ],
    misaligned: [
      { id: 58, name: 'Disposable components', points: -14 },
      { id: 59, name: 'High energy consumption', points: -15 }
    ]
  },
  'lifestyle': {
    premium: [
      { id: 61, name: 'Italian leather craftsmanship', points: 12 },
      { id: 62, name: 'Limited edition collections', points: 11 },
      { id: 63, name: 'Hand-finished details', points: 10 }
    ],
    conscious: [
      { id: 71, name: 'Upcycled materials', points: 11 },
      { id: 72, name: 'Ethical labor certification', points: 12 },
      { id: 73, name: 'Plant-based alternatives', points: 10 }
    ],
    everyday: [
      { id: 81, name: 'Versatile styling options', points: 11 },
      { id: 82, name: 'Machine washable', points: 10 },
      { id: 83, name: 'Affordable luxury feel', points: 12 }
    ],
    misaligned: [
      { id: 88, name: 'Fast fashion approach', points: -13 },
      { id: 89, name: 'Single-use designs', points: -14 }
    ]
  }
};

export const benefitsData = {
  conscious: [
    { id: 1, text: 'Reduces environmental footprint by 80%', points: 16 },
    { id: 2, text: 'Supports local farming communities', points: 14 },
    { id: 3, text: 'Healthier for you and the planet', points: 15 },
    { id: 4, text: 'Join a movement of conscious consumers', points: 17 }
  ],
  premium: [
    { id: 11, text: 'Exclusive access to innovation', points: 17 },
    { id: 12, text: 'Clinically proven superior results', points: 16 },
    { id: 13, text: 'Investment in lasting quality', points: 15 },
    { id: 14, text: 'Status symbol of refined taste', points: 14 }
  ],
  everyday: [
    { id: 21, text: 'Reliable performance you can trust', points: 16 },
    { id: 22, text: 'More value for your money', points: 17 },
    { id: 23, text: 'Simplifies your daily routine', points: 15 },
    { id: 24, text: 'Perfect for the whole family', points: 14 }
  ]
};

export const productCategories = [
  { id: 'personal-care', name: 'Eco-Friendly Personal Care', fit: ['conscious'] },
  { id: 'smart-home', name: 'Smart Home Appliances', fit: ['premium', 'everyday'] },
  { id: 'lifestyle', name: 'Urban Lifestyle Accessories', fit: ['premium', 'conscious', 'everyday'] }
];
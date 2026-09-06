// Shared data module. Files/folders under api/ prefixed with "_" are not
// deployed as their own serverless functions by Vercel.
const SERVICES = [
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    description: 'Regular or one-off cleaning for apartments and houses.',
    priceFrom: 80,
    icon: '🏠',
  },
  {
    id: 'office-cleaning',
    name: 'Office Cleaning',
    description: 'Scheduled cleaning for offices and commercial spaces.',
    priceFrom: 120,
    icon: '🏢',
  },
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'Thorough top-to-bottom cleaning, including hard-to-reach areas.',
    priceFrom: 150,
    icon: '🧽',
  },
  {
    id: 'move-cleaning',
    name: 'Move In / Move Out Cleaning',
    description: 'Full cleaning when moving into or out of a property.',
    priceFrom: 140,
    icon: '📦',
  },
  {
    id: 'window-cleaning',
    name: 'Window Cleaning',
    description: 'Streak-free interior and exterior window cleaning.',
    priceFrom: 60,
    icon: '🪟',
  },
  {
    id: 'post-construction-cleaning',
    name: 'Post-Construction Cleaning',
    description: 'Dust and debris removal after renovation or construction work.',
    priceFrom: 180,
    icon: '🧱',
  },
];

module.exports = { SERVICES };

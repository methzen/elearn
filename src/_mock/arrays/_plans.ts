// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    '/assets/icons/platforms/ic_sketch.svg',
    '/assets/icons/platforms/ic_figma.svg',
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'Basic',
    price: 19.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '1 course', isAvailable: true },
      { text: 'Community', isAvailable: true },
      { text: '1 moderators', isAvailable: true },
      { text: 'Chat', isAvailable: false },
      { text: 'Live Coaching', isAvailable: false },
    ],
    labelAction: 'choose Basic',
  },
  {
    subscription: 'Premium',
    price: 99.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '1 course', isAvailable: true },
      { text: 'Community', isAvailable: true },
      { text: '4 moderators', isAvailable: true },
      { text: 'Chat', isAvailable: true },
      { text: 'Live Coaching', isAvailable: true },
    ],
    labelAction: 'choose Premium',
  },
];

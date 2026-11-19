export interface SubNavTab {
  label: string;
  route: string;
  exact?: boolean;
}

export const SUSTAINABILITY_TABS: SubNavTab[] = [
  {label: 'Overview', route: '/sustainability', exact: true},
  {label: 'Cities & Commerce', route: '/sustainability/cities', exact: true},
  {label: 'Vertical Parking', route: '/sustainability/cities/parking'},
  {label: 'LA 2028', route: '/sustainability/cities/la'},
  {label: 'NY Vision', route: '/sustainability/cities/ny'},
  {label: 'Micro Mobility', route: '/sustainability/micro-mobility', exact: true},
  {label: 'Cycle Rickshaw', route: '/sustainability/micro-mobility/cycle-rickshaw'},
  {label: 'E-Mobility', route: '/sustainability/micro-mobility/e-mobility'},
];

export const TECH_TABS: SubNavTab[] = [
  {label: 'Tech & Why Bike', route: '/tech', exact: true},
  {label: 'Apps (Swift & GoSwift)', route: '/tech/app', exact: true},
  {label: 'Gamification (AR/VR)', route: '/tech/app/gamification'},
  {label: 'Smart Glass HUD', route: '/tech/app/hud'},
  {label: 'Route & Tuning', route: '/tech/features', exact: true},
  {label: 'Smartphone Fusion', route: '/tech/features/functions'},
  {label: 'Regenerative Brakes', route: '/tech/electric-brakes'},
];

export const BIKES_STORE_TABS: SubNavTab[] = [
  {label: 'Bike Customizer', route: '/bikes', exact: true},
  {label: 'Store & H₂E-Bike', route: '/store', exact: true},
  {label: 'Concept Lab', route: '/store/concept'},
  {label: 'Rider Club & Stories', route: '/club'},
];

export const INFO_TABS: SubNavTab[] = [
  {label: 'BicycleBrain Info', route: '/info', exact: true},
  {label: 'About AI Mission', route: '/about'},
  {label: 'Contact', route: '/info/contact', exact: true},
  {label: 'App Privacy Policy', route: '/info/contact/app-privacy-policy'},
  {label: 'EULA', route: '/info/contact/eula'},
];

export interface BenefitItem {
  title: string;
  detail: string;
  metric: string;
  icon: string;
  audience: 'rider' | 'planet';
}

export const RIDER_BENEFITS: BenefitItem[] = [
  {
    title: 'Improved Physical & Heart Health',
    detail:
      'Consistent pedaling builds cardiovascular strength, tones muscles, supports healthy weight management, and lowers long-term risks of heart disease and hypertension.',
    metric: '+35 min daily cardio',
    icon: 'favorite',
    audience: 'rider',
  },
  {
    title: 'Metabolic & Diabetes Prevention',
    detail:
      'Low-impact aerobic cycling helps regulate blood sugar, improves insulin sensitivity, and turns everyday errands into sustainable movement without extra gym trips.',
    metric: 'Low-impact daily activity',
    icon: 'monitor_heart',
    audience: 'rider',
  },
  {
    title: 'Better Mental Health & Clarity',
    detail:
      'Fresh air, daylight, and rhythmic motion reduce commuting stress and anxiety, lift mood, and return calm focus before and after the workday.',
    metric: 'Cortisol & stress relief',
    icon: 'self_improvement',
    audience: 'rider',
  },
  {
    title: 'Meaningful Cost Savings',
    detail:
      'Eliminate daily fuel purchases, parking meter fees, and auto insurance premiums—freeing discretionary household budget for local cafés and experiences.',
    metric: 'Zero fuel expense',
    icon: 'savings',
    audience: 'rider',
  },
];

export const PLANET_BENEFITS: BenefitItem[] = [
  {
    title: 'Zero Tailpipe Air Pollution',
    detail:
      'Replacing short urban car trips eliminates exhaust particulates and nitrogen oxides, restoring cleaner air for residents, school zones, and local wildlife.',
    metric: '0 g/km tailpipe exhaust',
    icon: 'air',
    audience: 'planet',
  },
  {
    title: 'Lower Greenhouse Gas Emissions',
    detail:
      'Human-powered and lightweight electric cycling dramatically cuts daily carbon footprints while moving far more mass-efficiently than two-ton passenger cars.',
    metric: '~210 g CO₂ saved / km',
    icon: 'eco',
    audience: 'planet',
  },
  {
    title: 'Less Congestion & Quieter Streets',
    detail:
      'Compact two-wheel footprints unlock road throughput, shorten travel times, and replace engine roar with quiet neighborhood soundscapes.',
    metric: '8x less street footprint',
    icon: 'traffic',
    audience: 'planet',
  },
  {
    title: 'Reduced Reliance on Oil',
    detail:
      'Shifting short trips to muscle power and rechargeable battery cells shields local economies from volatile foreign and domestic fuel supply shocks.',
    metric: 'People & clean-grid powered',
    icon: 'bolt',
    audience: 'planet',
  },
];

export const CITIES_COMMERCE_POINTS = [
  {
    title: 'Easy Access & Quick Stops',
    description:
      'Cyclists roll smoothly past traffic and park steps from shop doors, encouraging spontaneous stops at bakeries, grocers, and neighborhood makers.',
    icon: 'storefront',
  },
  {
    title: 'More Foot Traffic, Less Parking Hassle',
    description:
      'Removing frustrating meter searches and parking circling turns streets into welcoming plazas where visitors linger longer and browse multiple shops.',
    icon: 'directions_walk',
  },
  {
    title: 'Local Discretionary Spending',
    description:
      'Savings on gas, parking garages, and auto maintenance stay right inside the neighborhood—flowing back into independent restaurants and boutiques.',
    icon: 'local_cafe',
  },
  {
    title: 'Community Connection',
    description:
      'Riding at human speed connects neighbors with street trees, local landmarks, and seasonal pop-ups that remain invisible behind car windshields.',
    icon: 'groups',
  },
];

export const VERTICAL_PARKING_PILLARS = [
  {
    title: 'Saves Sidewalk Space',
    description:
      'Stores bicycles vertically in an architectural column with a minimal street-level footprint, returning sidewalks to pedestrians and trees.',
    icon: 'compress',
  },
  {
    title: 'Fast Automated Drop & Retrieve',
    description:
      'Drop your bicycle in at street level and retrieve it at the push of a button—an automated mechanical elevator inspired by a PEZ dispenser.',
    icon: 'elevator',
  },
  {
    title: 'Secure & Weatherproof',
    description:
      'Enclosed overhead storage shields saddles, chains, and electronics from rain, harsh sun, vandalism, and opportunistic street theft.',
    icon: 'verified_user',
  },
  {
    title: 'Encourages Daily Adoption',
    description:
      'Removing anxiety over missing or crowded bike racks makes commuting by bicycle the easiest, most reliable daily choice.',
    icon: 'pedal_bike',
  },
];

export const CYCLE_RICKSHAW_ADVANTAGES = [
  {
    title: 'Reduced Vandalism & Higher Durability',
    description:
      'Electric-assisted bike cabs are purpose-built for heavy passenger cycles, making them far less vulnerable to casual tossing or premature wear than light dockless scooters.',
  },
  {
    title: 'Designated Station Rebalancing',
    description:
      'Stationing pedicabs at dedicated city hubs and garages eliminates expensive overnight vans hunting scattered scooters across blocks.',
  },
  {
    title: 'Driver Accountability & Care',
    description:
      'A trained operator stays paired with each vehicle—spot-checking brakes, battery health, and rider safety after every shift.',
  },
  {
    title: 'Stronger Tourism & Sponsorship Revenue',
    description:
      'Guided neighborhood tours and generous wrap panels create sustainable fare and local brand partnership streams.',
  },
  {
    title: 'Local Job Creation & Goodwill',
    description:
      'Rather than leaving sidewalks cluttered, pedicab fleets generate steady dignified work and warm public goodwill with residents and city planners.',
  },
];

export const ASHBIKE_APPS = [
  {
    name: 'AshBike Companion',
    platform: 'iOS & Android · Google Health Connect',
    status: 'Phase One Prototype',
    summary:
      'Real-time wind and weather updates, live speed and distance tracking, terrain preferences, traffic avoidance, and optional two-way sync with Google Health Connect.',
    highlights: ['Live wind & weather telemetry', 'Local-first privacy storage', 'Google Health Connect sync'],
    icon: 'smartphone',
  },
  {
    name: 'Swift Bike Shift',
    platform: 'Android · San Francisco Transit',
    status: 'Early Alpha',
    summary:
      'Locate downtown San Francisco shared bike stations via map pins or quick next/previous controls, inspect nearby cafés and POIs, and launch Google Maps cycling directions.',
    highlights: ['Downtown SF station lookup', 'POI discovery integration', 'Calendar bike reservations (roadmap)'],
    icon: 'map',
  },
  {
    name: 'GoSwift Fitness',
    platform: 'iOS · Apple Health & Calendar',
    status: 'Active Concept',
    summary:
      'Turns everyday shared bike rides into gym sessions—syncing calendar events, steps, distance, and heart health to award eco-NFTs redeemable for real-world gear.',
    highlights: ['Calendar-to-bike matching', 'Apple Health heart & step tracking', 'NFT awards for real-world merch'],
    icon: 'emoji_events',
  },
  {
    name: 'Go Swift WearOS',
    platform: 'WearOS Smartwatch',
    status: 'In Development',
    summary:
      'Glanceable watch face bringing live ride metrics, remaining shared-dock availability, and quick trip timers right onto the rider’s wrist.',
    highlights: ['Wrist-ready ride telemetry', 'Quick station timer', 'Minimal distraction UI'],
    icon: 'watch',
  },
];

export const FUSION_SENSORS = [
  {name: 'Accelerometer & Gyroscope', role: 'Monitors lean angle, acceleration, and sudden impacts for automatic Crash SOS alerts.'},
  {name: 'GPS & Barometer', role: 'Tracks route geometry, elevation gain, and predictive remaining battery horizon.'},
  {name: 'Magnetometer & Ambient Light', role: 'Calibrates compass heading and auto-dims smart headlights in dusk tunnels.'},
  {name: 'Proximity & On-Device Camera AI', role: 'Powers computer-vision hazard detection and low-latency audio/haptic warnings.'},
  {name: 'BLE 5.3, NFC & 5G', role: 'Unlocks frames, tunes electronic suspension, and shares verified SOS coordinates when needed.'},
  {name: 'Dedicated Neural Engine', role: 'Runs obstacle classification and rider fatigue smoothing privately on the rider’s phone.'},
];

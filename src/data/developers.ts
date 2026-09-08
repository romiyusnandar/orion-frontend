export type RoleTier = 'admin' | 'founder' | 'core' | 'support' | 'design' | 'maintainer';

export interface Developer {
  name: string;
  role: string;
  tier: RoleTier;
  github?: string;
  telegram?: string;
  avatar?: string;
  devices?: string[];
}

export const developers: Developer[] = [
  {
    name: 'Hirokixd',
    role: 'Founder',
    tier: 'founder',
    github: 'https://github.com/Wrdn28',
    telegram: 'https://t.me/Hirokixd28',
    avatar: 'https://i.ibb.co.com/X3wQXyb/hiro.jpg',
    devices: ['Redmi Note 8/8T · ginkgo'],
  },
  {
    name: 'RyuDev',
    role: 'Co Founder',
    tier: 'founder',
    github: 'https://github.com/romiyusnandar',
    telegram: 'https://t.me/RyuDev21',
    avatar: 'https://i.ibb.co.com/7ytJ7Mw/romiz.jpg',
    devices: ['Mi A1 · tissot', 'Redmi Note 10 Pro · sweet'],
  },
  {
    name: 'Onle',
    role: 'Core Developer',
    tier: 'core',
    github: 'https://github.com/michionle',
    telegram: 'https://t.me/michionlee',
    avatar: 'https://i.ibb.co.com/vYnMZrw/onlee.jpg',
  },
  { name: 'Michael Pasep', role: 'Group Support', tier: 'support', telegram: 'https://t.me/rynothingspecial' },
  {
    name: 'Iverz',
    role: 'UI/UX Designer',
    tier: 'design',
    github: 'https://github.com/asterixiverz',
    telegram: 'https://t.me/iverzasterix',
    avatar: 'https://i.ibb.co.com/GHrSRGW/ivzz-square.jpg',
  },
  {
    name: 'rohmanurip',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/rohmanurip',
    telegram: 'https://t.me/haru_sama',
    avatar: 'https://i.ibb.co.com/RpWYFjTw/photo-4150782744658552786-c.jpg',
    devices: ['Poco F4 · munch'],
  },
  {
    name: 'Skyy | Arata',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/HinohArata',
    telegram: 'https://t.me/xSkyyHinohara',
    avatar: 'https://i.ibb.co.com/twJHJ2QW/IMG-20251215-090013-529.jpg',
    devices: ['Poco X3 NFC · surya'],
  },
  {
    name: 'Jayed Khan',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/Jayedkhan800',
    telegram: 'https://t.me/Jayedkhan70',
    avatar: 'https://i.ibb.co.com/fdpWBs1M/jayedkhan.jpg',
    devices: ['Redmi 9A · blossom'],
  },
  {
    name: "Maul's",
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/Maulanariaddy',
    telegram: 'https://t.me/Maulanariaddy',
    avatar: 'https://i.ibb.co.com/HpgbK1Gn/IMG-20251216-103719-947.jpg',
    devices: ['Poco F5 · marble'],
  },
  {
    name: 'Yaseakun',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/skenakun',
    telegram: 'https://t.me/Yaseakun',
    avatar: 'https://i.ibb.co.com/4wnkckYX/IMG-20251216-112848-460.jpg',
    devices: ['Poco F3 · alioth'],
  },
  {
    name: 'Rams 05th',
    role: 'Maintainer',
    tier: 'maintainer',
    telegram: 'https://t.me/ramshell688',
    avatar: 'https://i.ibb.co.com/hR4LmDrP/IMG-20251216-205303-577.jpg',
    devices: ['Poco F6 / Redmi Turbo 3 · peridot', 'Poco F7 · onyx'],
  },
  {
    name: 'hydr',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/zylhdrXP',
    telegram: 'https://t.me/ZylhdrXP',
    avatar: 'https://i.ibb.co.com/Y4FtBK11/heydr.jpg',
    devices: ['Redmi Note 13 Pro 5G · garnet'],
  },
  {
    name: 'Aranya',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/AloozChips',
    telegram: 'https://t.me/AloozChips',
    avatar: 'https://i.ibb.co.com/S4LjSQ3k/aranya.jpg',
    devices: ['Redmi 10C / 10 Power · fog'],
  },
  {
    name: 'kidzz',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/kidzz1965',
    telegram: 'https://t.me/kidzz_25',
    avatar: 'https://i.ibb.co.com/B5bq1yN8/kidzz.jpg',
    devices: ['Poco M3 / Redmi 9T · chime'],
  },
  {
    name: 'Lost Interest #afk',
    role: 'Maintainer',
    tier: 'maintainer',
    telegram: 'https://t.me/icaninpasar',
    avatar: 'https://i.ibb.co.com/CsVgKy5x/IMG-20251223-184327-872.jpg',
    devices: ['Asus Zenfone Max Pro M1 · x00td'],
  },
];

export function getDeveloper(name: string): Developer | undefined {
  return developers.find((d) => d.name === name);
}

const AVATAR_PALETTE = [
  'oklch(60.9% 0.126 221.723)',
  '#0ea5e9',
  '#0d9488',
  '#ca8a04',
  '#db2777',
  '#0284c7',
  '#dc2626',
  '#2563eb',
];

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

export function initials(name: string): string {
  const parts = name.replace(/[#|]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

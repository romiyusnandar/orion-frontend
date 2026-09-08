export type RoleTier = 'admin' | 'founder' | 'core' | 'support' | 'design' | 'maintainer';

export interface Developer {
  name: string;
  role: string;
  tier: RoleTier;
  github?: string;
  telegram?: string;
  devices?: string[];
}

export const developers: Developer[] = [
  { name: 'OrionOS Admin', role: 'Admin', tier: 'admin', github: 'https://github.com/orionos', telegram: 'https://t.me/orionos' },
  {
    name: 'Hirokixd',
    role: 'Founder',
    tier: 'founder',
    github: 'https://github.com/Wrdn28',
    telegram: 'https://t.me/Hirokixd28',
    devices: ['Redmi Note 8/8T · ginkgo'],
  },
  {
    name: 'RyuDev',
    role: 'Co Founder',
    tier: 'founder',
    github: 'https://github.com/romiyusnandar',
    telegram: 'https://t.me/RyuDev21',
    devices: ['Mi A1 · tissot', 'Redmi Note 10 Pro · sweet'],
  },
  { name: 'Onle', role: 'Core Developer', tier: 'core', github: 'https://github.com/michionle', telegram: 'https://t.me/michionlee' },
  { name: 'Michael Pasep', role: 'Group Support', tier: 'support', telegram: 'https://t.me/rynothingspecial' },
  { name: 'Iverz', role: 'UI/UX Designer', tier: 'design', github: 'https://github.com/asterixiverz', telegram: 'https://t.me/iverzasterix' },
  {
    name: 'rohmanurip',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/rohmanurip',
    telegram: 'https://t.me/haru_sama',
    devices: ['Poco F4 · munch'],
  },
  {
    name: 'Skyy | Arata',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/HinohArata',
    telegram: 'https://t.me/xSkyyHinohara',
    devices: ['Poco X3 NFC · surya'],
  },
  {
    name: 'Jayed Khan',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/Jayedkhan800',
    telegram: 'https://t.me/Jayedkhan70',
    devices: ['Redmi 9A · blossom'],
  },
  {
    name: "Maul's",
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/Maulanariaddy',
    telegram: 'https://t.me/Maulanariaddy',
    devices: ['Poco F5 · marble'],
  },
  {
    name: 'Yaseakun',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/skenakun',
    telegram: 'https://t.me/Yaseakun',
    devices: ['Poco F3 · alioth'],
  },
  {
    name: 'Rams 05th',
    role: 'Maintainer',
    tier: 'maintainer',
    telegram: 'https://t.me/ramshell688',
    devices: ['Poco F6 / Redmi Turbo 3 · peridot', 'Poco F7 · onyx'],
  },
  {
    name: 'hydr',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/zylhdrXP',
    telegram: 'https://t.me/ZylhdrXP',
    devices: ['Redmi Note 13 Pro 5G · garnet'],
  },
  {
    name: 'Aranya',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/AloozChips',
    telegram: 'https://t.me/AloozChips',
    devices: ['Redmi 10C / 10 Power · fog'],
  },
  {
    name: 'kidzz',
    role: 'Maintainer',
    tier: 'maintainer',
    github: 'https://github.com/kidzz1965',
    telegram: 'https://t.me/kidzz_25',
    devices: ['Poco M3 / Redmi 9T · chime'],
  },
  {
    name: 'Lost Interest #afk',
    role: 'Maintainer',
    tier: 'maintainer',
    telegram: 'https://t.me/icaninpasar',
    devices: ['Asus Zenfone Max Pro M1 · x00td'],
  },
];

const AVATAR_PALETTE = [
  '#4f46e5',
  '#0ea5e9',
  '#0d9488',
  '#ca8a04',
  '#db2777',
  '#7c3aed',
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

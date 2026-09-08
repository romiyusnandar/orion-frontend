export const site = {
  name: 'Orion OS',
  shortName: 'Orion',
  tagline: 'Pure Performance.',
  description:
    'Experience Android the way it was meant to be. Lightweight, secure and beautiful — a minimal custom ROM built for speed and privacy.',
  url: 'https://www.orionos-project.com',
  telegram: 'https://t.me/OrionOS_Update',
  github: 'https://github.com/OrionOS-Project',
  kofi: 'https://ko-fi.com/teamorion',
  paypal: 'https://paypal.me/Romiyusnandar',
  support: 'https://t.me/RyuDev21',
};

export interface NavLink {
  href: string;
  label: string;
}

export const nav: NavLink[] = [
  { href: '/devices', label: 'Download' },
  { href: '/changelogs', label: 'Changelogs' },
  { href: '/developers', label: 'Developers' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export const features: Feature[] = [
  {
    icon: 'gauge',
    title: 'High Performance',
    desc: 'Lightning-fast performance with optimized code and minimal bloat. Smooth multitasking and instant app launches.',
  },
  {
    icon: 'feather',
    title: 'Minimalist Design',
    desc: 'A clean, distraction-free interface that puts content first. Beautiful simplicity meets powerful functionality.',
  },
  {
    icon: 'sliders',
    title: 'Feature Rich',
    desc: 'Packed with powerful features and customization options. Everything you need, nothing you don’t.',
  },
  {
    icon: 'users',
    title: 'Active Community',
    desc: 'Join thousands of users and developers. Get support, share mods, and shape the future together.',
  },
];

export const stats: { value: string; label: string }[] = [
  { value: '14', label: 'Supported devices' },
  { value: 'Android 16', label: 'Latest release' },
  { value: '100%', label: 'Open source' },
];

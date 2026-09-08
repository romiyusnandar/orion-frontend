export type BuildType = 'GAPPS' | 'VANILLA';

export interface DeviceBuild {
  name: string;
  type: BuildType;
  size: string;
  date: string;
  url: string;
  whatsNew?: string[];
}

export interface Maintainer {
  name: string;
  role: string;
  github?: string;
  telegram?: string;
}

export interface Device {
  code: string;
  name: string;
  status: 'active' | 'discontinued';
  maintainer: Maintainer;
  builds: DeviceBuild[];
}

export const devices: Device[] = [
  {
    code: 'x00td',
    name: 'Asus Zenfone Max Pro M1',
    status: 'active',
    maintainer: { name: 'Lost Interest #afk', role: 'Maintainer', telegram: 'https://t.me/icaninpasar' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.6 GB',
        date: '25 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/x00td/OrionOS-16.0-Ozone-X00TD-Official-Vanilla-20251224.zip/download',
        whatsNew: [
          'Initial Official Orion build',
          'Ship with 4.19.x.x TheoneMemory',
          'Improve performance and stability',
          'Rooted by default kernel',
          'Use Apps KernelSU Next v1.0.8',
        ],
      },
    ],
  },
  {
    code: 'tissot',
    name: 'Mi A1',
    status: 'discontinued',
    maintainer: { name: 'RyuDev', role: 'Co Founder', github: 'https://github.com/romiyusnandar', telegram: 'https://t.me/RyuDev21' },
    builds: [
      {
        name: 'OrionOS-Andromeda',
        type: 'VANILLA',
        size: '921.6 MB',
        date: '27 Oct 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/tissot/OrionOS-14.0-Andromeda-tissot-OFFICIAL-Vanilla-20241027.zip/download',
        whatsNew: ['Sorry I forgot about this'],
      },
      {
        name: 'OrionOS-Centauri',
        type: 'VANILLA',
        size: '1.2 GB',
        date: '25 Aug 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/tissot/OrionOS-14.0-Centauri-tissot-OFFICIAL-Gapps-20240824.zip/download',
        whatsNew: ['Initial official release', 'Initial QPR3 A14 build', 'Sign build', 'Treble build'],
      },
    ],
  },
  {
    code: 'alioth',
    name: 'Poco F3',
    status: 'active',
    maintainer: { name: 'Yaseakun', role: 'Maintainer', github: 'https://github.com/skenakun', telegram: 'https://t.me/Yaseakun' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.4 GB',
        date: '24 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/alioth/OrionOS-16.0-Ozone-alioth-Official-GApps-20251223.zip/download',
        whatsNew: [
          'Increase SurfaceFlinger idle and touch timers',
          'Extend buffer size to 256kb for offload playback',
          'Address sepolicy denial for NFC',
          'powerhint: boost GPU freq during interaction',
          'Provide thermal profile permissions',
          'Add the customized max cached processes number',
          'Restore default swappiness parameters',
          'Add new HBM, DC Dimming, GameBar, Refresh Rate UI',
          'Upgrade vendor.qti.hardware.bluetooth_audio to 2.1',
          'Configure high touch sampling rate nodes',
          'Fixed NFC and microphone issue',
        ],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.6 GB',
        date: '24 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/alioth/OrionOS-16.0-Ozone-alioth-Official-Vanilla-20251223.zip/download',
        whatsNew: [
          'Increase SurfaceFlinger idle and touch timers',
          'Extend buffer size to 256kb for offload playback',
          'Address sepolicy denial for NFC',
          'powerhint: boost GPU freq during interaction',
          'Provide thermal profile permissions',
          'Add the customized max cached processes number',
          'Restore default swappiness parameters',
          'Add new HBM, DC Dimming, GameBar, Refresh Rate UI',
          'Upgrade vendor.qti.hardware.bluetooth_audio to 2.1',
          'Configure high touch sampling rate nodes',
          'Fixed NFC and microphone issue',
        ],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.4 GB',
        date: '19 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/alioth/OrionOS-16.0-Ozone-alioth-Official-GApps-20251219.zip/download',
        whatsNew: ['Initial OrionOS A16 Release', 'GApps and Vanilla Build', 'The ROM comes rooted by default.'],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.6 GB',
        date: '19 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/alioth/OrionOS-16.0-Ozone-alioth-Official-Vanilla-20251219.zip/download',
        whatsNew: ['Initial OrionOS A16 Release', 'GApps and Vanilla Build', 'The ROM comes rooted by default.'],
      },
    ],
  },
  {
    code: 'munch',
    name: 'Poco F4',
    status: 'active',
    maintainer: { name: 'rohmanurip', role: 'Maintainer', github: 'https://github.com/rohmanurip', telegram: 'https://t.me/haru_sama' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.6 GB',
        date: '31 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/munch/OrionOS-16.0-Ozone-munch-Official-Vanilla-20251231.zip/download',
        whatsNew: ['Hotfix', 'Switch to FusionX 2.1 RKSU + SUSFS', 'Include firmware OS1.0.9.0.ULMMIXM', 'Remove GameBar', 'Fix offline charging blank'],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.6 GB',
        date: '31 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/munch/OrionOS-16.0-Ozone-munch-Official-GApps-20251231.zip/download',
        whatsNew: ['Hotfix', 'Switch to FusionX 2.1 RKSU + SUSFS', 'Include firmware OS1.0.9.0.ULMMIXM', 'Remove GameBar', 'Fix offline charging blank'],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.5 GB',
        date: '15 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/munch/OrionOS-16.0-Ozone-munch-Official-GApps-20251214.zip/download',
        whatsNew: ['GApps & Vanilla build is served', 'Dolby, Leica Cam, GameBar included', 'RKSu + SUSFS inbuilt', 'Encrypted user try TWRP (olzhas), decrypted user use SKKK'],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.7 GB',
        date: '15 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/munch/OrionOS-16.0-Ozone-munch-Official-Vanilla-20251214.zip/download',
        whatsNew: ['GApps & Vanilla build is served', 'Dolby, Leica Cam, GameBar included', 'RKSu + SUSFS inbuilt', 'Encrypted user try TWRP (olzhas), decrypted user use SKKK'],
      },
    ],
  },
  {
    code: 'marble',
    name: 'Poco F5',
    status: 'active',
    maintainer: { name: "Maul's", role: 'Maintainer', github: 'https://github.com/Maulanariaddy', telegram: 'https://t.me/Maulanariaddy' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '3.0 GB',
        date: '17 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/marble/OrionOS-16.0-Ozone-marble-Official-GApps-20251216.zip/download',
        whatsNew: ['Initial release Orion Android 16'],
      },
      {
        name: 'OrionOS-15.1-Hydroxide',
        type: 'VANILLA',
        size: '2.0 GB',
        date: '20 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15_vanilla/marble/OrionOS-15.1-Hydroxide-marble-Official-Vanilla-20250219.zip/download',
        whatsNew: [
          'Initial A15 release official',
          'Dolby Atmos and Vision support',
          'MIUI Camera included',
          'XiaomiParts: Implement Pocket Detection',
          'XiaomiParts: ThermalTile service introduce',
          'XiaomiParts: Rework per-app thermal profile',
          'Audio: Bring back OSS Audio match in kernel common OSS',
          'Rootdir: Fix derps in configure memory',
          'Update Dalvik 8GB for Android 15',
          'Props: Tune phase offset duration',
          'GPS: Stability and improve change location',
          'Use 64-bit dex2oat on all cores',
          'Improve stability and performance daily',
          'Kernel: Update kernel 230-NusantaraPride-KSU',
        ],
      },
    ],
  },
  {
    code: 'peridot',
    name: 'Poco F6 / Redmi Turbo 3',
    status: 'active',
    maintainer: { name: 'Rams 05th', role: 'Maintainer', telegram: 'https://t.me/ramshell688' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '3.5 GB',
        date: '21 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/peridot/OrionOS-16.0-Ozone-peridot-Official-GApps-20251221.zip/download',
        whatsNew: ['Initial OrionOS A16 Build', 'Include Dolby Atmos', 'Include Leica Camera', 'And many changes from A15 builds'],
      },
      {
        name: 'OrionOS-15.1-Hydroxide',
        type: 'GAPPS',
        size: '3.5 GB',
        date: '23 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15/peridot/OrionOS-15.1-Hydroxide-peridot-OFFICIAL-Gapps-20250223.zip/download',
      },
      {
        name: 'OrionOS-14.0-Andromeda',
        type: 'GAPPS',
        size: '2.9 GB',
        date: '11 Oct 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/peridot/OrionOS-14.0-Andromeda-peridot-OFFICIAL-Gapps-20241009.zip/download',
      },
      {
        name: 'OrionOS-14.0-Centauri',
        type: 'GAPPS',
        size: '2.8 GB',
        date: '31 Aug 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/peridot/OrionOS-14.0-Centauri-peridot-OFFICIAL-Gapps-20240830.zip/download',
      },
    ],
  },
  {
    code: 'onyx',
    name: 'Poco F7',
    status: 'active',
    maintainer: { name: 'Rams 05th', role: 'Maintainer', telegram: 'https://t.me/ramshell688' },
    builds: [],
  },
  {
    code: 'chime',
    name: 'Poco M3 / Redmi 9T',
    status: 'active',
    maintainer: { name: 'kidzz', role: 'Maintainer', github: 'https://github.com/kidzz1965', telegram: 'https://t.me/kidzz_25' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.5 GB',
        date: '26 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/chime/OrionOS-16.0-Ozone-chime-Official-GApps-20251225.zip/download',
        whatsNew: ['Initial official release OrionOS 16.0', 'Shipped with valeryn kernel', 'This ROM starts with no root, flash another kernel', 'Come with smooth UI'],
      },
    ],
  },
  {
    code: 'surya',
    name: 'Poco X3 NFC',
    status: 'active',
    maintainer: { name: 'Skyy | Arata', role: 'Maintainer', github: 'https://github.com/HinohArata', telegram: 'https://t.me/xSkyyHinohara' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.7 GB',
        date: '6 Jan 2026',
        url: 'https://sourceforge.net/projects/orionos/files/A16/surya/OrionOS-16.0-Ozone-surya-Official-GApps-20260105.zip/download',
        whatsNew: ['Synced with latest source', 'Included firmware', 'Included Leica Camera with Scanner', 'Use Yamato kernel as default kernel', 'Initial Baklava release'],
      },
      {
        name: 'OrionOS-15.1-Hydroxide',
        type: 'GAPPS',
        size: '2.7 GB',
        date: '1 Mar 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15/surya/OrionOS-15.1-Hydroxide-surya-Official-Gapps-20250301.zip/download',
      },
      {
        name: 'OrionOS-14.0-Andromeda',
        type: 'GAPPS',
        size: '2.1 GB',
        date: '11 Oct 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/surya/OrionOS-14.0-Andromeda-surya-OFFICIAL-Gapps-20241011.zip/download',
      },
    ],
  },
  {
    code: 'fog',
    name: 'Redmi 10C / 10 Power',
    status: 'active',
    maintainer: { name: 'Aranya', role: 'Maintainer', github: 'https://github.com/AloozChips', telegram: 'https://t.me/AloozChips' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.1 GB',
        date: '26 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/fog/OrionOS-16.0-Ozone-fog-Official-GApps-20251225.zip/download',
        whatsNew: ['Initial OrionOS A16 build', 'Rooted by default with KSU'],
      },
      {
        name: 'OrionOS-Hydroxide',
        type: 'VANILLA',
        size: '1.1 GB',
        date: '18 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15_vanilla/fog/OrionOS-15.1-Hydroxide-fog-Official-Vanilla-20250218.zip/download',
      },
      {
        name: 'OrionOS-Centauri',
        type: 'VANILLA',
        size: '1.3 GB',
        date: '5 Sept 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/fog/OrionOS-14.0-Centauri-fog-OFFICIAL-Vanilla-20240904.zip/download',
      },
      {
        name: 'OrionOS-Cosmic',
        type: 'VANILLA',
        size: '1.3 GB',
        date: '26 Jul 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/fog/OrionOS-14.0-Cosmic-fog-OFFICIAL-Vanilla-20240726.zip/download',
      },
    ],
  },
  {
    code: 'blossom',
    name: 'Redmi 9A',
    status: 'active',
    maintainer: { name: 'Jayed Khan', role: 'Maintainer', github: 'https://github.com/Jayedkhan800', telegram: 'https://t.me/Jayedkhan70' },
    builds: [],
  },
  {
    code: 'sweet',
    name: 'Redmi Note 10 Pro',
    status: 'active',
    maintainer: { name: 'RyuDev', role: 'Co Founder', github: 'https://github.com/romiyusnandar', telegram: 'https://t.me/RyuDev21' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.6 GB',
        date: '22 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/sweet/OrionOS-16.0-Ozone-sweet-Official-GApps-20251222.zip/download',
        whatsNew: ['Initial OrionOS A16 Release', 'MiCam & Dolby Atmos included'],
      },
      {
        name: 'OrionOS-Hydroxide',
        type: 'GAPPS',
        size: '2.9 GB',
        date: '13 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15/sweet/OrionOS-15.1-Hydroxide-sweet-Official-Gapps-20250213.zip/download',
      },
      {
        name: 'OrionOS-Andromeda',
        type: 'GAPPS',
        size: '2.0 GB',
        date: '26 Oct 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/sweet/OrionOS-14.0-Andromeda-sweet-OFFICIAL-Gapps-20241026.zip/download',
      },
      {
        name: 'OrionOS-Cosmic',
        type: 'GAPPS',
        size: '2.1 GB',
        date: '20 Jul 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/sweet/OrionOS-14.0-Cosmic-sweet-OFFICIAL-Gapps-20240720.zip/download',
      },
    ],
  },
  {
    code: 'garnet',
    name: 'Redmi Note 13 Pro 5G / Poco X6 5G',
    status: 'active',
    maintainer: { name: 'hydr', role: 'Maintainer', github: 'https://github.com/zylhdrXP', telegram: 'https://t.me/ZylhdrXP' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.8 GB',
        date: '21 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/garnet/OrionOS-16.0-Ozone-garnet-Official-GApps-20251221.zip/download',
        whatsNew: ['SukiSU & SUSFS included', 'Dolby & Mi Cam included', 'Use latest HyperOS 2.0 FW'],
      },
    ],
  },
  {
    code: 'ginkgo',
    name: 'Redmi Note 8/8T',
    status: 'active',
    maintainer: { name: 'Hirokixd', role: 'Founder', github: 'https://github.com/Wrdn28', telegram: 'https://t.me/Hirokixd28' },
    builds: [
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'GAPPS',
        size: '2.3 GB',
        date: '13 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/ginkgo/OrionOS-16.0-Ozone-ginkgo-Official-GApps-20251214.zip/download',
        whatsNew: ['Initial OrionOS A16 Release', 'Disable blur by default'],
      },
      {
        name: 'OrionOS-16.0-Ozone',
        type: 'VANILLA',
        size: '1.4 GB',
        date: '13 Dec 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A16/ginkgo/OrionOS-16.0-Ozone-ginkgo-Official-Vanilla-20251214.zip/download',
        whatsNew: ['Initial OrionOS A16 Release', 'Disable blur by default'],
      },
      {
        name: 'OrionOS-Hydroxide',
        type: 'VANILLA',
        size: '1.5 GB',
        date: '19 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15_vanilla/ginkgo/OrionOS-15.1-Hydroxide-ginkgo-Official-Vanilla-20250219.zip/download',
      },
      {
        name: 'OrionOS-Hydroxide',
        type: 'GAPPS',
        size: '2.3 GB',
        date: '19 Feb 2025',
        url: 'https://sourceforge.net/projects/orionos/files/A15/ginkgo/OrionOS-15.1-Hydroxide-ginkgo-Official-Gapps-20250218.zip/download',
      },
      {
        name: 'OrionOS-Cosmic',
        type: 'GAPPS',
        size: '1.3 GB',
        date: '26 Jul 2024',
        url: 'https://sourceforge.net/projects/orionos/files/A14/ginkgo/',
      },
    ],
  },
];

export const getDevice = (code: string) => devices.find((d) => d.code === code);

export const getMaintainerName = (name: string) =>
  devices.find((d) => d.maintainer.name === name)?.maintainer;

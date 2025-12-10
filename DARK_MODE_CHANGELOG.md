# Dark Mode Implementation - Changelog

## Masalah yang Ditemukan

Implementasi dark mode sudah ada di project ini, tetapi banyak komponen yang masih menggunakan warna hardcoded (seperti `#ffffff`, `#f8f9fa`, `#6b7280`, dll) yang tidak berubah saat dark mode diaktifkan.

## Perubahan yang Sudah Dilakukan

### 1. **Hero Component** (`src/components/Hero.astro`)
- ✅ Mengganti background gradient dari hardcoded `#ffffff` dan `#f8f9fa` menjadi `var(--color-bg-primary)` dan `var(--color-bg-secondary)`
- ✅ Mengganti mockup placeholder background dengan CSS custom properties
- ✅ Mengganti mockup screen background dengan CSS custom properties
- ✅ Mengganti mockup notch background dari `#1a1a1a` menjadi `var(--color-text-primary)`

### 2. **Features Component** (`src/components/Features.astro`)
- ✅ Mengganti section background gradient dengan CSS custom properties
- ✅ Mengganti feature card background dari `#f8f9fa` menjadi `var(--color-bg-secondary)`
- ✅ Mengganti border dari hardcoded rgba menjadi `var(--color-border)`
- ✅ Mengganti feature-large background gradient dengan CSS custom properties
- ✅ Mengganti feature-icon-wrapper background dengan CSS custom properties

### 3. **Navbar Component** (`src/components/Navbar.astro`)
- ✅ Menambahkan dark mode support untuk mobile menu
- ✅ Menambahkan style `.dark .mobile-menu` dengan background dan border yang sesuai

### 4. **Footer Component** (`src/components/Footer.astro`)
- ✅ Mengganti footer background gradient dengan CSS custom properties
- ✅ Mengganti border dengan `var(--color-border)`
- ✅ Mengganti social link background dari `rgba(0, 0, 0, 0.05)` menjadi `var(--color-bg-tertiary)`

### 5. **Developers Page** (`src/pages/developers.astro`)
- ✅ Mengganti section background gradient dengan CSS custom properties
- ✅ Mengganti skeleton card background dan border dengan CSS custom properties
- ✅ Mengganti developer card background dan border dengan CSS custom properties
- ✅ Mengganti social icon background dari `#f8f9fa` menjadi `var(--color-bg-secondary)`
- ✅ Mengganti device badge background dan hover state dengan CSS custom properties
- ✅ Mengganti device codename background dengan `var(--color-bg-tertiary)`
- ✅ Mengganti role-maintainer background dengan `var(--color-bg-tertiary)`

### 6. **Device Detail Page** (`src/pages/devices/[codename].astro`)
- ✅ Mengganti section background gradient dengan CSS custom properties
- ✅ Mengganti maintainer card background dengan `var(--color-bg-secondary)`
- ✅ Mengganti social link background dan color dengan CSS custom properties
- ✅ Mengganti build card background dan border dengan CSS custom properties

### 7. **Devices Index Page** (`src/pages/devices/index.astro`)
- ✅ Mengganti section background gradient dengan CSS custom properties
- ✅ Mengganti search input background, border, dan shadow dengan CSS custom properties
- ✅ Mengganti device card background dan border dengan CSS custom properties
- ✅ Mengganti device image wrapper background dengan `var(--color-bg-secondary)`

## File yang Masih Perlu Diperbaiki

### 1. **Changelogs Page** (`src/pages/changelogs.astro`)
Perlu mengganti:
- Line 185: `background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);` → `var(--color-bg-primary)` dan `var(--color-bg-secondary)`
- Line 228: `background: #ffffff;` → `var(--color-bg-primary)`
- Line 401: `background: #f8f9fa;` → `var(--color-bg-secondary)`

### 2. **About Page** (`src/pages/about.astro`)
Perlu mengganti:
- Line 254: `background: #ffffff;` → `var(--color-bg-primary)`
- Line 339: `background: #ffffff;` → `var(--color-bg-primary)`
- Line 397: `background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);` → `var(--color-bg-secondary)` dan `var(--color-bg-tertiary)`
- Line 431: `background: #f9fafb;` → `var(--color-bg-secondary)`
- Line 473: `background: #ffffff;` → `var(--color-bg-primary)`
- Line 497: `background: #f3f4f6;` → `var(--color-bg-secondary)`
- Line 539: `background: #ffffff;` → `var(--color-bg-primary)`
- Line 571: `background: #111827;` → Ini untuk dark section, bisa dibiarkan atau gunakan custom property

### 3. **Device Detail Page - Build Type Badges** (`src/pages/devices/[codename].astro`)
Warna badge untuk VANILLA dan GAPPS (line 530, 536, 579, 584) sebaiknya dibiarkan karena ini adalah warna branding yang spesifik.

### 4. **Developers Page - Role Badges** (`src/pages/developers.astro`)
Warna badge untuk role (ADMIN, FOUNDER, dll) di line 438, 444, 450, 455, 460, 465 sebaiknya dibiarkan karena ini adalah warna branding yang spesifik.

### 5. **Skeleton Loading Gradients** (`src/pages/developers.astro`)
Skeleton loading gradients (line 297, 313, 322, 337, 353) menggunakan warna abu-abu yang perlu disesuaikan untuk dark mode. Bisa ditambahkan dark mode variant:

```css
/* Light mode skeleton */
.skeleton-avatar,
.skeleton-name,
.skeleton-role,
.skeleton-icon,
.skeleton-device {
    background: linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-bg-tertiary) 50%, var(--color-bg-secondary) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
```

## Cara Menyelesaikan Perbaikan

Untuk menyelesaikan perbaikan dark mode, ikuti langkah berikut:

1. **Buka file `src/pages/changelogs.astro`** dan ganti warna hardcoded dengan CSS custom properties
2. **Buka file `src/pages/about.astro`** dan ganti warna hardcoded dengan CSS custom properties
3. **Update skeleton loading** di `src/pages/developers.astro` untuk menggunakan CSS custom properties

## Testing

Setelah semua perubahan dilakukan, test dark mode dengan:

1. Buka website di browser
2. Klik tombol theme toggle di navbar
3. Periksa semua halaman:
   - Home (Hero, Features)
   - Developers
   - Devices (Index dan Detail)
   - Changelogs
   - About
4. Pastikan semua warna berubah dengan baik saat toggle dark mode

## CSS Custom Properties yang Tersedia

Dari `src/styles/global.css`:

### Light Mode
```css
--color-bg-primary: #ffffff;
--color-bg-secondary: #f8f9fa;
--color-bg-tertiary: #f1f3f5;

--color-text-primary: #1a1a1a;
--color-text-secondary: #6b7280;
--color-text-tertiary: #9ca3af;

--color-border: #e5e7eb;
--color-border-light: #f3f4f6;
```

### Dark Mode
```css
--color-bg-primary: #0a0a0a;
--color-bg-secondary: #1a1a1a;
--color-bg-tertiary: #2a2a2a;

--color-text-primary: #f5f5f5;
--color-text-secondary: #a1a1aa;
--color-text-tertiary: #71717a;

--color-border: #27272a;
--color-border-light: #1f1f23;
```

## Catatan Penting

- Jangan ubah warna branding yang spesifik (seperti badge role, build type, dll)
- Gunakan `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`, `var(--shadow-xl)` untuk shadow yang sudah disesuaikan dengan dark mode
- Pastikan semua border menggunakan `var(--color-border)` atau `var(--color-border-light)`

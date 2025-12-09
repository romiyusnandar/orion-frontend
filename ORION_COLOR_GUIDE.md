# Orion Brand Color Configuration

## ✅ Konfigurasi Selesai!

Warna brand **Orion** telah berhasil ditambahkan ke design system dengan value:
```css
oklch(60.9% 0.126 221.723)
```

## 🎨 Cara Menggunakan

Anda sekarang bisa menggunakan warna Orion dengan utility classes berikut:

### 1. **bg-orion** - Background Color
```html
<div class="bg-orion">
  Background dengan warna brand Orion
</div>

<!-- Dengan opacity -->
<div class="bg-orion/50">
  Background Orion dengan 50% opacity
</div>

<div class="bg-orion/5">
  Background Orion dengan 5% opacity (subtle tint)
</div>
```

### 2. **text-orion** - Text Color
```html
<h1 class="text-orion">
  Heading dengan warna Orion
</h1>

<p>
  Text biasa dengan <span class="text-orion font-semibold">emphasis Orion</span>
</p>
```

### 3. **border-orion** - Border Color
```html
<div class="border border-orion">
  Border 1px dengan warna Orion
</div>

<div class="border-2 border-orion">
  Border 2px dengan warna Orion
</div>

<div class="border-4 border-orion">
  Border 4px dengan warna Orion
</div>
```

### 4. **ring-orion** - Ring/Outline Color
```html
<button class="ring-2 ring-orion">
  Button dengan ring Orion
</button>

<button class="ring-4 ring-orion ring-offset-4">
  Button dengan ring Orion dan offset
</button>

<!-- Untuk focus states -->
<input class="focus:ring-2 focus:ring-orion" />
```

## 🔧 Implementasi Teknis

### Tailwind v4 @theme Directive
```css
@theme {
  --color-orion: oklch(60.9% 0.126 221.723);
}
```

### CSS Custom Property (Fallback)
```css
:root {
  --color-orion: oklch(60.9% 0.126 221.723);
}
```

## 💡 Contoh Kombinasi

### Button Primary dengan Orion
```html
<button class="btn btn-primary bg-orion hover:opacity-90">
  Download Now
</button>
```

### Button Secondary dengan Border Orion
```html
<button class="btn btn-secondary border-orion text-orion hover:bg-orion hover:text-white">
  Learn More
</button>
```

### Card dengan Border Orion
```html
<div class="card border-4 border-orion">
  <h3>Featured Content</h3>
  <p>Card dengan highlight border Orion</p>
</div>
```

### Section dengan Background Tint
```html
<section class="section bg-orion/5">
  <!-- Content dengan subtle Orion background -->
</section>
```

## 🌈 Keunggulan OKLCH Color Space

Warna Orion menggunakan **OKLCH color space** yang memiliki keunggulan:

1. **Perceptually Uniform** - Perubahan nilai menghasilkan perubahan visual yang konsisten
2. **Wider Gamut** - Dapat mengakses warna yang lebih vibrant dan saturated
3. **Better Interpolation** - Gradient dan transisi warna lebih smooth
4. **Future-Proof** - Didukung oleh browser modern dan CSS Color Level 4

### Format OKLCH
```
oklch(L% C H)
```
- **L (Lightness)**: 60.9% - Kecerahan warna
- **C (Chroma)**: 0.126 - Saturasi/intensitas warna
- **H (Hue)**: 221.723 - Sudut warna (dalam derajat)

## 📱 Browser Support

OKLCH didukung oleh:
- ✅ Chrome 111+
- ✅ Edge 111+
- ✅ Safari 15.4+
- ✅ Firefox 113+

Untuk browser lama, Tailwind akan otomatis melakukan fallback ke RGB.

## 🎯 Best Practices

1. **Gunakan untuk Branding** - Gunakan text-orion untuk brand name dan key elements
2. **Subtle Backgrounds** - Gunakan bg-orion/5 atau bg-orion/10 untuk subtle tints
3. **Interactive States** - Gunakan hover:bg-orion untuk button hover effects
4. **Focus Indicators** - Gunakan ring-orion untuk accessible focus states

## 📍 Lokasi File

- **Global CSS**: `src/styles/global.css`
- **Demo Page**: `src/pages/index.astro`

Buka http://localhost:4321 untuk melihat demo lengkap semua utility classes!

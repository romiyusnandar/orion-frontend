# About Page Dark Mode Fix

## Masalah
Beberapa text di halaman About menggunakan warna hardcoded yang tidak beradaptasi dengan dark mode, sehingga sulit dibaca di background gelap.

## Warna Hardcoded yang Ditemukan
1. `.hero-subheadline` - `color: #4b5563` (gray-600)
2. `.story-title` - `color: #000000` (black)
3. `.story-text` - `color: #4b5563` (gray-600)
4. `.donation-description` - `color: #6b7280` (gray-500)
5. `.donation-card-text` - `color: #6b7280` (gray-500)

## Solusi
Mengganti semua warna hardcoded dengan CSS custom properties yang otomatis beradaptasi dengan dark mode.

## Perubahan yang Dilakukan

### 1. Hero Subheadline
**Sebelum:**
```css
.hero-subheadline {
    color: #4b5563;
}
```

**Sesudah:**
```css
.hero-subheadline {
    color: var(--color-text-secondary);
}
```

### 2. Story Title
**Sebelum:**
```css
.story-title {
    color: #000000;
}
```

**Sesudah:**
```css
.story-title {
    color: var(--color-text-primary);
}
```

### 3. Story Text
**Sebelum:**
```css
.story-text {
    color: #4b5563;
}
```

**Sesudah:**
```css
.story-text {
    color: var(--color-text-secondary);
}
```

### 4. Donation Description
**Sebelum:**
```css
.donation-description {
    color: #6b7280;
}
```

**Sesudah:**
```css
.donation-description {
    color: var(--color-text-secondary);
}
```

### 5. Donation Card Text
**Sebelum:**
```css
.donation-card-text {
    color: #6b7280;
}
```

**Sesudah:**
```css
.donation-card-text {
    color: var(--color-text-secondary);
}
```

## Warna yang Digunakan

### Light Mode
- `--color-text-primary`: `#1a1a1a` (hampir hitam)
- `--color-text-secondary`: `#6b7280` (gray-500)

### Dark Mode
- `--color-text-primary`: `#f5f5f5` (hampir putih)
- `--color-text-secondary`: `#a1a1aa` (gray-400 - lebih terang)

## Hasil

### Light Mode
- ✅ Semua text tetap terlihat jelas dengan warna gelap
- ✅ Kontras yang baik dengan background putih

### Dark Mode
- ✅ Text primary berubah menjadi putih/terang
- ✅ Text secondary berubah menjadi abu-abu terang
- ✅ Semua text mudah dibaca di background gelap
- ✅ Kontras yang baik dan nyaman di mata

## Sections yang Diperbaiki

1. **Hero Section**
   - Headline (sudah menggunakan var sebelumnya)
   - Subheadline ✅ diperbaiki

2. **Storytelling Section**
   - Story titles ✅ diperbaiki
   - Story text ✅ diperbaiki

3. **Donation Section**
   - Donation title (sudah menggunakan var sebelumnya)
   - Donation description ✅ diperbaiki
   - Donation card text ✅ diperbaiki

4. **Team CTA Section**
   - Text (sudah menggunakan var sebelumnya)
   - Button (sudah menggunakan var sebelumnya)

## Testing

1. ✅ Buka halaman About
2. ✅ Lihat semua sections dalam light mode
3. ✅ Toggle dark mode
4. ✅ Semua text harus berubah warna dan tetap mudah dibaca
5. ✅ Periksa kontras di setiap section:
   - Hero section
   - Performance First
   - Privacy Focused
   - Pixel Perfect Design
   - Donation cards
   - Team CTA

## File Modified
- `src/pages/about.astro`

## Summary
Semua text di halaman About sekarang menggunakan CSS custom properties yang otomatis beradaptasi dengan dark mode, memberikan pengalaman membaca yang optimal di kedua mode.

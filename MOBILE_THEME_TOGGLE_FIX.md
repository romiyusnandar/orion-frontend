# Mobile Theme Toggle Fix

## Masalah
Theme toggle tidak terlihat di mode mobile, hanya tersedia di desktop.

## Solusi
Menampilkan theme toggle di samping kiri icon hamburger button pada mode mobile.

## Perubahan yang Dilakukan

### 1. Struktur HTML
**Sebelum:**
```html
<!-- Theme Toggle & CTA -->
<div class="navbar-actions">
    <ThemeToggle />
    <a href="/devices" class="btn-download">Download Now</a>
</div>

<!-- Mobile Hamburger -->
<button id="hamburger" class="hamburger">
    ...
</button>
```

**Sesudah:**
```html
<!-- Theme Toggle & CTA (Desktop) -->
<div class="navbar-actions">
    <ThemeToggle />
    <a href="/devices" class="btn-download">Download Now</a>
</div>

<!-- Mobile Actions (Theme Toggle + Hamburger) -->
<div class="mobile-actions">
    <ThemeToggle />
    <button id="hamburger" class="hamburger">
        ...
    </button>
</div>
```

### 2. CSS Baru
```css
/* Mobile Actions Container */
.mobile-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (min-width: 768px) {
    .mobile-actions {
        display: none;
    }
}
```

## Cara Kerja

### Desktop (≥768px)
- `.navbar-actions` ditampilkan (theme toggle + download button)
- `.mobile-actions` disembunyikan

### Mobile (<768px)
- `.navbar-actions` disembunyikan
- `.mobile-actions` ditampilkan (theme toggle + hamburger)
- Theme toggle dan hamburger button tampil berdampingan dengan gap 0.5rem

## Layout Mobile
```
┌─────────────────────────────────────┐
│ [Logo]              [🌙] [☰]       │
└─────────────────────────────────────┘
```

- Logo di kiri
- Theme toggle (🌙) dan hamburger (☰) di kanan
- Keduanya berdampingan dengan jarak yang pas

## Hasil
- ✅ Theme toggle sekarang terlihat di mobile
- ✅ Posisi di samping kiri hamburger button
- ✅ Layout tetap rapi dan konsisten
- ✅ User bisa toggle dark mode dari mobile
- ✅ Tidak ada duplikasi theme toggle (hanya satu instance yang ditampilkan sesuai breakpoint)

## Testing
1. Buka website di browser
2. Resize window ke ukuran mobile (<768px)
3. Theme toggle harus terlihat di samping kiri hamburger button
4. Klik theme toggle untuk test fungsinya
5. Resize ke desktop, theme toggle harus pindah ke posisi desktop (dengan download button)

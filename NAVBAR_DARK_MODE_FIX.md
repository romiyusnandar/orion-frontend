# Navbar Dark Mode Fix

## Masalah
Navbar masih menampilkan background putih ketika dark mode diaktifkan.

## Penyebab
Selector CSS `.dark .navbar` tidak cukup spesifik untuk override style default navbar. Kemungkinan ada style lain yang memiliki specificity lebih tinggi.

## Solusi
Menggunakan selector yang lebih spesifik dengan kombinasi:
1. `:where(html.dark)` - Untuk specificity yang lebih rendah tapi tetap bekerja
2. `html.dark` - Untuk specificity yang lebih tinggi
3. `!important` - Untuk memastikan style diterapkan

## Perubahan yang Dilakukan

### 1. Navbar Background (Desktop)
**Sebelum:**
```css
.dark .navbar {
    background-color: rgba(10, 10, 10, 0.7);
    border-bottom-color: rgba(255, 255, 255, 0.1);
}
```

**Sesudah:**
```css
:where(html.dark) .navbar,
html.dark .navbar {
    background-color: rgba(10, 10, 10, 0.8) !important;
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
}
```

### 2. Navbar Scrolled State
**Sebelum:**
```css
.dark .navbar.scrolled {
    background-color: rgba(10, 10, 10, 0.85);
    border-bottom-color: rgba(255, 255, 255, 0.15);
}
```

**Sesudah:**
```css
:where(html.dark) .navbar.scrolled,
html.dark .navbar.scrolled {
    background-color: rgba(10, 10, 10, 0.9) !important;
    border-bottom-color: rgba(255, 255, 255, 0.15) !important;
}
```

### 3. Mobile Menu
**Sebelum:**
```css
.dark .mobile-menu {
    background-color: rgba(10, 10, 10, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
}
```

**Sesudah:**
```css
:where(html.dark) .mobile-menu,
html.dark .mobile-menu {
    background-color: rgba(10, 10, 10, 0.95) !important;
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
}
```

## Hasil
- ✅ Navbar sekarang menampilkan background gelap saat dark mode
- ✅ Mobile menu juga menampilkan background gelap
- ✅ Border bottom menyesuaikan dengan tema
- ✅ Glassmorphism effect tetap berfungsi dengan baik

## Testing
1. Klik tombol theme toggle di navbar
2. Navbar harus berubah dari putih transparan ke gelap transparan
3. Scroll halaman, navbar scrolled state juga harus gelap
4. Buka mobile menu (di layar kecil), background harus gelap

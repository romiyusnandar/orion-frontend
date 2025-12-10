# Status Badge Dark Mode Fix

## Masalah
Status badge (ACTIVE, DISCONTINUED, OFFICIAL) tidak berfungsi dengan baik di dark mode karena menggunakan warna hardcoded Tailwind classes.

## Penyebab
Fungsi `getStatusColor()` mengembalikan Tailwind classes hardcoded:
- `bg-red-100 text-red-600` untuk DISCONTINUED
- `bg-green-100 text-green-600` untuk ACTIVE/OFFICIAL

Warna-warna ini tidak beradaptasi dengan dark mode, sehingga badge sulit dibaca di background gelap.

## Solusi
Membuat custom CSS classes yang mendukung dark mode dengan warna yang berbeda untuk light dan dark mode.

## Perubahan yang Dilakukan

### 1. File: `src/pages/devices/[codename].astro`

#### JavaScript - getStatusColor()
**Sebelum:**
```javascript
const getStatusColor = (status: Device["status"]): string => 
    status === 'DISCONTINUED' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600';
```

**Sesudah:**
```javascript
const getStatusColor = (status: Device["status"]): string => 
    status === 'DISCONTINUED' ? 'status-discontinued' : 'status-active';
```

#### CSS - Status Badge Styles
**Ditambahkan:**
```css
/* Status Colors - Light Mode */
.status-active {
    background-color: #dcfce7; /* green-100 */
    color: #16a34a; /* green-600 */
}

.status-discontinued {
    background-color: #fee2e2; /* red-100 */
    color: #dc2626; /* red-600 */
}

/* Status Colors - Dark Mode */
:where(html.dark) .status-active,
html.dark .status-active {
    background-color: rgba(22, 163, 74, 0.2); /* green with opacity */
    color: #86efac; /* green-300 */
}

:where(html.dark) .status-discontinued,
html.dark .status-discontinued {
    background-color: rgba(220, 38, 38, 0.2); /* red with opacity */
    color: #fca5a5; /* red-300 */
}
```

### 2. File: `src/pages/devices/index.astro`
Perubahan yang sama diterapkan di file ini.

## Warna yang Digunakan

### Light Mode
**ACTIVE/OFFICIAL:**
- Background: `#dcfce7` (green-100 - hijau muda)
- Text: `#16a34a` (green-600 - hijau gelap)

**DISCONTINUED:**
- Background: `#fee2e2` (red-100 - merah muda)
- Text: `#dc2626` (red-600 - merah gelap)

### Dark Mode
**ACTIVE/OFFICIAL:**
- Background: `rgba(22, 163, 74, 0.2)` (hijau dengan opacity 20%)
- Text: `#86efac` (green-300 - hijau terang)

**DISCONTINUED:**
- Background: `rgba(220, 38, 38, 0.2)` (merah dengan opacity 20%)
- Text: `#fca5a5` (red-300 - merah terang)

## Keuntungan

1. **Readable in Dark Mode**: Warna text lebih terang di dark mode
2. **Subtle Background**: Background menggunakan opacity untuk tidak terlalu mencolok
3. **Consistent Design**: Mengikuti pola warna yang sama dengan komponen lain
4. **Accessible**: Kontras yang baik antara text dan background di kedua mode

## Hasil

### Light Mode
- ✅ Badge hijau untuk ACTIVE/OFFICIAL (mudah dibaca)
- ✅ Badge merah untuk DISCONTINUED (mudah dibaca)

### Dark Mode
- ✅ Badge hijau dengan background transparan dan text terang
- ✅ Badge merah dengan background transparan dan text terang
- ✅ Kontras yang baik dengan background gelap

## Testing

1. ✅ Buka halaman devices index
2. ✅ Lihat status badge di setiap device card
3. ✅ Toggle dark mode
4. ✅ Badge harus berubah warna dan tetap mudah dibaca
5. ✅ Buka halaman device detail
6. ✅ Status badge di header juga harus berfungsi dengan baik

## Files Modified
- `src/pages/devices/[codename].astro` - Device detail page
- `src/pages/devices/index.astro` - Devices listing page

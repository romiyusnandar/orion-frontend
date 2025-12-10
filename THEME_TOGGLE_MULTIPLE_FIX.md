# Theme Toggle Multiple Instances Fix

## Masalah
Theme toggle tidak berfungsi ketika ditekan, tidak ada perubahan yang terjadi.

## Penyebab
Karena ada dua instance ThemeToggle component (satu di desktop, satu di mobile), keduanya memiliki `id="theme-toggle"` yang sama. JavaScript `getElementById()` hanya menangkap elemen pertama, sehingga instance kedua tidak berfungsi.

## Solusi
Mengubah pendekatan dari menggunakan ID selector menjadi class selector, sehingga semua instance theme toggle button dapat berfungsi.

## Perubahan yang Dilakukan

### 1. HTML - Menghapus ID
**Sebelum:**
```html
<button
    id="theme-toggle"
    type="button"
    class="theme-toggle-btn"
    aria-label="Toggle dark mode"
>
```

**Sesudah:**
```html
<button
    type="button"
    class="theme-toggle-btn"
    aria-label="Toggle dark mode"
>
```

### 2. JavaScript - Menggunakan querySelectorAll
**Sebelum:**
```javascript
// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const html = document.documentElement;
        const isDark = html.classList.contains("dark");

        if (isDark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });
}
```

**Sesudah:**
```javascript
// Theme toggle functionality - supports multiple instances
const themeToggleButtons = document.querySelectorAll(".theme-toggle-btn");

// Function to toggle theme
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}

// Add click event to all theme toggle buttons
themeToggleButtons.forEach((button) => {
    button.addEventListener("click", toggleTheme);
});
```

## Keuntungan

1. **Multiple Instances Support**: Semua button dengan class `.theme-toggle-btn` akan berfungsi
2. **Cleaner Code**: Fungsi toggle dipisahkan, lebih mudah di-maintain
3. **Scalable**: Bisa menambahkan lebih banyak theme toggle button di tempat lain tanpa masalah
4. **No Duplication**: Satu fungsi toggle untuk semua button

## Cara Kerja

1. `querySelectorAll(".theme-toggle-btn")` menangkap **semua** button dengan class tersebut
2. `forEach()` menambahkan event listener ke **setiap** button
3. Saat salah satu button diklik, fungsi `toggleTheme()` dipanggil
4. Fungsi tersebut toggle class `dark` pada `<html>` element
5. Theme preference disimpan di localStorage
6. Semua button (desktop & mobile) akan berfungsi dengan baik

## Testing

1. ✅ Refresh browser
2. ✅ Klik theme toggle di desktop - harus berfungsi
3. ✅ Resize ke mobile
4. ✅ Klik theme toggle di mobile - harus berfungsi
5. ✅ Kedua button harus sinkron (sama-sama toggle dark mode)
6. ✅ Theme preference tersimpan di localStorage

## Hasil
- ✅ Theme toggle sekarang berfungsi di desktop
- ✅ Theme toggle sekarang berfungsi di mobile
- ✅ Kedua instance bekerja dengan sempurna
- ✅ Dark mode dapat di-toggle dari mana saja

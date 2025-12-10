# 404 Not Found Page

## Overview
Custom 404 error page untuk Orion OS website dengan design yang modern, menarik, dan konsisten dengan design system.

## Cara Kerja di Astro

Astro secara otomatis menangani 404 errors dengan mencari file `404.astro` di folder `src/pages/`. Ketika user mengakses URL yang tidak ada, Astro akan menampilkan halaman ini.

## Fitur

### 1. **Large 404 Number**
- Gradient text effect (Orion purple to violet)
- Responsive font size (6rem - 12rem)
- Glow effect dengan pulse animation
- Eye-catching dan immediately recognizable

### 2. **Clear Error Message**
- Friendly title: "Page Not Found"
- Helpful description yang tidak terlalu technical
- Tone yang friendly dan tidak menakutkan

### 3. **Action Buttons**
- **Primary**: "Back to Home" dengan icon
- **Secondary**: "Browse Devices"
- Clear call-to-action untuk user

### 4. **Quick Links**
- Popular pages: Developers, Changelog, About
- Membantu user menemukan halaman yang mungkin mereka cari
- Hover effect untuk better UX

### 5. **Dark Mode Support**
- Otomatis menyesuaikan dengan theme
- Gradient tetap terlihat bagus di kedua mode
- Text colors menggunakan CSS custom properties

### 6. **Responsive Design**
- Mobile-first approach
- Buttons stack vertically di mobile
- Font sizes menyesuaikan dengan viewport

### 7. **Animations**
- Fade in up animation saat page load
- Pulse animation pada glow effect
- Smooth hover transitions
- Respect prefers-reduced-motion

## File Structure

```
src/pages/404.astro
```

## Design Elements

### Colors
- **404 Number**: Gradient dari Orion purple ke violet
- **Glow Effect**: Radial gradient dengan opacity 0.2
- **Buttons**: Orion primary color
- **Text**: CSS custom properties untuk dark mode support

### Typography
- **404**: 6rem - 12rem (responsive)
- **Title**: 2rem - 3rem
- **Description**: 1rem - 1.25rem
- **Quick Links**: 0.875rem

### Spacing
- Section padding: Consistent dengan pages lain
- Content max-width: 600px
- Vertical rhythm: 1rem - 3rem gaps

## Testing

### Manual Test
1. Buka URL yang tidak ada, contoh: `http://localhost:4321/halaman-tidak-ada`
2. Harus muncul halaman 404
3. Test semua buttons dan links
4. Test di mobile dan desktop
5. Toggle dark mode

### URLs untuk Test
- `/test-404`
- `/halaman-tidak-ada`
- `/devices/unknown-device`
- `/random-path`

## Customization

Jika ingin customize, edit `src/pages/404.astro`:

```astro
<!-- Ubah error message -->
<h1 class="error-title">Your Custom Title</h1>
<p class="error-description">Your custom description</p>

<!-- Tambah/ubah quick links -->
<a href="/your-page" class="quick-link">Your Page</a>

<!-- Ubah warna gradient -->
<style>
.error-number {
    background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
}
</style>
```

## Best Practices

1. **Keep it Simple**: Jangan terlalu banyak informasi
2. **Be Helpful**: Berikan opsi untuk user kembali ke halaman yang valid
3. **Stay On Brand**: Konsisten dengan design system
4. **Be Friendly**: Tone yang tidak menakutkan
5. **Fast Loading**: Minimal dependencies, cepat load

## SEO Considerations

- ✅ Proper title tag
- ✅ Meta description
- ✅ HTTP 404 status code (handled by Astro)
- ✅ No index (Astro handles this automatically)

## Accessibility

- ✅ Semantic HTML
- ✅ Clear heading hierarchy
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Sufficient color contrast
- ✅ Respects prefers-reduced-motion

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS Grid support
- ✅ CSS Custom Properties support
- ✅ Flexbox support

## Production Notes

Ketika di-deploy:
1. Astro akan otomatis serve `404.astro` untuk semua 404 errors
2. Pastikan server/hosting mendukung custom 404 pages
3. Vercel, Netlify, dan hosting modern lainnya support ini by default

## Result

✅ User-friendly 404 page yang:
- Menarik secara visual
- Helpful dengan clear actions
- Konsisten dengan brand
- Responsive di semua devices
- Mendukung dark mode
- Fast loading

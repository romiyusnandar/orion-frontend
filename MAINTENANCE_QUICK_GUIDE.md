# 🚨 Quick Guide: Mengaktifkan Maintenance Mode

## Langkah Cepat (1 Menit)

### ✅ Untuk Mengaktifkan Maintenance Mode:

1. Buka file: `src/utils/maintenance.ts`
2. Ubah baris ini:
   ```typescript
   enabled: false,  // ← Ubah menjadi true
   ```
   Menjadi:
   ```typescript
   enabled: true,   // ✅ Maintenance mode AKTIF
   ```
3. Save file
4. Push ke repository / deploy

**SELESAI!** Semua user akan otomatis di-redirect ke halaman maintenance.

---

### ❌ Untuk Menonaktifkan Maintenance Mode:

1. Buka file: `src/utils/maintenance.ts`
2. Ubah baris ini:
   ```typescript
   enabled: true,   // ← Ubah menjadi false
   ```
   Menjadi:
   ```typescript
   enabled: false,  // ✅ Maintenance mode NONAKTIF
   ```
3. Save file
4. Push ke repository / deploy

**SELESAI!** Website kembali normal.

---

## 🔐 Keamanan

- ✅ **Tidak bisa di-bypass** - Menggunakan server-side middleware
- ✅ **Paksa redirect** - User tidak bisa akses route manapun
- ✅ **No JavaScript tricks** - Pengecekan di server, bukan client

## 📍 File Penting

| File | Fungsi |
|------|--------|
| `src/utils/maintenance.ts` | **Konfigurasi ON/OFF** |
| `src/pages/maintenance.astro` | Tampilan halaman maintenance |
| `src/middleware.ts` | Logic redirect (jangan diubah) |

## 💡 Tips

- Komunikasikan ke user sebelum maintenance via social media
- Set estimasi waktu di konfigurasi
- Test di development dulu sebelum production
- Jangan lupa matikan setelah selesai!

---

**Need help?** Baca dokumentasi lengkap di `MAINTENANCE_MODE.md`

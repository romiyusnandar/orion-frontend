# Maintenance Mode - Orion OS

## 📋 Deskripsi

Sistem maintenance mode yang memungkinkan Anda untuk menampilkan halaman "Under Maintenance" ketika backend atau sistem sedang dalam pemeliharaan. Halaman ini **tidak dapat di-bypass** oleh user karena menggunakan server-side middleware.

## 🚀 Cara Mengaktifkan Maintenance Mode

### 1. Mengaktifkan Mode Maintenance

Edit file `src/utils/maintenance.ts` dan ubah `enabled` menjadi `true`:

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: true, // ← Ubah ini menjadi true
    // ...
};
```

### 2. Menonaktifkan Mode Maintenance

Ubah kembali `enabled` menjadi `false`:

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: false, // ← Ubah ini menjadi false
    // ...
};
```

## ⚙️ Konfigurasi Lanjutan

### Menambahkan Estimasi Waktu Selesai

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: true,
    estimatedEndTime: "2025-12-15T16:00:00+07:00", // Format ISO 8601
    // ...
};
```

### Mengubah Pesan Maintenance

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: true,
    message: "Pesan custom Anda di sini",
    // ...
};
```

### Whitelist Path Tertentu

Jika Anda ingin beberapa path tetap bisa diakses selama maintenance:

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: true,
    whitelistedPaths: [
        "/maintenance",
        "/api/health",
        "/api/status", // Tambahkan path yang ingin di-whitelist
    ],
    // ...
};
```

### Whitelist IP Address

Jika Anda ingin IP tertentu (misalnya IP kantor) tetap bisa akses:

```typescript
export const MAINTENANCE_CONFIG = {
    enabled: true,
    whitelistedIPs: [
        "192.168.1.100",
        "203.0.113.0", // Tambahkan IP yang ingin di-whitelist
    ],
    // ...
};
```

## 🔒 Keamanan

### Mengapa Tidak Bisa Di-Bypass?

1. **Server-Side Middleware**: Pengecekan dilakukan di server menggunakan Astro middleware, bukan di client-side JavaScript
2. **Redirect 307**: Menggunakan temporary redirect yang memaksa browser untuk redirect
3. **Whitelist Control**: Hanya path yang di-whitelist yang bisa diakses
4. **No Direct Access**: User tidak bisa langsung akses `/maintenance` ketika mode tidak aktif

### Cara Kerja

```
User Request → Astro Middleware → Check Maintenance Mode
                                  ↓
                        Yes ← Is Enabled? → No
                         ↓                   ↓
                  Check Whitelist      Continue Normal
                         ↓
              Yes ← Is Whitelisted? → No
               ↓                       ↓
        Continue Normal        Redirect to /maintenance
```

## 📝 Contoh Penggunaan

### Scenario 1: Maintenance Backend

```typescript
// src/utils/maintenance.ts
export const MAINTENANCE_CONFIG = {
    enabled: true,
    estimatedEndTime: "2025-12-15T16:00:00+07:00",
    message: "Backend sedang dalam maintenance untuk update database.",
    whitelistedPaths: ["/maintenance"],
    whitelistedIPs: [],
};
```

### Scenario 2: Maintenance dengan API Health Check Tetap Aktif

```typescript
// src/utils/maintenance.ts
export const MAINTENANCE_CONFIG = {
    enabled: true,
    estimatedEndTime: null,
    message: "Sistem sedang dalam pemeliharaan.",
    whitelistedPaths: [
        "/maintenance",
        "/api/health",
        "/api/status",
    ],
    whitelistedIPs: [],
};
```

### Scenario 3: Maintenance dengan Akses Tim Internal

```typescript
// src/utils/maintenance.ts
export const MAINTENANCE_CONFIG = {
    enabled: true,
    estimatedEndTime: "2025-12-15T18:00:00+07:00",
    message: "Maintenance terjadwal untuk peningkatan sistem.",
    whitelistedPaths: ["/maintenance"],
    whitelistedIPs: [
        "192.168.1.100", // IP kantor
        "203.0.113.50",  // IP VPN
    ],
};
```

## 🎨 Kustomisasi Halaman Maintenance

Untuk mengubah tampilan halaman maintenance, edit file:
```
src/pages/maintenance.astro
```

Anda bisa mengubah:
- Teks dan pesan
- Warna dan styling
- Animasi
- Informasi kontak
- Logo dan branding

## 🔄 Deployment

### Vercel / Netlify

Setelah mengubah konfigurasi maintenance, cukup push ke repository dan deployment akan otomatis update.

### Manual Deployment

```bash
# Build project
npm run build

# Deploy build folder
# (sesuai dengan platform hosting Anda)
```

## ⚠️ Catatan Penting

1. **Jangan lupa matikan maintenance mode** setelah selesai pemeliharaan
2. **Test terlebih dahulu** di development sebelum enable di production
3. **Komunikasikan** kepada user melalui social media atau email sebelum maintenance
4. **Backup konfigurasi** sebelum melakukan perubahan

## 🧪 Testing

### Test di Development

```bash
# 1. Aktifkan maintenance mode di src/utils/maintenance.ts
# 2. Jalankan dev server
npm run dev

# 3. Buka browser dan coba akses halaman manapun
# 4. Seharusnya redirect ke /maintenance
```

### Test Whitelist

```bash
# 1. Tambahkan path ke whitelistedPaths
# 2. Coba akses path tersebut
# 3. Seharusnya bisa diakses meskipun maintenance mode aktif
```

## 📞 Support

Jika ada pertanyaan atau masalah, hubungi tim development.

---

**Last Updated**: 2025-12-15
**Version**: 1.0.0

# 🌍 Extractor IP:PORT + Statistik Negara 🇺🇳

Alat berbasis Cloudflare Worker untuk mengekstrak IP:PORT dari file teks (`.txt`) via URL atau file upload, serta menampilkan statistik negara berdasarkan kode negara (CC). Mendukung antarmuka dark mode dan output siap digunakan.

## ✨ Fitur

- 🔗 Ambil file `.txt` dari satu atau banyak URL.
- 📂 Upload file `.txt` langsung dari perangkat.
- 🧠 Ekstraksi otomatis baris dengan format: `IP,PORT,CC,ISP`
- 🚫 Duplikasi berdasarkan `IP:PORT` akan disaring.
- 📊 Statistik jumlah IP berdasarkan negara (dengan emoji bendera).
- 📋 Output 2 format:
  - `IP:PORT`
  - Baris lengkap `IP,PORT,CC,ISP`
- ✅ Salin atau unduh hasil sebagai file `.txt`
- 🌙 Dark Mode dengan Tailwind CSS
- ⚡ Dibangun di atas **Cloudflare Workers** – cepat dan bebas hosting!
  
## 📸 Tampilan Antarmuka

![preview](https://raw.githubusercontent.com/gopaybis/get-raw-proxy/refs/heads/main/Screenshot_2025-06-15-20-18-07-689_com.android.chrome.jpg)

## 🚀 Cara Deploy (Cloudflare Workers)

1. Buka [Cloudflare Workers](https://dash.cloudflare.com/)
2. Buat Worker baru.
3. Salin seluruh isi file `worker.js` ke dalam editor.
4. Simpan dan jalankan!

## 🛠 Struktur Format Data

Input file `.txt` harus memiliki format per baris seperti berikut:

```
192.168.0.1,8080,US,Some ISP Name
1.2.3.4,3128,ID,Provider Indonesia
```

> Baris yang tidak mengandung koma atau `IP:PORT` tidak valid akan diabaikan.

## 📂 Upload & URL Input

- **Upload file**: Seret atau pilih file `.txt` dari perangkat.
- **Input URL**: Tempelkan satu atau beberapa URL (satu per baris) ke file `.txt`.

## 📋 Output

- **Hasil IP:PORT**: Disaring unik, siap digunakan untuk testing proxy, dll.
- **Hasil Lengkap**: Tetap mempertahankan `CC` dan `ISP` untuk referensi.

## 📄 Lisensi

MIT License © 2025 — [MR44J](https://github.com/gopaybis)

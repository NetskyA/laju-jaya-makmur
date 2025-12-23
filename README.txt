LAJUJAYA SITE (STATIC)

Isi:
- index.html      : versi web (Tailwind CDN) dengan section dan tabel principal + pencarian
- original.html   : versi akurat (render halaman PDF menjadi gambar)
- company-profile.pdf : file PDF asli
- assets/         : gambar hasil render PDF per halaman

Cara menjalankan lokal:
1) Buka folder ini
2) Double-click index.html
   (atau jalankan server statis untuk menghindari issue CORS pada beberapa browser)

Cara deploy cepat:
- Netlify / Vercel / GitHub Pages:
  Upload seluruh isi folder ini sebagai static site.

Catatan:
Konversi PDF → HTML 1:1 secara otomatis biasanya menghasilkan HTML absolut yang berat dan sulit dirawat.
Di sini saya buat versi web yang rapi + versi gambar yang 1:1 untuk akurasi desain.

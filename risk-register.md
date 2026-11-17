# Risk Register: Portal Berita Komunitas Kalbar

Skor = Probabilitas (P, 1-5) x Dampak (I, 1-5).
Level: 1-5 Rendah | 6-11 Sedang | 12-19 Tinggi | 20-25 Kritis

| No | Aset | Risiko | P | I | Skor | Level | Mitigasi | Status |
|----|------|--------|---|---|------|-------|----------|--------|
| 1 | VPS | Brute-force SSH | 4 | 4 | 16 | Tinggi | SSH key-only (`PasswordAuthentication no`), fail2ban (5 percobaan = ban 1 jam), UFW | Diterapkan |
| 2 | Database | SQL Injection pada search dan POST artikel | 3 | 5 | 15 | Tinggi | Semua query berparameter (`$1,$2`), validasi input di controller | Diterapkan |
| 3 | Aplikasi | Lonjakan trafik saat berita viral membuat CPU jenuh (uji: CPU 100%) | 3 | 4 | 12 | Tinggi | 2 container app + load balancer, monitoring Grafana; rekomendasi: caching dan scale-up VPS | Sebagian |
| 9 | Aplikasi | Endpoint search (ILIKE full scan) disalahgunakan sebagai DoS | 3 | 4 | 12 | Tinggi | Uji beban terbukti DB menjadi bottleneck; rekomendasi: rate limit Nginx, indeks pg_trgm | Direkomendasikan |
| 4 | Data | Data terhapus atau korup | 2 | 5 | 10 | Sedang | Volume persisten `pgdata`, backup `pg_dump` terjadwal | Diterapkan |
| 5 | Kredensial | Kredensial DB default (`user:pass`) ada di repo publik | 2 | 5 | 10 | Sedang | Port DB tidak dipublish (hanya jaringan Docker), UFW 22/80/443; rekomendasi: Docker secrets + password kuat | Risiko diterima |
| 6 | Konten | Konten berita dimanipulasi (POST tanpa autentikasi) | 2 | 5 | 10 | Sedang | Validasi input; rekomendasi: autentikasi (JWT) pada endpoint tulis | Direkomendasikan |
| 10 | Monitoring | Port Prometheus/Grafana terbuka ke internet (Docker melewati UFW) | 2 | 4 | 8 | Sedang | Port diikat ke `127.0.0.1`, akses via SSH tunnel; terverifikasi dengan `nc -zv` | Diterapkan |
| 7 | Aplikasi | Satu container app mati | 3 | 3 | 9 | Sedang | Nginx mengalihkan ke container sehat, `restart: unless-stopped` | Diterapkan |
| 8 | TLS | Sertifikat Let's Encrypt kedaluwarsa | 3 | 3 | 9 | Sedang | Cron `certbot renew` mingguan | Diterapkan |

## Risk Matrix (Probabilitas x Dampak)

| P \ I | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| **5** | | | | | |
| **4** | | | | R1 | |
| **3** | | | R7, R8 | R3, R9 | R2 |
| **2** | | | | R10 | R4, R5, R6 |
| **1** | | | | | |

## Catatan

- Risiko 5 dan 6 sengaja dipertahankan karena kredensial `user:pass` dan struktur endpoint mengikuti spesifikasi modul. Dampaknya dikurangi oleh isolasi jaringan.
- Risiko 3 dan 9 didukung data pengujian: CPU mencapai 100% pada ketiga algoritma LB dan endpoint search menjadi bottleneck PostgreSQL.

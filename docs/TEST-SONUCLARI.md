# V7 doğrulama sonuçları — 21 Kasım 2026

## Kaynak ve yayın durumu

Düzeltmeden önce canlıdaki `index.html`, `style.css` ve `script.js` dosyalarının SHA-256 özetleri son teslim kaynağıyla aynıydı. Sorun, eski görsel yerleşim kurallarının bu kaynakta kalmış olmasıydı; yalnızca önbellek sorunu olarak değerlendirilmedi.

V7 bu kaynak üzerinden hazırlanmıştır. Bu rapor paket/önizleme kontrolünü anlatır; GitHub’a gönderim veya V7’nin canlıya çıkmış olduğu iddiası içermez.

## Otomatik kaynak kontrolleri

- 16 HTML sayfası ve 583 yerel dosya bağlantısı kontrol edildi.
- 15 sayfanın canonical, Open Graph ve JSON-LD verileri doğrulandı.
- 14 sitemap adresi, robots.txt, CNAME, UTF-8, manifest ve favicon dosyaları kontrol edildi.
- Hizmet kartlarına eklenen 15 tam fotoğraf bağlantısı yerel dosyalarla eşleşir.
- `npm run check` başarılıdır.

## Tarayıcıda görsel ve davranış kontrolü

Masaüstü: 1363 piksel dış görünüm / 1348 piksel içerik genişliği.

- Lastik filtresindeki üç kartın görsel genişliği ile çerçeve genişliği 400 piksel olarak eşleşti. Başlıkların üst koordinatları ve kartların alt koordinatları eşitti.
- Hakkımızda fotoğraflarının üst ve alt koordinatları eşitti. Açıklama etiketi görsellerin altında kaldı.

Dar ekran önizlemesi: aynı sayfa 320, 390 ve 768 piksel genişlikte iframe içinde render edildi. Bu, fiziksel telefon testi değildir.

| Görünüm | İçerik genişliği | Kaydırma genişliği | Sonuç |
|---|---:|---:|---|
| 320 px | 305 px | 305 px | Yatay taşma yok |
| 390 px | 375 px | 375 px | Yatay taşma yok |
| 768 px | 753 px | 753 px | Yatay taşma yok |

Her üç görünümde Hakkımızda fotoğraflarının üst ve alt hizası eşleşti. 320 piksel görünümde menünün açılması, 390 piksel görünümde lastik filtresi ve kart görsel genişlikleri ayrıca denendi.

## SEO ve gerçek ölçüm sınırı

Canonical, iletişim bilgileri ve 14 sayfalık yerel hizmet yapısı korunmuştur. Anahtar kelime listeleri ölçülmüş arama hacmi değildir. Bu sürüm için Lighthouse / PageSpeed puanı veya fiziksel cihaz performansı ölçülmedi. Google’da dizine eklenme ve sıralama durumu bu testlerle doğrulanmış sayılmaz. İlk sıra, belirli trafik ve 100 puan garantisi verilmez.

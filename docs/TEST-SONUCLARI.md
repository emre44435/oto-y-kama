# Test ve teslim durumu — 20 Kasım 2026

Bu dosya gerçekten yapılan kontrolleri, doğrulanmayan işlemlerden ayırır.

| Kontrol | Sonuç |
|---|---|
| 16 HTML sayfasının yerel dosya bağlantıları | Otomatik kontrol geçti; 598 bağlantı referansı doğrulandı |
| Sayfa başına tek H1, Türkçe dil, viewport ve açıklama | Geçti |
| JSON-LD sözdizimi | Tüm sayfalarda JSON ayrıştırma geçti |
| WhatsApp adresleri | +90 544 305 41 44 ve URL kodlamalı mesajlar doğrulandı |
| JavaScript sözdizimi | Node.js kontrolü geçti |
| Gerçek URL üretimi | Ayrı test kopyasında example.org/gurbuz/ ile iki kez çalıştırıldı; tekrar çalıştırma ve alt yol doğrulandı. Bu adres yalnızca testte kullanıldı; teslimde gerçek alan adı gibi yazılmadı |
| Yayın klasörü üretimi | _site üretimi test kopyasında geçti |
| Masaüstü görsel kontrol | Gerçek Chromium tarayıcıda ana sayfa ve yeni banner kontrol edildi |
| Mobil görsel kontrol | Aynı tarayıcıda 390 ve 320 piksel iframe ile responsive düzen incelendi; cihaz testi değildir; dar ekran son kontrolünde yatay taşma bulunmadı |
| Mobil menü | Açma ve kapatma kontrol edildi |
| Hizmet filtresi | Lastik & jant seçiminde 3 ilgili kart, tüm hizmetlerde 6 kart doğrulandı |
| WhatsApp formu | İkinci el lastik, örnek araç, ölçü ve Gürün bölgesiyle mesaj oluşturma kontrol edildi. Gerçek mesaj gönderilmedi |
| Fotoğraf galerisi | Mobil genişlikte açma/kapatma doğrulandı |
| Google haritası | Verilen adrese göre URL ve isteğe bağlı iframe yapılandırıldı; kesin işletme pini / Place ID doğrulanmadı |
| Lighthouse / PageSpeed | Bu ortamda ölçüm tamamlanamadı. Başlatılan Lighthouse, Chromium debugging portuna ulaşamadı. Performans, erişilebilirlik, en iyi uygulamalar ve SEO için ölçülmüş sayısal puan verilmedi |
| Yayındaki Lighthouse raporu | GitHub Pages iş akışına mobil ve masaüstü rapor üretimi eklendi; henüz kullanıcının GitHub hesabında çalıştırılmadı |
| Gerçek kullanıcı Core Web Vitals | Canlı kullanıcı verisi olmadığı için ölçülmedi |
| Google dizin / sıralama | Yayın ve Search Console erişimi olmadığı için doğrulanmadı |
| Google Ads / GA4 / GTM dönüşümleri | Bağlanmadı; yalnızca sayfa belleğinde olay hazırlığı var |

## Uygulanan performans önlemleri

Yerel WOFF2 fontlar, responsive WebP görseller, lazy loading, öncelikli açılış görseli, üçüncü taraf JS bağımlılığı olmayan temel sayfa, isteğe bağlı Google haritası, CSS ağırlıklı animasyon ve prefers-reduced-motion desteği.

Puanlar yalnızca testin yapıldığı URL, cihaz ve koşullar için geçerlidir. Kaynak koddan hareketle “100 puan” ilan edilmemiştir. Otomatik erişilebilirlik puanı da tüm kullanıcılar için kusursuz erişilebilirlik garantisi değildir.

## Yayında kullanıcı tarafından tamamlanacaklar

Alan adı / Pages URL’si, HTTPS ve yönlendirme kontrolü, kesin harita pini, çalışma saatleri, Search Console sahipliği ve sitemap gönderimi, Google İşletme Profili düzenlemesi, gerçek ölçüm etiketleri ve uygun tercih yönetimi. GitHub Actions iş akışı hazırlanmıştır; sizin hesabınızda çalıştırılması bu teslimde doğrulanmadı.

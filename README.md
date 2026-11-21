# Gürbüz Oto — V7 tasarım düzeltmesi

Ana adres: https://darendeyikama.com/

Bu paket, yayınlanan son sürümün tasarım düzeltmesidir. GitHub Desktop ve GitHub Pages için hazır HTML, CSS ve JavaScript içerir; ek bağımlılık kurulumu gerekmez.

## Düzeltilen alanlar

- Hizmet kartlarındaki siyah yan boşluklar kaldırıldı. Görseller aynı 4:3 çerçeveyi doldurur; başlıklar ve kart altları aynı hizada kalır.
- Karttaki görsele veya “Fotoğrafı aç” bağlantısına basıldığında fotoğrafın tamamı açılır. Fotoğraf dosyalarının orijinalleri değiştirilmedi; kartta görselin bir bölümü eşit çerçeveye sığacak şekilde gösterilir.
- Hakkımızda bölümündeki iki işletme fotoğrafının üst ve alt hizası eşitlendi. Fotoğraf açıklaması, görsellerin altına alındı.
- Dar ekranlarda kart bağlantıları gerektiğinde satır değiştirir; sayfayı yana itmez.
- Stil ve JavaScript bağlantıları sürümlendi: `?v=7.0.0-20261121`. Sayfa kaynağındaki `site-version` değeri `7.0.0` olmalıdır.

## Mevcut GitHub yayınına uygulama

1. ZIP’i çıkarın. `gurbuz-oto-web` klasörünün **içindeki dosyaları**, mevcut `oto-y-kama` deposunun köküne kopyalayıp aynı dosyaların üzerine yazın. `index.html`, deponun kökünde olmalıdır.
2. GitHub Desktop’ta değişiklikleri inceleyin, commit oluşturun ve **Push origin** yapın.
3. GitHub → Actions bölümünde **GitHub Pages — Gürbüz Oto** iş akışının başarıyla tamamlanmasını bekleyin.
4. https://darendeyikama.com/ adresini `Ctrl + F5` ile açın. Sayfa kaynağında `site-version` → `7.0.0` ve `style.css?v=7.0.0-20261121` göründüğünü doğrulayın.

Mevcut DNS, alan adı ve Search Console doğrulamasını yeniden kurmanız gerekmez. Bu paketin hazırlanması tek başına GitHub deposuna gönderim veya canlı yayın değişikliği yapmaz.

## Yerel önizleme ve kontrol

ZIP’ten çıkan `index.html` doğrudan açılabilir. Node.js 22+ varsa:

```sh
npm run dev
npm run check
npm run build
```

`npm run build`, GitHub Pages’e yüklenecek dosyaları `_site` klasörüne hazırlar. GitHub Actions bu adımı otomatik çalıştırır.

## SEO yapısı

- Ana adres, canonical ve paylaşım adresleri `https://darendeyikama.com/` olarak tanımlıdır.
- Site haritasında 14 indekslenebilir sayfa vardır; gizlilik ve 404 sayfaları harita dışındadır.
- Oto yıkama, oto kuaför, pasta cila, ikinci el lastik, lastik tamiri, sıfır lastik ve jant için ayrı hizmet sayfaları bulunur.
- İşletme telefonu, adresi ve yapılandırılmış veriler tutarlıdır. Çevre bölgeler için gerçek işletme adresi Darende olarak belirtilir.
- `robots.txt`, `sitemap.xml`, favicon ve mobil bağlantılar dahildir.
- Anahtar kelime eşlemesi ve içerik planı `docs/SEO-PLANI.md` içindedir. Tahmini kelime listeleri, ölçülmüş arama hacmi veya sıralama kanıtı değildir.

## İletişim ve ölçüm

Telefon / WhatsApp: +90 544 305 41 44

Adres: Sungur Mahallesi, Solakoğlu Sanayi Sitesi, Gürbüz Oto Yıkama No: 3, Darende / Malatya.

Form, seçilen hizmet, bölge, araç ve lastik ölçüsüyle bir WhatsApp mesajı hazırlar; mesajı ziyaretçi gönderir. Harita, düğmeye basıldıktan sonra verilen adres üzerinden Google’dan yüklenir. GA4 / Google Ads hesap kimlikleri tanımlanmış değildir; gerçek dönüşüm ölçümü bağlı kabul edilmemelidir.

Kontroller ve sınırlar: `docs/TEST-SONUCLARI.md`.

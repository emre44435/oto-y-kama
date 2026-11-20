# Gürbüz Oto — darendeyikama.com / Son final

Seçilen ana adres: https://darendeyikama.com/

Alan adı standart ASCII / Latin harfleriyle yazılmıştır. Canonical, Open Graph, Twitter paylaşım görseli, işletme/hizmet yapılandırılmış verileri, robots.txt ve 14 sayfalık sitemap bu adrese göre hazırlandı. 16 HTML sayfası vardır; gizlilik sayfası ve 404 sitemap dışında tutulur.

## Önizleme

ZIP’i çıkarıp index.html dosyasını açın. İsterseniz Node.js 22+ ile `npm run dev` çalıştırın. Bağımlılık kurulumu gerekmez. Kaynak HTML ve görseller doğrudan kullanılabilir; yayın öncesinde tekrar alan adı girmeniz gerekmez.

## GitHub Desktop ve GitHub Pages

1. ZIP’ten çıkan gurbuz-oto-web klasörünün içeriğini GitHub deposunun köküne yerleştirin. index.html deponun kökünde olmalı; ikinci bir klasörün içinde kalmamalı.
2. GitHub Desktop üzerinden commit ve Publish repository / Push origin işlemini yapın.
3. GitHub deposu Settings → Pages → Source alanını GitHub Actions seçin.
4. Pages → Custom domain alanına `darendeyikama.com` yazıp kaydedin. Alan adı sahiplik doğrulamasını hesabınızda tamamlayın.
5. Alan adı sağlayıcınızdaki DNS’i GitHub Pages için yapılandırın. Önce GitHub’daki custom domain ayarını yapın; sonra DNS’i bağlayın. Kullanıcı adınız / depo adresiniz bu teslimde bilinmediği için bu hesabınıza özel işlem yapılmadı.
6. DNS doğrulandıktan ve sertifika hazır olduktan sonra Enforce HTTPS’i etkinleştirin.
7. Actions → “GitHub Pages — Gürbüz Oto” iş akışını çalıştırın. Normal main/master push işlemleri de iş akışını tetikler. Pages ayarından önce gönderdiyseniz Run workflow ile yeniden başlatın.

CNAME dosyası darendeyikama.com içerir. GitHub Actions yayınlarında tek başına bu dosya alan adını bağlamaz; Pages → Custom domain ve DNS ayarları ayrıca gerekir. İş akışındaki SITE_URL sabit olarak https://darendeyikama.com/ kullanır; varsayılan github.io adresine göre canonical üretmez.

Resmî kurulum rehberi: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## cPanel / farklı hosting

`npm run build` komutuyla üretilen _site klasörünün içeriği web köküne yüklenebilir. _site klasörünün kendisini ikinci bir alt klasör olarak yüklemeyin. Node.js sunucuda gerekli değildir; çıktı tamamen statiktir. Alan adı ve SSL, hosting panelinde ayrıca bağlanmalıdır.

## Favicon

Logodaki otomobil, lastik ve kırmızı kavis detaylarını taşıyan tek tasarım kullanılır. Kök favicon.svg, çok boyutlu favicon.ico (16/32/48/64), 16/32 PNG, 192/512 uygulama ikonları ve 180 Apple touch ikonu pakettedir. Tüm sayfaların link etiketleri ve web manifesti güncellendi. Marka logosunun tamamı header/footer için korunur.

## Kontroller

- `npm run check`: yerel bağlantılar, WhatsApp adresleri, tek H1, meta etiketleri, JSON-LD, canonical/OG alan adları, sitemap, CNAME, UTF-8 ve favicon dosyaları.
- `npm run build`: yalnızca yayın dosyalarını _site klasörüne çıkarır.
- GitHub’da yayın sonrasında iş akışı mobil/masaüstü Lighthouse raporu üretmek üzere hazırlanmıştır. Bu iş akışı sizin hesabınızda henüz çalıştırılmadı.
- Gerçek kapsam: docs/TEST-SONUCLARI.md. SEO planı ve anahtar kelime çalışması docs klasöründedir.

## Yayın ve ölçüm durumu

Bu teslim dosya hazırlığıdır. GitHub’a veya hosting hesabınıza yayın yapılmadı; DNS/SSL bağlantısı, Search Console sahipliği ve sitemap gönderimi, Google İşletme Profili düzenlemesi yapılmadı. Gerçek Google Ads / GA4 / GTM kimlikleri verilmediği için dönüşüm izleme bağlanmadı. dataLayer olayları yalnızca hazırlıktır; tamamlanan telefon konuşması veya gönderilmiş WhatsApp mesajı ölçüldüğü iddia edilmez.

Çalışma saatleri, fiyatlar, kesin harita pini, stok adetleri ve müşteri puanları verilmediği için uydurulmadı. Harita adres bazlı aramadır. Google’da birincilik veya ölçülmemiş 100 puan sonucu vaat edilmez.

# Gürbüz Oto Kuaför & Lastik — V6

Derleme gerektirmeyen HTML, CSS ve JavaScript sitesi. Ana dosyalar `index.html`, `style.css`, `script.js`. Sayfa içerikleri HTML içinde yer alır; Google ve JavaScript kapalı tarayıcılar okuyabilir.

## Hemen görüntüleme

ZIP’i çıkartın ve `index.html` dosyasını açın. Tüm hizmet, adres ve iletişim sayfaları pakettedir. WhatsApp formu mesajı hazırlar; gönderimi ziyaretçi yapar. Site üzerinde ödeme veya sunucuya kayıt yapan bir form yoktur.

İsterseniz Node.js 22+ ile `npm run dev` komutunu çalıştırıp `http://localhost:3000` adresinden inceleyin. Paket kurulumu veya `npm install` gerekmez.

## GitHub Desktop ile yayın

1. ZIP’ten çıkan `gurbuz-oto-web` klasörünü bilgisayarınıza alın.
2. GitHub Desktop → File → Add local repository ile bu klasörü seçin. Git deposu bulunamadığı uyarısında aynı konumda depo oluşturma seçeneğini kullanın. Alternatif olarak yeni bir depo oluşturup bu klasörün **içeriğini** deponun köküne kopyalayın.
3. Dosyaları commit edin ve Publish repository / Push origin ile gönderin. GitHub Pages erişimi hesabınızın planına ve depo görünürlüğüne bağlıdır.
4. GitHub’daki depo → Settings → Pages → Build and deployment → Source: **GitHub Actions** seçin.
5. Actions sekmesinden “GitHub Pages — Gürbüz Oto” iş akışını çalıştırın. İlk gönderim Pages ayarından önce yapıldıysa Run workflow ile yeniden başlatın.
6. İş akışı gerçek Pages adresini alır; canonical, paylaşım etiketleri, yapılandırılmış veri URL’leri, `sitemap.xml` ve `robots.txt` içindeki Sitemap satırını üretir. Sonra dosyaları kontrol eder ve yayınlar.
7. Yayın tamamlandığında Settings → Pages içinde verilen URL’yi açın. Alan adınızı daha sonra bağlarsanız Pages ayarını güncelleyip iş akışını yeniden çalıştırın.

Bu teslimde sizin adınıza GitHub deposu oluşturulmadı, yayın yapılmadı ve Search Console’a gönderim yapılmadı. İş akışı hazırlandı; hesabınızda çalıştırılmalıdır.

## Alan adı, cPanel veya farklı hosting

Alan adı verilmediği için kaynak HTML’de hayalî canonical adresi bulunmaz. Kaynak `sitemap.xml` bilerek boştur. Gerçek URL belli olduğunda:

```sh
node scripts/configure-site.mjs --url https://GERCEK-YAYIN-ADRESINIZ/
npm run check
npm run build
```

Komuttaki örnek metni kendi gerçek adresinizle değiştirin. Windows’ta `YAYINA_HAZIRLA.bat` aynı işlemleri adresinizi sorarak yapar. `_site` içeriğini `public_html` gibi web köküne yükleyin. GitHub Pages’in **Deploy from a branch** yöntemi kullanılacaksa bu hazırlığı önce yerelde yapıp üretilen kök dosyaları commit edin. Proje alt dizininde Pages kullanırken `robots.txt` Google tarafından alan adının kökünde aranır; proje altındaki dosya tüm `github.io` alanını yönetmez. Sitemap’in tam URL’sini Search Console’a gönderin. Özel alan adı bu sınırlamayı kaldırır.

## Düzenleme

- Renk, düzen ve mobil kırılımlar: `style.css`.
- Menü, filtre, galeri ve WhatsApp mesaj oluşturma: `script.js`.
- Hizmet metinleri: `hizmetler/*/index.html`.
- Sayfa başlığı veya açıklaması değişirse ilgili HTML etiketi ve `scripts/pages.json` kaydını birlikte güncelleyin.
- SEO: `docs/SEO-PLANI.md`, `docs/ANAHTAR-KELIMELER.csv`, `docs/YERLESIMLER.csv`.
- Gerçek test kapsamı ve sonuçları: `docs/TEST-SONUCLARI.md`.
- Görseller: `assets/images`. Yerel font ve lisansı: `assets/fonts`.

## Ölçüm durumu

Telefon, WhatsApp ve yön tarifi tıklamaları için sayfa belleğinde `contact_click` olayları hazırlanır. GA4, GTM veya Google Ads hesabı bağlanmadı; gerçek dönüşüm ölçümü kurulmuş değildir. Tıklama, tamamlanan arama veya gönderilen WhatsApp mesajını tek başına kanıtlamaz. Ölçüm için gerçek hesap kimlikleri, tercih/izin yönetimi ve yayında doğrulama gerekir.

## Doğruluk sınırları

Çalışma saatleri, kesin koordinat / Google Place ID, fiyatlar, stok adetleri, müşteri yorumları ve puanları verilmediği için uydurulmadı. Harita, paylaşılan adres üzerinden arama yapar; işletme pini bağımsız olarak doğrulanmadı. Şubeler veya mobil yol yardım hizmeti eklenmedi. İlk sıra ve değişmez PageSpeed 100 garantisi yoktur. Hız sonuçları raporda belirtilen test koşulları için geçerlidir.

Fotoğraf açıklaması: orijinal işletme ve atölye fotoğrafları galeride korunmuştur. Açılış bannerları, gönderdiğiniz görsel referanslar temelinde düzenlenmiş tanıtım kompozisyonlarıdır. Uygulama görselleri gerektiği yerde temsili olarak belirtilmiştir. Şeffaf logo, verdiğiniz logonun arka planı temizlenmiş sürümüdür.

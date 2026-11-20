# Gürbüz Oto Kuaför & Lastik

Darende’deki atölyenin Türkçe tanıtım sitesi. Klasörde düzenlenebilir 20 HTML sayfası, yerel Manrope fontları, WebP fotoğraflar, CSS, JavaScript ve yayın araçları bulunur. Ana sayfa, hizmetler, adres ve yasal içerikler HTML’nin içindedir.

## İlk yayın

Teslim ZIP’inin üst klasöründeki **YAYIN_PAKETI_HAZIRLA.html** dosyasını açın. Gerçek site adresinizi yazın. Yasal bilgiler bölümüne işletme e-postasını, barındırma şirketini ve şirketin iletişim sayfasını ekleyin. **Yayın ZIP’ini oluştur** düğmesine basın. İnen dosyanın içeriğini hostingin yayın klasörüne çıkartın. Ana sayfa, diğer sayfalar, görseller, JavaScript, CSS, manifest, favicon, özel 404, robots.txt ve site haritası birlikte yüklenir.

Hazırlayıcı bu sürümün bir kopyasını içinde taşır. Aşağıdaki kaynak dosyalarını sonradan düzenlediğinizde güncel dosyaları Node.js veya GitHub Pages yöntemiyle yayınlayın.

## Önizleme ve kaynak kod

Klasördeki index.html dosyası çift tıklamayla açılır. Geliştirme için Node.js 22 veya üstü ile aşağıdaki komut çalışır. Ek paket gerekmez.

```sh
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın. Menü, galeri, hizmet filtresi, WhatsApp taslağı ve isteğe bağlı harita script.js içindedir. Renkler, oranlar ve mobil davranış style.css içindedir. Sayfa metinleri ayrı HTML dosyalarındadır. Başlık, açıklama veya sayfa adresi değiştiğinde scripts/pages.json dosyasındaki ilgili kaydı da düzeltin.

## Düzenlenen kaynakları paketleme

Windows’ta YAYINA_HAZIRLA.bat yayın adresini sorar. Komut satırında ise aşağıdaki komutları kullanın. Örnek adresin yerine sitenin açılacağı gerçek tam adresi yazın.

```sh
node scripts/configure-site.mjs --url https://site-adiniz.example/
node scripts/build-public.mjs
node scripts/check.mjs --public
```

Bu işlem _site klasörüne temiz bir yayın üretir. Klasörün içeriğini hostingin web köküne yükleyin. Site bir alt dizinde çalışıyorsa ilk komutta tam alt dizini de belirtin. Kurulum dosyası site-config.json içinde siteUrl ile beraber email, provider ve providerUrl alanları kullanılabilir. Komut satırında karşılık gelen ortam değişkenleri BUSINESS_EMAIL, HOSTING_NAME ve HOSTING_INFO_URL şeklindedir.

## GitHub Pages

Kaynak klasörünün içeriğini, gizli .github klasörüyle birlikte deponun köküne ekleyin. GitHub’da Settings → Pages → Build and deployment altında GitHub Actions seçin. Ana dala gönderimden sonra Actions içindeki “GitHub Pages — Gürbüz Oto” iş akışı çalışır. Gerekirse Run workflow ile başlatın. İşletme e-postasını depo ayarlarında Actions değişkeni BUSINESS_EMAIL olarak ekleyebilirsiniz.

İş akışı yayın adresini Pages’ten alır, GitHub Pages’i yer sağlayıcı olarak ekler, _site içeriğini üretip denetler ve yayına gönderir. Mobil ve masaüstü Lighthouse raporları Actions çıktısına eklenir. Alan adınız değişirse iş akışını yeniden çalıştırın.

## Site haritası ve barındırma

Yayın aracı, scripts/pages.json içindeki dizine açık sayfaların tam adreslerini sitemap.xml dosyasına yazar. robots.txt de aynı site haritasına bağlanır. Google, robots.txt dosyasını alan adının kökünde arar. Başka bir sitenin alt klasörünü kullanıyorsanız ana alanın robots.txt ayarını hosting yöneticisiyle kontrol edin ve tam sitemap adresini Search Console’a gönderin.

Apache’de .htaccess, GitHub Pages, Cloudflare Pages ve Netlify’da 404.html hata sayfası içindir. Farklı sunucularda 404 yanıtını hosting panelinde 404.html dosyasına bağlayın. _headers dosyası bunu destekleyen servislerde statik dosya önbelleğini ve yanıt başlıklarını ayarlar.

## İletişim ve işletme bilgileri

Telefon ve WhatsApp numarası 0544 305 41 44. Vergi levhasındaki yazışma adresi Sungur Mahallesi, Solakoğlu Site Sokak No. 6, Darende / Malatya. Yol tarifleri işletme adı ve sokakla arama yapar. Ziyaretçi gelmeden önce telefonla giriş ve müsaitlik teyidi alabilir.

WhatsApp formu ziyaretçinin yazdıklarını kendi tarayıcısında mesaj taslağına dönüştürür. WhatsApp düğmesine basınca taslak WhatsApp’a aktarılır. Sitede ödeme ve sipariş kaydı bulunmaz. Harita yalnızca ziyaretçi açarsa yüklenir. Reklam, analitik veya yeni bir form sağlayıcısı eklendiğinde KVKK aydınlatması ve çerez politikası gerçek veri akışına göre yeniden düzenlenmelidir.

Fotoğraf galerisinde özgün işletme çekimleri yer alır. Hizmet kartlarında farklı oranlardaki fotoğrafların çevresi 3:2 çerçeveyi tamamlamak için düzenlenmiştir. Yerel fontun lisansı assets/fonts/OFL.txt içindedir. SEO hedefleri ve teslim testleri docs dizinindedir.

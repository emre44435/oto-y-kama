'use strict';
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const menu = $('#navigation'), toggle = $('#menu-toggle');
  const closeMenu = () => { menu?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Menüyü aç'); };
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç'); });
  $$('#navigation a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') {
    if (toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
    closeLightbox();
  } });
  matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  menu?.addEventListener('focusout', event => {
    if (event.relatedTarget && !event.relatedTarget.closest('.header')) closeMenu();
  });
  const backTop = $('.backtop');
  const firstHeader = $('.topbar');
  if (backTop && firstHeader && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver(([entry]) => {
      backTop.classList.toggle('is-visible', entry.boundingClientRect.bottom < 0);
    });
    headerObserver.observe(firstHeader);
  }

  const filters = $$('[data-filter]'), cards = $$('[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => { card.hidden = kind !== 'all' && card.dataset.category !== kind; });
    const status = $('#filter-status');
    if (status) status.textContent = `${cards.filter(c => !c.hidden).length} hizmet gösteriliyor.`;
  }));

  // Only in-memory events. No analytics endpoint or tag is loaded by this file.
  const recordContact = (method, service, placement) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'contact_click', contact_method: method, service_name: service || 'Genel bilgi', placement: placement || 'site' });
  };
  $$('a[data-contact]').forEach(a => a.addEventListener('click', () => recordContact(a.dataset.contact, a.dataset.service, a.dataset.placement)));

  const form = $('#quote-form');
  if (form) {
    const service = $('#service'), car = $('#vehicle'), size = $('#tire-size'), region = $('#region'), note = $('#note'), preview = $('#message-preview'), tireField = $('#tire-field');
    const update = () => {
      const tire = /Lastik|Jant/i.test(service.value);
      tireField.hidden = !tire;
      let message = `Merhaba Gürbüz Oto, ${service.value.toLocaleLowerCase('tr-TR')} hizmetiniz hakkında bilgi ve güncel fiyat almak istiyorum.`;
      if (car.value.trim()) message += `\nAraç: ${car.value.trim()}`;
      if (tire && size.value.trim()) message += `\nLastik / jant ölçüsü: ${size.value.trim()}`;
      message += `\nBulunduğum bölge: ${region.value}`;
      if (note.value.trim()) message += `\nTalebim: ${note.value.trim()}`;
      message += '\nİşlem kapsamı, uygunluk ve randevu seçeneklerini paylaşabilir misiniz? Teşekkür ederim.';
      preview.value = message;
    };
    [service, car, size, region, note].forEach(el => el.addEventListener('input', update));
    update();
    const selected = new URLSearchParams(location.search).get('hizmet');
    if (selected && [...service.options].some(o => o.value === selected)) { service.value = selected; update(); }
    form.addEventListener('submit', () => { update(); recordContact('whatsapp_form', service.value, 'teklif_formu'); });
  }

  $$('[data-load-map]').forEach(button => button.addEventListener('click', () => {
    const panel = button.closest('.map-panel');
    const frame = document.createElement('iframe');
    frame.src = button.dataset.mapSrc;
    frame.title = 'Gürbüz Oto Kuaför ve Lastik, Sungur Mahallesi Darende adres haritası';
    frame.loading = 'eager';
    frame.referrerPolicy = 'no-referrer';
    frame.allowFullscreen = true;
    const previous = [...panel.childNodes];
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'map-close';
    close.textContent = 'Haritayı kapat';
    close.addEventListener('click', () => {
      panel.replaceChildren(...previous);
      button.focus();
    });
    panel.replaceChildren(frame, close);
    close.focus();
    recordContact('map_view', 'Konum', 'harita');
  }));

  let lightbox = null, previousFocus = null, currentImage = 0;
  const galleryLinks = $$('[data-gallery]');
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.remove(); lightbox = null; document.body.classList.remove('locked'); previousFocus?.focus();
  }
  function showImage(index) {
    currentImage = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[currentImage];
    const img = $('img', lightbox); img.src = link.href; img.alt = link.dataset.caption;
    $('p', lightbox).textContent = link.dataset.caption;
  }
  galleryLinks.forEach((link, i) => link.addEventListener('click', e => {
    e.preventDefault(); previousFocus = link;
    lightbox = document.createElement('div'); lightbox.className = 'lightbox'; lightbox.setAttribute('role', 'dialog'); lightbox.setAttribute('aria-modal', 'true'); lightbox.setAttribute('aria-label', 'İşletme fotoğrafları');
    const close = document.createElement('button'); close.className = 'lightbox-close'; close.setAttribute('aria-label', 'Fotoğrafı kapat'); close.textContent = '×'; close.addEventListener('click', closeLightbox);
    const img = document.createElement('img'), caption = document.createElement('p');
    const prev = document.createElement('button'), next = document.createElement('button');
    prev.className = 'lightbox-nav lightbox-prev'; next.className = 'lightbox-nav lightbox-next';
    prev.textContent = '‹'; next.textContent = '›'; prev.setAttribute('aria-label', 'Önceki fotoğraf'); next.setAttribute('aria-label', 'Sonraki fotoğraf');
    prev.addEventListener('click', () => showImage(currentImage - 1)); next.addEventListener('click', () => showImage(currentImage + 1));
    lightbox.append(close, img, caption, prev, next); document.body.append(lightbox); document.body.classList.add('locked'); showImage(i); close.focus();
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    lightbox.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showImage(currentImage - 1);
      if (event.key === 'ArrowRight') showImage(currentImage + 1);
      if (event.key === 'Tab') { const items = [close, prev, next], at = items.indexOf(document.activeElement); event.preventDefault(); items[(at + (event.shiftKey ? 2 : 1)) % 3].focus(); }
    });
  }));

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .07 });
    $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top > innerHeight + 60) { el.classList.add('ready'); observer.observe(el); } });
  }
})();

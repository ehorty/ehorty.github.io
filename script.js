(() => {
  'use strict';

  lucide.createIcons();

  const ls = window.localStorage;
  const $ = (id) => document.getElementById(id);

  const i18n = {
    en: {
      'nav.vibe': 'vibe',
      'nav.stack': 'stack',
      'nav.drops': 'drops',
      'nav.link': 'link',
      'hero.eyebrow': 'python engineer · open to the game',
      'hero.lead': 'Backends, bots & little automations — handled with serious drip. Black & white base, one loud accent. That\u2019s the whole palette.',
      'hero.drops': 'view the drops',
      'hero.talk': 'link up',
      'hero.status': 'status / open for projects',
      'hero.now': 'now spinning: async python, deep cuts only',
      'vibe.title': 'the vibe',
      'vibe.big': 'Clean code, clean cuts, zero grey areas. If it runs twice — it gets scripted.',
      'vibe.word': 'I\u2019m Ehorty, a Python developer. Backend, automation and integrations are my thing. I write maintainable code and care about clear architecture. Comfortable with APIs, bots, scraping and databases. I automate the boring stuff and keep it simple where I can. Easy to work with: no ego, no drama, no fuss. Happy to discuss tasks, listen to feedback and own the result. Open to interesting projects.',
      'vibe.c1t': 'Clean',
      'vibe.c1d': 'Typed, tested, tidy. Code you can read next Monday.',
      'vibe.c2t': 'Swift',
      'vibe.c2d': 'Fast delivery, no drama, no missed deadlines.',
      'vibe.c3t': 'Deep',
      'vibe.c3d': 'Currently going deeper into asyncio and tooling.',
      'stack.title': 'the kit',
      'stack.s1': 'backend',
      'stack.s2': 'bots',
      'stack.s3': 'data',
      'stack.s4': 'tools',
      'drops.title': 'drops',
      'drops.d1': 'This very page — hand-built, bilingual, with a soundtrack.',
      'drops.d2': 'Compiling in the background. Watch this space.',
      'drops.coming': 'soon',
      'drops.t2': 'private · building',
      'link.title': 'link up',
      'link.big': 'Got an idea?<br>Let\u2019s keep it <span class="accent">SWAG.</span>',
      'footer.copy': '\u00A9 2026 ehorty — swag edition, no refunds',
      'footer.hint': 'psst — type',
      'dock.title': 'lofi_girl · radio',
      'dock.live': 'LIVE',
    },
    ru: {
      'nav.vibe': 'вайб',
      'nav.stack': 'арсенал',
      'nav.drops': 'дропы',
      'nav.link': 'связь',
      'hero.eyebrow': 'python engineer · открыт к движу',
      'hero.lead': 'Бэкенды, боты и мелкая автоматизация — с настоящим вайбом. Чёрно-белая база, один громкий акцент. Вся палитра.',
      'hero.drops': 'смотреть дропы',
      'hero.talk': 'связаться',
      'hero.status': 'статус / открыт для проектов',
      'hero.now': 'сейчас в эфире: async python, только глубь',
      'vibe.title': 'вайб',
      'vibe.big': 'Чистый код, чистые резы, ноль серых зон. Запустилось дважды — значит, скриптуем.',
      'vibe.word': 'Я Ehorty, Python-разработчик. Специализируюсь на backend-разработке, автоматизации и интеграциях. Пишу поддерживаемый код и ценю понятную архитектуру. Умею работать с API, ботами, парсингом и базами данных. Автоматизирую рутину и не усложняю там, где можно сделать проще. Комфортный в работе человек: без пафоса, токсичности и лишней суеты. Спокойно обсуждаю задачи, слышу обратную связь и отвечаю за результат. Открыт к интересным проектам.',
      'vibe.c1t': 'Чисто',
      'vibe.c1d': 'Типизировано, протестировано, опрятно. Код, который читается в понедельник.',
      'vibe.c2t': 'Быстро',
      'vibe.c2d': 'Скорость сдачи, без драмы и сорванных дедлайнов.',
      'vibe.c3t': 'Глубоко',
      'vibe.c3d': 'Сейчас копаю глубже в asyncio и инструментарий.',
      'stack.title': 'арсенал',
      'stack.s1': 'бэкенд',
      'stack.s2': 'боты',
      'stack.s3': 'данные',
      'stack.s4': 'инструменты',
      'drops.title': 'дропы',
      'drops.d1': 'Эта самая страница — ручная сборка, два языка, со звуком.',
      'drops.d2': 'Компилируется в фоне. Следи за этой строкой.',
      'drops.coming': 'скоро',
      'drops.t2': 'приватно · собираю',
      'link.title': 'на связи',
      'link.big': 'Идея есть?<br>Сделаем это <span class="accent">SWAG.</span>',
      'footer.copy': '\u00A9 2026 ehorty — свэг-издание, без возвратов',
      'footer.hint': 'псс — введи',
      'dock.title': 'lofi-девочка · радио',
      'dock.live': 'ЭФИР',
    },
  };

  const langBtn = $('langToggle');
  const invertBtn = $('invertBtn');
  const burger = $('burger');
  const nav = $('nav');
  const toast = $('swagToast');
  const boot = $('boot');

  let lang = ls.getItem('lang') || 'en';
  if (!['en', 'ru'].includes(lang)) lang = 'en';
  let theme = ls.getItem('theme') || 'dark';
  if (!['dark', 'light'].includes(theme)) theme = 'dark';

  document.documentElement.setAttribute('data-theme', theme);
  boot.classList.add('done');
  setTimeout(() => boot.remove(), 520);

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = i18n[lang][key] || key;
      if (key === 'footer.hint') {
        el.textContent = val + ' ';
        const code = document.createElement('code');
        code.textContent = 'swag';
        el.appendChild(code);
      } else if (key === 'link.big' || key === 'vibe.word') {
        el.innerHTML = val;
      } else {
        el.innerHTML = val;
      }
    });
  }
  applyLang();

  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'ru' : 'en';
    ls.setItem('lang', lang);
    applyLang();
  });

  invertBtn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    ls.setItem('theme', theme);
  });

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  const typed = [];
  const target = 'swag';
  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
    typed.push(e.key.toLowerCase());
    if (typed.length > target.length) typed.shift();
    if (typed.join('') === target) {
      typed.length = 0;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1600);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  const dock = $('dock');
  const playBtn = $('dockPlay');
  const volume = $('dockVol');

  const maybe = (v) => (v && isFinite(v) && v >= 0 ? v : 5);
  volume.value = maybe(parseFloat(ls.getItem('vol')) || 5);

  const LOFI_ID = 'rFZHOHl-L8A';
  let yt = null;
  let ytReady = false;

  const initYT = () => {
    yt = new YT.Player('yt', {
      videoId: LOFI_ID,
      playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0, modestbranding: 1, origin: window.location.origin },
      events: {
        onReady: () => {
          ytReady = true;
          yt.setVolume(Number(volume.value));
          try { yt.playVideo(); } catch (e) {}
          start();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            dock.classList.add('playing');
            playBtn.setAttribute('aria-label', 'pause');
          } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
            dock.classList.remove('playing');
            playBtn.setAttribute('aria-label', 'play');
          }
        },
      },
    });
  };

  let soundOn = false;
  const unmute = () => {
    if (!soundOn && ytReady) {
      yt.unMute();
      yt.setVolume(Number(volume.value));
      soundOn = true;
    }
  };

  window.onYouTubeIframeAPIReady = initYT;

  const loadYT = () => {
    if (window.YT && window.YT.Player) {
      initYT();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.head.appendChild(tag);
  };

  playBtn.addEventListener('click', () => {
    if (!ytReady) return;
    unmute();
    const s = yt.getPlayerState();
    if (s === YT.PlayerState.PLAYING) yt.pauseVideo();
    else yt.playVideo();
  });

  volume.addEventListener('input', () => {
    if (ytReady) yt.setVolume(Number(volume.value));
    ls.setItem('vol', String(volume.value));
  });

  const start = () => {
    if (ytReady) {
      unmute();
      if (yt.getPlayerState() !== YT.PlayerState.PLAYING) yt.playVideo();
    }
  };

  dock.classList.remove('hidden');
  loadYT();
  start();
  const startOnce = () => {
    dock.classList.remove('hidden');
    start();
  };
  window.addEventListener('pointerdown', startOnce, { once: true });
  window.addEventListener('keydown', startOnce, { once: true });
})();
// ===== Boot =====
const boot = document.getElementById('boot');

const bootMin = new Promise((r) => setTimeout(r, 900));
const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((r) => window.addEventListener('load', r, { once: true }));

Promise.all([bootMin, pageLoaded]).then(() => boot.classList.add('done'));

// ===== Localization =====
const i18n = {
  en: {
    'boot.tag': 'est. 2026 · black & white edition',
    'nav.who': 'who',
    'nav.work': 'work',
    'nav.stack': 'stack',
    'nav.talk': 'talk',

    'hero.eyebrow': '// python engineer — open to projects',
    'hero.lead': 'Bots, backends and tiny busted-automations. Rendered in pure black & white, shipped in 2026.',
    'hero.work': 'see the work',
    'hero.talk': 'let\u2019s talk',
    'hero.s1': '100% mono',
    'hero.s2': 'no drama',
    'hero.m1': 'location: anywhere',
    'hero.m2': 'status: open',

    'who.title': 'who',
    'who.big': 'Backends with manners, bots that don\u2019t nag, automation that just works. If it runs twice — I script it.',
    'who.f1t': 'core',
    'who.f1d': 'api · bots · automation',
    'who.f2t': 'style',
    'who.f2d': 'typed · tested · tidy',
    'who.f3t': 'vibe',
    'who.f3d': 'black & white, zero grey',

    'work.title': 'work',
    'work.p1': 'this very page — monochrome, built by hand, two languages.',
    'work.p2': 'currently compiling. watch this space.',
    'work.t2': 'soon',

    'stack.title': 'stack',
    'stack.s1': 'backend',
    'stack.s2': 'bots',
    'stack.s3': 'data',
    'stack.s4': 'tools',

    'talk.title': 'talk',
    'talk.big': 'Got an idea?\nLet\u2019s make it <span class="outlined">black&nbsp;&amp;&nbsp;white.</span>',

    'footer.copy': '© 2026 ehorty — made in b/w, no filters',
    'footer.hint': 'psst — type',

    'dock.title': 'noir.mp3'
  },

  ru: {
    'boot.tag': 'осн. 2026 · чёрно-белое издание',
    'nav.who': 'кто',
    'nav.work': 'работа',
    'nav.stack': 'стек',
    'nav.talk': 'связь',

    'hero.eyebrow': '// питон-инженер — открыт к проектам',
    'hero.lead': 'Боты, бэкенды и маленькие сломанные автоматизации. Отрисовано в чистом чёрно-белом, выпущено в 2026.',
    'hero.work': 'смотреть работы',
    'hero.talk': 'обсудить',
    'hero.s1': '100% моно',
    'hero.s2': 'без драмы',
    'hero.m1': 'локация: где угодно',
    'hero.m2': 'статус: открыт',

    'who.title': 'кто',
    'who.big': 'Бэкенды с манерами, боты без навязчивости, автоматизация, которая просто работает. Если сработало дважды — я скриптую.',
    'who.f1t': 'ядро',
    'who.f1d': 'api · боты · автоматизация',
    'who.f2t': 'стиль',
    'who.f2d': 'типизировано · с тестами · чисто',
    'who.f3t': 'вайб',
    'who.f3d': 'чёрно-белое, без серого',

    'work.title': 'работа',
    'work.p1': 'эта самая страница — монохромная, собрана вручную, два языка.',
    'work.p2': 'сейчас компилируется. следи за обновлениями.',
    'work.t2': 'скоро',

    'stack.title': 'стек',
    'stack.s1': 'бэкенд',
    'stack.s2': 'боты',
    'stack.s3': 'данные',
    'stack.s4': 'инструменты',

    'talk.title': 'связь',
    'talk.big': 'Есть идея?\nСделаем в <span class="outlined">чёрно-белом.</span>',

    'footer.copy': '© 2026 ehorty — сделано в ч/б, без фильтров',
    'footer.hint': 'тсс, введи',

    'dock.title': 'noir.mp3'
  }
};

const langToggle = document.getElementById('langToggle');
const hintEl = document.querySelector('.foot-hint');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) {
      if (key === 'talk.big') {
        el.innerHTML = i18n[lang][key].replace(/\n/g, '<br>');
      } else if (key === 'footer.hint') {
        el.textContent = i18n[lang][key] + ' ';
        const code = document.createElement('code');
        code.textContent = 'swag';
        el.appendChild(code);
      } else {
        el.textContent = i18n[lang][key];
      }
    }
  });
  langToggle.textContent = lang === 'ru' ? 'EN' : 'RU';
}

let lang = localStorage.getItem('lang') || 'en';
applyLang(lang);

langToggle.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

// ===== Invert theme =====
const root = document.documentElement;
const invertBtn = document.getElementById('invertBtn');

let theme = localStorage.getItem('theme') || 'dark';
root.dataset.theme = theme;

invertBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
});

// ===== Icons =====
if (window.lucide) lucide.createIcons();

// ===== Reveal =====
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

// ===== Burger =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ===== Easter egg: type "swag" =====
const swagToast = document.getElementById('swagToast');
let swagBuffer = '';
let swagTimer = null;

function doSwag() {
  swagToast.classList.add('show');
  clearTimeout(swagTimer);
  swagTimer = setTimeout(() => swagToast.classList.remove('show'), 1400);
}

document.addEventListener('keydown', (e) => {
  if (e.key.length !== 1) return;
  const ev = e.target.tagName;
  if (ev === 'INPUT' || ev === 'TEXTAREA') return;
  swagBuffer = (swagBuffer + e.key.toLowerCase()).slice(-4);
  if (swagBuffer === 'swag') {
    swagBuffer = '';
    doSwag();
  }
});

// ===== Music dock =====
const audio = new Audio('music/track.mp3');
audio.loop = true;
audio.preload = 'auto';

const dock = document.getElementById('dock');
const dockPlay = document.getElementById('dockPlay');
const dockSeek = document.getElementById('dockSeek');
const dockVol = document.getElementById('dockVol');
const dockTime = document.getElementById('dockTime');

const DEFAULT_VOL = 0.05;
let audioCtx = null;
let gainNode = null;
let started = false;

function fmt(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

function initWebAudio() {
  if (audioCtx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) { audio.volume = DEFAULT_VOL; return; }
  try {
    audioCtx = new Ctx();
    const source = audioCtx.createMediaElementSource(audio);
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULT_VOL;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    audio.volume = 1;
  } catch (err) {
    console.warn('Web Audio init failed:', err);
    audioCtx = null;
    gainNode = null;
    audio.volume = DEFAULT_VOL;
  }
}

function setVolume(value) {
  const v = Math.min(1, Math.max(0, Number(value)));
  if (gainNode) gainNode.gain.setTargetAtTime(v, audioCtx.currentTime, 0.01);
  else audio.volume = v;
}

function tryStart() {
  if (started) return;
  started = true;
  dock.classList.remove('hidden');
  initWebAudio();
  if (audioCtx?.state === 'suspended') audioCtx.resume();
  setVolume(dockVol.value || DEFAULT_VOL);
  audio.play().catch(() => {});
  document.removeEventListener('pointerdown', tryStart);
  document.removeEventListener('keydown', tryStart);
}

document.addEventListener('pointerdown', tryStart);
document.addEventListener('keydown', tryStart);

dockPlay.addEventListener('click', () => {
  if (audio.paused) {
    if (audioCtx?.state === 'suspended') audioCtx.resume();
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => dock.classList.add('playing'));
audio.addEventListener('pause', () => dock.classList.remove('playing'));

audio.addEventListener('timeupdate', () => {
  if (!dockSeek.matches(':active')) {
    dockSeek.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  }
  dockTime.textContent = fmt(audio.currentTime);
});

dockSeek.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (dockSeek.value / 100) * audio.duration;
});

dockVol.addEventListener('input', () => setVolume(dockVol.value));
dockVol.addEventListener('change', () => setVolume(dockVol.value));
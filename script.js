// ===== Boot screen =====
const boot = document.getElementById('boot');
document.body.classList.add('loading');

const bootMin = new Promise((r) => setTimeout(r, 1100));
const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((r) => window.addEventListener('load', r, { once: true }));

Promise.all([bootMin, pageLoaded]).then(() => {
  boot.classList.add('done');
  document.body.classList.remove('loading');
});

// ===== Localization =====
const i18n = {
  en: {
    'nav.about': 'about',
    'nav.now': 'now',
    'nav.stack': 'stack',
    'nav.deploy': 'projects',
    'nav.contact': 'contact',

    'hero.kicker': 'python engineer · open to projects',
    'hero.lead': 'Bots, APIs and small automations — written in Python, styled in neon. Clean code, timely delivery, zero drama.',
    'hero.deploy': 'view projects',
    'hero.hire': 'hire me',

    'type.title': '~/ehorty — terminal',

    'about.lede': 'Python engineer who treats code like a craft — readable, tested, and pleasant to work with.',
    'about.f1t': 'core',
    'about.f1d': 'API · bots · automation',
    'about.f2t': 'style',
    'about.f2d': 'clean, typed, tested',
    'about.f3t': 'motto',
    'about.f3d': 'ship it twice alone? script it.',
    'about.f4t': 'now',
    'about.f4d': 'deep-diving asyncio',

    'now.status': 'digging into async python',
    'now.text': 'polishing my personal toolbox and going deeper into asyncio. public repositories are coming soon.',
    'now.label': 'toolbox progress',

    'stack.backend': 'backend',
    'stack.bots': 'bots',
    'stack.data': 'data',
    'stack.tools': 'tools',

    'deploy.site': 'this very page — hand-built, bilingual, with a neon soundtrack.',
    'deploy.more': 'more public repos are compiling in the background — watch this space.',

    'contact.lede': 'Have a project, an idea, or just want to vibe? My inbox is open 24/7.',

    'footer.copy': '© 2026 ehorty · crafted in neon',
    'footer.hint': 'psst — press',

    'dock.title': 'neon_loop.mp3'
  },

  ru: {
    'nav.about': 'обо мне',
    'nav.now': 'щас',
    'nav.stack': 'стек',
    'nav.deploy': 'проекты',
    'nav.contact': 'контакты',

    'hero.kicker': 'питон-инженер · открыт к проектам',
    'hero.lead': 'Боты, API и небольшие автоматизации — на Python, в неоновом стиле. Чистый код, сроки, ноль драмы.',
    'hero.deploy': 'смотреть проекты',
    'hero.hire': 'нанять меня',

    'type.title': '~/ehorty — терминал',

    'about.lede': 'Python-инженер, который относится к коду как к ремеслу — читабельно, с тестами и удовольствием.',
    'about.f1t': 'ядро',
    'about.f1d': 'API · боты · автоматизация',
    'about.f2t': 'стиль',
    'about.f2d': 'чисто, типизировано, с тестами',
    'about.f3t': 'девиз',
    'about.f3d': 'запускал дважды? скриптуй.',
    'about.f4t': 'щас',
    'about.f4d': 'копаю глубже в asyncio',

    'now.status': 'копаюсь в async python',
    'now.text': 'довожу до ума личный тулбокс и углубляюсь в asyncio. публичные репозитории скоро появятся.',
    'now.label': 'прогресс тулбокса',

    'stack.backend': 'бэкенд',
    'stack.bots': 'боты',
    'stack.data': 'данные',
    'stack.tools': 'инструменты',

    'deploy.site': 'эта самая страница — собрана вручную, на двух языках, с неоновым саундтреком.',
    'deploy.more': 'ещё публичные репозитории компилируются в фоне — следи за обновлениями.',

    'contact.lede': 'Есть проект, идея или просто хочется поболтать? Инбокс открыт 24/7.',

    'footer.copy': '© 2026 ehorty · сделано в неоне',
    'footer.hint': 'тсс, нажми',

    'dock.title': 'neon_loop.mp3'
  }
};

const langToggle = document.getElementById('langToggle');
const bareHints = document.querySelectorAll('[data-i18n="footer.hint"]');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  langToggle.textContent = lang === 'ru' ? 'EN' : 'RU';
  bareHints.forEach((h) => {
    const code = document.createElement('code');
    code.textContent = 'alt + w';
    h.appendChild(code);
  });
}

let lang = localStorage.getItem('lang') || 'en';
applyLang(lang);

langToggle.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

let theme = localStorage.getItem('theme') || 'dark';
root.dataset.theme = theme;

themeToggle.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
});

// ===== Lucide icons =====
if (window.lucide) lucide.createIcons();

// ===== Terminal typewriter =====
const typeOut = document.getElementById('typeOut');

const script = [
  [['c-mut', '> '], ['c-gold', 'python'], ['c-mut', ' run.py']],
  [['c-cyan', 'boot'], ['c-mut', ': importing '], ['c-gold', 'ehorty'], ['c-mut', ' ... '], ['c-cyan', 'ok']],
  [['c-cyan', 'api'], ['c-mut', '  : loading backends ... '], ['c-cyan', 'ok']],
  [['c-cyan', 'bots'], ['c-mut', ' : loading handlers ... '], ['c-cyan', 'ok']],
  [['c-cyan', 'style'], ['c-mut', ': why so clean? '], ['c-cyan', 'tested']],
  [['c-gold', 'status'], ['c-mut', ' : '], ['c-cyan', 'ONLINE']]
];

function typeLine(parts, lineIndex, done) {
  if (lineIndex >= script.length) { done(); return; }
  const line = document.createElement('div');
  typeOut.appendChild(line);
  let partIndex = 0;
  let charIndex = 0;

  function step() {
    if (partIndex >= parts.length) {
      if (lineIndex < script.length - 1) {
        setTimeout(() => typeLine(script[lineIndex + 1], lineIndex + 1, done), 260);
      } else {
        cursor(); done();
      }
      return;
    }
    const [cls, text] = parts[partIndex];
    if (charIndex < text.length) {
      const span = line.querySelector('.seg:last-child');
      let seg = span && span.dataset.cls === cls ? span : null;
      if (!seg) {
        seg = document.createElement('span');
        seg.className = 'seg';
        seg.dataset.cls = cls;
        seg.classList.add(cls);
        line.appendChild(seg);
      }
      seg.textContent += text[charIndex++];
      setTimeout(step, 26);
    } else {
      partIndex++; charIndex = 0;
      setTimeout(step, 6);
    }
  }
  step();
}

let cursorEl = null;
function cursor() {
  const line = document.createElement('div');
  typeOut.appendChild(line);
  const span = document.createElement('span');
  span.classList.add('tcursor');
  line.appendChild(span);
  cursorEl = span;
}

const typeStarted = sessionStorage.getItem('typed') === '1';
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    io.unobserve(e.target);
    if (!typeStarted && !typeOut.hasChildNodes()) {
      typeLine(script[0], 0, () => { sessionStorage.setItem('typed', '1'); });
    }
  }
}, { threshold: 0.3 });
io.observe(document.querySelector('.type-card'));

// ===== Reveal on scroll =====
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

// ===== Easter egg: alt + w =====
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'w' && (e.altKey || e.metaKey)) {
    e.preventDefault();
    document.body.classList.add('neon-flash');
    setTimeout(() => document.body.classList.remove('neon-flash'), 1400);
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
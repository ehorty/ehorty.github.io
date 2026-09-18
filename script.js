// ===== Preloader (min 1 second) =====
const preloader = document.getElementById('preloader');
const gate = document.getElementById('gate');
document.body.classList.add('loading');

const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

Promise.all([minDelay, pageLoaded]).then(() => {
  preloader.classList.add('done');
  document.body.classList.remove('loading');
  gate.classList.add('ready');
});

// ===== Localization (ru / en) =====
const i18n = {
  en: {
    'hero.kicker': 'python developer',
    'hero.lead': 'i write python: backends, bots, automation and tools that make life easier — clean code, boring-in-a-good-way infrastructure, and things that just work·py.',
    'hero.projects': 'projects →',
    'hero.contact': 'contact →',

    'nav.about': 'about',
    'about.p1': "hey. no idea how you ended up here, but hi. i'm a python developer who likes building things — backends, telegram bots, cli tools, random experiments, whatever. i like clean code, good structure, and code that doesn't catch fire at 3am.",
    'about.p2': 'when i’m not writing python, i’m probably automating something that should have been automated years ago.',

    'about.f1t': 'main thing',
    'about.f1d': 'backend, bots & automation in python',
    'about.f2t': 'rn',
    'about.f2d': 'building pyq — currently cooking',
    'about.f3t': 'open to',
    'about.f3d': 'cool collabs, weird ideas & side quests',

    'nav.now': 'now',
    'now.text': 'a small async tool that makes long-running python tasks way less annoying.',

    'nav.projects': 'projects',
    'projects.site': 'this very site — hand-built bio page with a music player, EN/RU and light/dark themes.',

    'nav.stack': 'stack',
    'stack.backend': 'backend',
    'stack.bots': 'bots',
    'stack.database': 'database',
    'stack.tools': 'tools',
    'stack.other': 'other',
    'stack.fun': 'side quests',
    'stack.fun_desc': 'automation scripts & weekend experiments',

    'nav.contact': 'contact',
    'contact.lead': 'got an idea? wanna collab? or just wanna talk about python? hit me up.',

    'footer.text': '© 2026 ehorty · built by hand · 0 frameworks were harmed',

    'gate.title': 'press anywhere to continue',
    'gate.note': 'this site has music. use the player in the bottom-left corner to lower the volume.'
  },

  ru: {
    'hero.kicker': 'питон-разработчик',
    'hero.lead': 'пишу на python: бэкенды, ботов, автоматизацию и инструменты, которые облегчают жизнь — чистый код, инфраструктура, которая стабильно работает, и штуки, которые просто работают·py.',
    'hero.projects': 'проекты →',
    'hero.contact': 'контакты →',

    'nav.about': 'инфа',
    'about.p1': 'хей. хз, как ты сюда попал, но привет. я питон-разработчик, люблю что-нибудь собирать — бэкенды, телеграм-ботов, cli-шки, рандомные эксперименты, короче всё подряд. люблю чистый код, нормальную структуру и код, который не полыхает в 3 часа ночи.',
    'about.p2': 'когда не пишу на python, скорее всего автоматизирую то, что надо было автоматизировать ещё пару лет назад.',

    'about.f1t': 'основное',
    'about.f1d': 'бэкенд, боты и автоматизация на python',
    'about.f2t': 'щас',
    'about.f2d': 'пилю pyq — кухня кипит',
    'about.f3t': 'открыт к',
    'about.f3d': 'крутым коллабам, странным идеям и сайд-квестам',

    'nav.now': 'щас',
    'now.text': 'маленький асинхронный инструмент, из-за которого долгие python-задачи достают гораздо меньше.',

    'nav.projects': 'проекты',
    'projects.site': 'этот самый сайт — био-страница, собранная руками: музыкальный плеер, EN/RU и светлая/тёмная темы.',

    'nav.stack': 'стек',
    'stack.backend': 'бэкенд',
    'stack.bots': 'боты',
    'stack.database': 'базы данных',
    'stack.tools': 'инструменты',
    'stack.other': 'прочее',
    'stack.fun': 'сайд-квесты',
    'stack.fun_desc': 'автоматизация и эксперименты на выходных',

    'nav.contact': 'контакты',
    'contact.lead': 'есть идея? хочешь коллаб? или просто хочешь поболтать про python? пиши.',

    'footer.text': '© 2026 ehorty · сделано руками · 0 фреймворков пострадало',

    'gate.title': 'нажмите по экрану чтобы продолжить',
    'gate.note': 'на сайте имеется музыка. слева снизу будет плеер, где вы можете понизить громкость.'
  }
};

const langToggle = document.getElementById('langToggle');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  langToggle.textContent = lang === 'ru' ? 'en' : 'ru';
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
const toggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');

if (stored === 'light' || (stored === null && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  root.dataset.theme = 'light';
}

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  if (next === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'light';
  localStorage.setItem('theme', next);
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== Lucide icons =====
if (window.lucide) lucide.createIcons();

// ===== Burger menu =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

// close the mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ===== Live status from status.js =====
if (window.MY_STATUS && window.MY_STATUS.status) {
  const statusEl = document.getElementById('myStatus');
  if (statusEl) statusEl.textContent = window.MY_STATUS.status;

  const nowProj = document.getElementById('nowProj');
  if (window.MY_STATUS.project && nowProj) nowProj.textContent = window.MY_STATUS.project;

  if (window.MY_STATUS.now && window.MY_STATUS.now.en && window.MY_STATUS.now.ru) {
    const setNow = () => {
      const key = document.documentElement.lang;
      const el = document.querySelector('.now [data-i18n="now.text"]');
      if (el) el.textContent = window.MY_STATUS.now[key] || window.MY_STATUS.now.en;
      document.title = key === 'ru' ? 'ehorty · ' + (window.MY_STATUS.title.ru || 'python developer') : 'ehorty · ' + (window.MY_STATUS.title.en || 'python developer');
    };
    setNow();
    langToggle.addEventListener('click', () => setTimeout(setNow, 0));
  }
}

// ===== Pep-8 Mode (type "python") =====
const PYP_WORD = 'python';
let pypBuffer = '';

function toggleGreen() {
  document.body.classList.toggle('green');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('green')) {
    document.body.classList.remove('green');
    return;
  }
  if (e.key.length !== 1) return;
  pypBuffer = (pypBuffer + e.key.toLowerCase()).slice(-PYP_WORD.length);
  if (pypBuffer === PYP_WORD) {
    pypBuffer = '';
    toggleGreen();
  }
});

// ===== Music player =====
const audio = new Audio('music/track.mp3');
audio.loop = true;
audio.preload = 'auto';

const player = document.getElementById('player');
const plToggle = document.getElementById('plToggle');
const plSeek = document.getElementById('plSeek');
const plVol = document.getElementById('plVol');
const plTime = document.getElementById('plTime');

const DEFAULT_VOL = 0.05;

let audioCtx = null;
let gainNode = null;
let musicStarted = false;

function fmt(s) {
  if (!isFinite(s)) return '0:00';

  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);

  return m + ':' + String(sec).padStart(2, '0');
}

function initWebAudio() {
  if (audioCtx) return;

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) {
    audio.volume = DEFAULT_VOL;
    return;
  }

  try {
    audioCtx = new Ctx();

    const source = audioCtx.createMediaElementSource(audio);

    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULT_VOL;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // iOS ignores this value when Web Audio is used.
    audio.volume = 1;
  } catch (e) {
    console.warn('Web Audio initialization failed:', e);

    audioCtx = null;
    gainNode = null;
    audio.volume = DEFAULT_VOL;
  }
}

function setVolume(value) {
  const volume = Math.min(
    1,
    Math.max(0, Number(value))
  );

  if (gainNode) {
    gainNode.gain.setTargetAtTime(
      volume,
      audioCtx.currentTime,
      0.01
    );
  } else {
    audio.volume = volume;
  }
}

gate.addEventListener('click', async () => {
  gate.classList.add('gone');
  player.classList.remove('hidden');

  if (!musicStarted) {
    musicStarted = true;

    initWebAudio();

    if (audioCtx?.state === 'suspended') {
      await audioCtx.resume();
    }

    setVolume(plVol.value || DEFAULT_VOL);

    try {
      await audio.play();
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }
});

plToggle.addEventListener('click', async () => {
  if (audio.paused) {
    if (audioCtx?.state === 'suspended') {
      await audioCtx.resume();
    }

    await audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  player.classList.add('playing');
});

audio.addEventListener('pause', () => {
  player.classList.remove('playing');
});

audio.addEventListener('timeupdate', () => {
  if (!plSeek.matches(':active')) {
    plSeek.value = audio.duration
      ? (audio.currentTime / audio.duration) * 100
      : 0;
  }

  plTime.textContent = fmt(audio.currentTime);
});

plSeek.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime =
      (plSeek.value / 100) * audio.duration;
  }
});

plVol.addEventListener('input', () => {
  setVolume(plVol.value);
});

plVol.addEventListener('change', () => {
  setVolume(plVol.value);
});
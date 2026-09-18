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
    'hero.kicker': 'python engineer · open to projects',
    'hero.lead': "Python engineer who builds backends, bots and little automations. My code reads well, runs on time and brushes its teeth before bed.",
    'hero.projects': 'see projects',
    'hero.contact': 'contact',

    'nav.about': 'about',
    'about.p1': "I'm Ehorty, a Python engineer. By day (and sometimes by night) I build backends, Telegram bots and tiny automations that quietly handle the boring parts of life. I like code that's easy to read tomorrow and behaves politely.",
    'about.p2': "when I'm away from the keyboard, I'm usually cooking a personal project, listening to music, or chasing a good idea before it runs off.",

    'about.f1t': 'focus',
    'about.f1d': 'backends · bots · automation',
    'about.f2t': 'status',
    'about.f2d': 'open to projects & ideas',
    'about.f3t': 'motto',
    'about.f3d': 'if it runs twice, script it',

    'nav.now': 'now',
    'now.text': 'polishing my own toolbox and going deeper into async python. public projects are on the way.',
    'progress.label': 'cooking something',

    'nav.projects': 'projects',
    'projects.site': "the page you're reading right now. handcrafted, playful, with a music player and two languages.",
    'projects.more': 'more public projects are cooking in the oven — stay tuned.',

    'nav.stack': 'stack',
    'stack.backend': 'backend',
    'stack.bots': 'bots',
    'stack.database': 'database',
    'stack.tools': 'tools',
    'stack.other': 'other',

    'nav.contact': 'contact',
    'contact.lead': 'have a project, an idea, or just want to say hi? my inbox is always open.',

    'footer.text': '© 2026 ehorty · made with 🐍 and patience',

    'player.title': 'Music?',

    'gate.title': 'tap to enter',
    'gate.note': "there's music playing here — turn it down in the player at the bottom left."
  },

  ru: {
    'hero.kicker': 'питон-инженер · открыт к проектам',
    'hero.lead': 'Python-инженер: бэкенды, боты и маленькие автоматизации. Мой код понятен, всё делает вовремя и чистит зубы перед сном.',
    'hero.projects': 'проекты',
    'hero.contact': 'контакты',

    'nav.about': 'обо мне',
    'about.p1': 'Я Ehorty — python-инженер. Днём (а иногда и ночью) собираю бэкенды, телеграм-ботов и маленькие автоматизации, которые тихо берут на себя скучную часть жизни. Нравится код, который легко читается завтра и ведёт себя прилично.',
    'about.p2': 'когда отхожу от клавиатуры — довожу до ума личный проект, слушаю музыку или бегу за хорошей идеей, пока она не сбежала.',

    'about.f1t': 'фокус',
    'about.f1d': 'бэкенды · боты · автоматизация',
    'about.f2t': 'статус',
    'about.f2d': 'открыт к проектам и идеям',
    'about.f3t': 'девиз',
    'about.f3d': 'что запускается дважды — скриптуется',

    'nav.now': 'щас',
    'now.text': 'довожу до ума свою обвязку и копаю глубже в async-python. публичные проекты скоро появятся.',
    'progress.label': 'что-то готовлю',

    'nav.projects': 'проекты',
    'projects.site': 'страница, которую ты сейчас читаешь. собрана вручную: весёлая, с музыкой и двумя языками.',
    'projects.more': 'в печи ещё проекты — следи за обновлениями.',

    'nav.stack': 'стек',
    'stack.backend': 'бэкенд',
    'stack.bots': 'боты',
    'stack.database': 'базы данных',
    'stack.tools': 'инструменты',
    'stack.other': 'прочее',

    'nav.contact': 'контакты',
    'contact.lead': 'есть проект, идея или просто хочется поздороваться? я всегда на связи.',

    'footer.text': '© 2026 ehorty · сделано с 🐍 и терпением',

    'player.title': 'Музыка?',

    'gate.title': 'нажми, чтобы войти',
    'gate.note': 'тут играет музыка — громкость можно убрать в плеере слева снизу.'
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

// ===== Theme toggle (dark synthwave is default) =====
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

let theme = localStorage.getItem('theme') || 'dark';
root.dataset.theme = theme;

toggle.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
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

navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ===== Live status from status.js =====
if (window.MY_STATUS) {
  const statusEl = document.getElementById('myStatus');
  if (statusEl && window.MY_STATUS.status) statusEl.textContent = window.MY_STATUS.status;

  if (window.MY_STATUS.title) {
    const setTitle = () => {
      const key = document.documentElement.lang;
      document.title = (window.MY_STATUS.title[key] || window.MY_STATUS.title.en) + ' — ehorty';
    };
    setTitle();
    langToggle.addEventListener('click', () => setTimeout(setTitle, 0));
  }
}

// ===== Party mode (type "python") =====
const PYP_WORD = 'python';
let pypBuffer = '';

function toggleParty() {
  document.body.classList.toggle('party');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('party')) {
    document.body.classList.remove('party');
    return;
  }
  if (e.key.length !== 1) return;
  pypBuffer = (pypBuffer + e.key.toLowerCase()).slice(-PYP_WORD.length);
  if (pypBuffer === PYP_WORD) {
    pypBuffer = '';
    toggleParty();
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

    audio.volume = 1;
  } catch (e) {
    console.warn('Web Audio initialization failed:', e);

    audioCtx = null;
    gainNode = null;
    audio.volume = DEFAULT_VOL;
  }
}

function setVolume(value) {
  const volume = Math.min(1, Math.max(0, Number(value)));

  if (gainNode) {
    gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.01);
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
    audio.currentTime = (plSeek.value / 100) * audio.duration;
  }
});

plVol.addEventListener('input', () => {
  setVolume(plVol.value);
});

plVol.addEventListener('change', () => {
  setVolume(plVol.value);
});
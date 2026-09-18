// ===== Boot =====
const boot = document.getElementById('boot');

const bootMin = new Promise((r) => setTimeout(r, 1300));
const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((r) => window.addEventListener('load', r, { once: true }));

Promise.all([bootMin, pageLoaded]).then(() => {
  boot.classList.add('ready');
  setTimeout(() => boot.classList.add('done'), 650);
});

// ===== Localization =====
const i18n = {
  en: {
    'nav.profile': 'profile',
    'nav.stages': 'stages',
    'nav.powers': 'powers',
    'nav.coins': 'coins',

    'hero.lead': 'backends, bots and tiny automations. drop a coin, get a level-up.',
    'hero.start': 'start game',
    'hero.coin': 'insert coin',

    'profile.title': 'PLAYER PROFILE',
    'profile.tag': 'class python.Craftsman',
    'profile.s1n': 'SPD',
    'profile.s1d': 'fast delivery, no crunch',
    'profile.s2n': 'ATK',
    'profile.s2d': 'backends & bots',
    'profile.s3n': 'LUK',
    'profile.s3d': 'debugs after midnight',

    'stages.title': 'SELECT YOUR STAGE',
    'stages.st1': 'a playable adventure in html/css/js. two languages, one soundtrack. you are inside it.',
    'stages.st2': 'currently compiling. warp gate opening soon.',
    'stages.lock': 'locked — see high scores',

    'powers.title': 'POWER-UPS',
    'powers.w': 'WEAPONS',
    'powers.d': 'REMOTE',
    'powers.s': 'SHIELD',
    'powers.b': 'BOOST',

    'coins.title': 'HIGH SCORES',
    'coins.lead': 'want a co-op run or a score to beat? ring the arcade owner.',

    'footer.line': 'GAME OVER — not yet. press',

    'dock.title': 'jukebox — neon_loop.mp3'
  },

  ru: {
    'nav.profile': 'профиль',
    'nav.stages': 'уровни',
    'nav.powers': 'сила',
    'nav.coins': 'монеты',

    'hero.lead': 'бэкенды, боты и маленькие автоматизации. брось монету — получишь уровень.',
    'hero.start': 'начать игру',
    'hero.coin': 'вставить монету',

    'profile.title': 'ПРОФИЛЬ ИГРОКА',
    'profile.tag': 'класс python.Craftsman',
    'profile.s1n': 'СКР',
    'profile.s1d': 'быстрая сдача, без овертайма',
    'profile.s2n': 'АТК',
    'profile.s2d': 'бэкенды и боты',
    'profile.s3n': 'УДАЧ',
    'profile.s3d': 'отлаживает после полуночи',

    'stages.title': 'ВЫБЕРИ УРОВЕНЬ',
    'stages.st1': 'приключение на html/css/js. два языка, один саундтрек. ты прямо внутри.',
    'stages.st2': 'пока компилируется. варп-врата скоро откроются.',
    'stages.lock': 'заблокировано — смотри рекорды',

    'powers.title': 'УСИЛЕНИЯ',
    'powers.w': 'ОРУЖИЕ',
    'powers.d': 'ПУЛЬТЫ',
    'powers.s': 'ЩИТ',
    'powers.b': 'БУСТ',

    'coins.title': 'РЕКОРДЫ',
    'coins.lead': 'хочешь кооп-игру или рекорд побить? позвони владельцу аркады.',

    'footer.line': 'GAME OVER — не сегодня. нажми',

    'dock.title': 'джубокс — neon_loop.mp3'
  }
};

const langToggle = document.getElementById('langToggle');
const footerLine = document.querySelector('[data-i18n="footer.line"]');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  langToggle.textContent = lang === 'ru' ? 'EN' : 'RU';
  if (footerLine) {
    const code = document.createElement('code');
    code.textContent = 'C';
    footerLine.appendChild(code);
  }
}

let lang = localStorage.getItem('lang') || 'en';
applyLang(lang);

langToggle.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

// ===== Theme =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

let theme = localStorage.getItem('theme') || 'dark';
root.dataset.theme = theme;

themeToggle.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
});

// ===== Icons =====
if (window.lucide) lucide.createIcons();

// ===== CRT screen drift (typing echo) =====
const crtOut = document.getElementById('crtOut');
const crtLines = [
  [['c-dim', 'PRESS COIN · PLAY ▲']],
  [['c-hi', 'PLAYER 1  '], ['c-dim', '  CREDIT 00']],
  [['c-dim', 'loading python.library ... '], ['c-ok', 'OK']],
  [['c-dim', 'loading coin.slot ......... '], ['c-ok', 'OK']],
  [['c-dim', 'loading neon.shell ........ '], ['c-ok', 'OK']],
  [['c-hi', '>>> READY PLAYER ONE']]
];

function writeCrt(idx) {
  if (idx >= crtLines.length) {
    crtOut.scrollTop = crtOut.scrollHeight;
    return;
  }
  const row = document.createElement('span');
  row.style.display = 'block';
  row.style.whiteSpace = 'nowrap';
  crtOut.appendChild(row);

  let p = 0;
  let ch = 0;
  function step() {
    if (p >= crtLines[idx].length) {
      setTimeout(() => writeCrt(idx + 1), idx === 0 ? 900 : 260);
      return;
    }
    const [cls, text] = crtLines[idx][p];
    if (ch < text.length) {
      const span = document.createElement('span');
      span.className = cls;
      span.textContent = text[ch++];
      row.appendChild(span);
      crtOut.scrollTop = crtOut.scrollHeight;
      setTimeout(step, 14);
    } else {
      p++;
      ch = 0;
      setTimeout(step, 8);
    }
  }
  step();
}

const crtBox = document.getElementById('crt');
const crtIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    crtIO.unobserve(e.target);
    if (!crtOut.dataset.typed) {
      crtOut.dataset.typed = '1';
      crtOut.innerHTML = '';
      writeCrt(0);
    }
  }
}, { threshold: 0.3 });
crtIO.observe(crtBox);

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

// ===== Coin drop easter egg (press C) =====
const coinToast = document.getElementById('coinToast');
let toastTimer = null;

function dropCoin() {
  coinToast.textContent = 'COIN INSERTED · GOOD LUCK';
  coinToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => coinToast.classList.remove('show'), 1600);
}

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const ev = e.target.tagName;
    if (ev === 'INPUT' || ev === 'TEXTAREA') return;
    dropCoin();
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
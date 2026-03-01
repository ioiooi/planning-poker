'use strict';

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55];

// ── State ──────────────────────────────────────────────────────
const state = {
  selected: null,   // index into FIBONACCI, or null
  view: 'grid',     // 'grid' | 'single'
  flipped: false,   // whether the single card is face-up
};

// ── DOM refs ───────────────────────────────────────────────────
const gridView    = document.getElementById('gridView');
const singleView  = document.getElementById('singleView');
const cardGrid    = document.getElementById('cardGrid');
const actionBtn   = document.getElementById('actionBtn');
const flipCard    = document.getElementById('flipCard');
const flipInner   = document.getElementById('flipInner');
const bigNum      = document.getElementById('bigNum');
const pipTL       = document.getElementById('pipTL');
const pipBR       = document.getElementById('pipBR');
const singleHint  = document.getElementById('singleHint');
const themeBtn    = document.getElementById('themeBtn');

// ── Fade-in helper ─────────────────────────────────────────────
function applyFadeIn(el) {
  el.classList.remove('view--fade-in');
  // Force reflow so re-adding the class restarts the animation
  void el.offsetWidth;
  el.classList.add('view--fade-in');
}

// ── Build grid ─────────────────────────────────────────────────
function buildGrid() {
  cardGrid.innerHTML = '';
  FIBONACCI.forEach((value, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'option');
    card.setAttribute('aria-label', `Estimate ${value}`);
    card.setAttribute('tabindex', '0');
    card.dataset.index = index;

    card.innerHTML = `
      <span class="card__pip card__pip--tl" aria-hidden="true">${value}</span>
      <span class="card__value" aria-hidden="true">${value}</span>
      <span class="card__pip card__pip--br" aria-hidden="true">${value}</span>
    `;

    card.addEventListener('click', () => selectCard(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard(index);
      }
    });

    cardGrid.appendChild(card);
  });
}

// ── Select a card ──────────────────────────────────────────────
function selectCard(index) {
  // Deselect if same card tapped again
  state.selected = state.selected === index ? null : index;
  navigator.vibrate?.(25);
  renderGrid();
}

function renderGrid() {
  const cards = cardGrid.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.classList.toggle('card--selected', i === state.selected);
    card.setAttribute('aria-selected', i === state.selected ? 'true' : 'false');
  });
  actionBtn.disabled = state.selected === null;
  actionBtn.textContent = state.selected === null ? 'Select a card' : 'Reveal';
}

// ── Switch views ───────────────────────────────────────────────
function showSingleView() {
  if (state.selected === null) return;
  state.view = 'single';
  state.flipped = false;
  flipInner.classList.remove('flip-card__inner--flipped');
  flipCard.setAttribute('aria-pressed', 'false');
  const value = FIBONACCI[state.selected];
  bigNum.textContent = value;
  pipTL.textContent  = value;
  pipBR.textContent  = value;
  singleHint.textContent = 'Tap the card to reveal';

  gridView.classList.add('view--hidden');
  singleView.classList.remove('view--hidden');
  applyFadeIn(singleView);

  actionBtn.disabled = false;
  actionBtn.textContent = 'Back to cards';
}

function showGridView() {
  state.view = 'grid';
  state.flipped = false;
  flipInner.classList.remove('flip-card__inner--flipped');

  singleView.classList.add('view--hidden');
  gridView.classList.remove('view--hidden');
  applyFadeIn(gridView);

  actionBtn.textContent = state.selected === null ? 'Select a card' : 'Reveal';
  actionBtn.disabled = state.selected === null;
}

// ── Flip ───────────────────────────────────────────────────────
function toggleFlip() {
  state.flipped = !state.flipped;
  navigator.vibrate?.(25);
  flipInner.classList.toggle('flip-card__inner--flipped', state.flipped);
  flipCard.setAttribute('aria-pressed', state.flipped ? 'true' : 'false');
  singleHint.textContent = state.flipped ? 'Tap to hide' : 'Tap the card to reveal';
}

// ── Theme ──────────────────────────────────────────────────────
function initTheme() {
  const stored = localStorage.getItem('pp-theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(stored || system);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pp-theme', theme);
  themeBtn.setAttribute('aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Event listeners ────────────────────────────────────────────
actionBtn.addEventListener('click', () => {
  if (state.view === 'grid') {
    if (state.selected !== null) showSingleView();
  } else {
    showGridView();
  }
});

flipCard.addEventListener('click', toggleFlip);
flipCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleFlip();
  }
});

themeBtn.addEventListener('click', toggleTheme);

// ── Init ───────────────────────────────────────────────────────
initTheme();
buildGrid();

// ── Service Worker ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW registration failed:', e));
  });
}

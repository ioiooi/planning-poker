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

// ── Build grid ─────────────────────────────────────────────────
function buildGrid() {
  cardGrid.innerHTML = '';
  FIBONACCI.forEach((value, index) => {
    const card = document.createElement('div');
    card.className = 'grid-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Estimate ${value}`);
    card.setAttribute('tabindex', '0');
    card.dataset.index = index;

    card.innerHTML = `
      <span class="grid-card-pip tl" aria-hidden="true">${value}</span>
      <span class="grid-card-num" aria-hidden="true">${value}</span>
      <span class="grid-card-pip br" aria-hidden="true">${value}</span>
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
  renderGrid();
}

function renderGrid() {
  const cards = cardGrid.querySelectorAll('.grid-card');
  cards.forEach((card, i) => {
    card.classList.toggle('selected', i === state.selected);
    card.setAttribute('aria-selected', i === state.selected ? 'true' : 'false');
  });
  actionBtn.disabled = state.selected === null;
}

// ── Switch views ───────────────────────────────────────────────
function showSingleView() {
  state.view = 'single';
  state.flipped = false;
  flipInner.classList.remove('flipped');
  flipCard.setAttribute('aria-pressed', 'false');

  const value = FIBONACCI[state.selected];
  bigNum.textContent = value;
  pipTL.textContent  = value;
  pipBR.textContent  = value;
  singleHint.textContent = 'Tap the card to reveal';

  gridView.classList.add('hidden');
  singleView.classList.remove('hidden');

  actionBtn.disabled = false;
  actionBtn.textContent = 'Pick again';
}

function showGridView() {
  state.view = 'grid';
  state.flipped = false;
  flipInner.classList.remove('flipped');

  singleView.classList.add('hidden');
  gridView.classList.remove('hidden');

  actionBtn.textContent = 'Reveal';
  actionBtn.disabled = state.selected === null;
}

// ── Flip ───────────────────────────────────────────────────────
function toggleFlip() {
  state.flipped = !state.flipped;
  flipInner.classList.toggle('flipped', state.flipped);
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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {/* offline not critical */});
  });
}

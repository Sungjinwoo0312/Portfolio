/* =====================================================
   HERO — INTERACTION CONTROLLER
   (Scroll + Click, No Conflicts)
===================================================== */

/*
  STATES:
  -----------------------------------------------------
  idle        → page load / top
  settled     → after scroll
  principle   → letter clicked
*/


/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const hero = document.querySelector('.hero');
const heroWord = document.querySelector('.hero-word');
const letters = document.querySelectorAll('.hero-word span');
const heroMeta = document.querySelector('.hero-meta');
const principleSlot = document.querySelector('.hero-depth-slot');
const gridFlash = document.querySelector('.grid-flash');


/* =====================================================
   INTERNAL STATE
===================================================== */

let state = 'idle';        // idle | settled | principle
let activeLetter = null;
let resetTimer = null;


/* =====================================================
   PRINCIPLE DATA
===================================================== */

const principles = {
  D: {
    suffix: 'epth',
    text: 'Depth gives design hierarchy, spatial clarity, and meaning beyond surface aesthetics.'
  },
  E: {
    suffix: 'mphasis',
    text: 'Emphasis directs attention and focus through contrast, scale, and restraint.'
  },
  S: {
    suffix: 'tructure',
    text: 'Structure organizes complexity, creating balance and legibility in visual systems.'
  },
  I: {
    suffix: 'ntent',
    text: 'Intent defines purpose, guiding every visual decision with direction.'
  },
  G: {
    suffix: 'rid',
    text: 'Grids establish rhythm and alignment, enabling freedom within order.'
  },
  N: {
    suffix: 'arrative',
    text: 'Narrative connects elements into meaning, allowing design to communicate over time.'
  }
};


/* =====================================================
   GRID FLASH
===================================================== */

function triggerGrid() {
  gridFlash.classList.remove('show');
  void gridFlash.offsetWidth;
  gridFlash.classList.add('show');

  setTimeout(() => {
    gridFlash.classList.remove('show');
  }, 1000);
}


/* =====================================================
   SCROLL HANDLER
===================================================== */

window.addEventListener('scroll', () => {
  if (state === 'principle') return;

  const threshold = window.innerHeight * 0.25;

  if (window.scrollY > threshold && state !== 'settled') {
    enterSettledState();
  }

  if (window.scrollY <= threshold && state === 'settled') {
    enterIdleState();
  }
});


/* =====================================================
   STATE TRANSITIONS
===================================================== */

function enterIdleState() {
  state = 'idle';

  hero.classList.remove('hero-settled', 'principle-active');
  heroMeta.classList.remove('visible');

  clearPrinciple();
}

function enterSettledState() {
  state = 'settled';

  hero.classList.add('hero-settled');
  hero.classList.remove('principle-active');

  heroMeta.classList.add('visible');

  clearPrinciple();
  triggerGrid();
}

function enterPrincipleState(letter) {
  state = 'principle';
  activeLetter = letter;

  hero.classList.add('principle-active');
  hero.classList.remove('hero-settled');

  heroMeta.classList.remove('visible');

  letters.forEach(l => {
    l.classList.remove('rise', 'active');
  });
  letter.classList.add('active');

  injectPrinciple(letter.dataset.letter);
  triggerGrid();

  clearTimeout(resetTimer);
  resetTimer = setTimeout(exitPrincipleState, 7000);
}

function exitPrincipleState() {
  clearTimeout(resetTimer);

  state = 'idle';
  activeLetter = null;

  hero.classList.remove('principle-active');
  clearPrinciple();

  // Decide next state based on scroll
  const threshold = window.innerHeight * 0.25;
  if (window.scrollY > threshold) {
    enterSettledState();
  } else {
    enterIdleState();
  }
}


/* =====================================================
   PRINCIPLE CONTENT
===================================================== */

function injectPrinciple(key) {
  const data = principles[key];
  if (!data) return;

  principleSlot.innerHTML = `
    <div class="principle">
      <div class="principle-title">
        ${key}<small>${data.suffix}</small>
      </div>
      <p class="principle-text">${data.text}</p>
    </div>
  `;
}

function clearPrinciple() {
  principleSlot.innerHTML = '';
}


/* =====================================================
   LETTER INTERACTIONS
===================================================== */

letters.forEach(letter => {

  // Hover (only in idle)
  letter.addEventListener('mouseenter', () => {
    if (state !== 'idle') return;
    letter.classList.add('rise');
  });

  letter.addEventListener('mouseleave', () => {
    letter.classList.remove('rise');
  });

  // Click
  letter.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state === 'principle') return;
    enterPrincipleState(letter);
  });
});


/* =====================================================
   CLICK OUTSIDE — EXIT PRINCIPLE
===================================================== */

document.addEventListener('click', (e) => {
  if (state !== 'principle') return;

  if (
    !e.target.closest('.hero-word') &&
    !e.target.closest('.hero-depth-slot')
  ) {
    exitPrincipleState();
  }
});


/* =====================================================
   ESC KEY — EXIT PRINCIPLE
===================================================== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state === 'principle') {
    exitPrincipleState();
  }
});

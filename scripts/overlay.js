/* =====================================================
   ARCHIVE OVERLAY — SNAP SCROLL CONTROLLER (STABLE)
===================================================== */

/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const overlay = document.querySelector('.overlay');
const overlayBackdrop = overlay?.querySelector('.overlay-backdrop');
const overlayClose = overlay?.querySelector('.overlay-close');
const overlayContent = overlay?.querySelector('.overlay-content');
const archiveTrack = overlay?.querySelector('.archive-track');

if (!overlay || !overlayContent || !archiveTrack) {
  console.error('[overlay.js] Required overlay elements missing');
}


/* =====================================================
   ARCHIVE DATA (ALL 13 — UNCHANGED)
===================================================== */

const archiveProjects = [
  {
    img: 'assets/images/projects/selected/interstellar-hero.jpg',
    title: 'Interstellar — Survival Beyond Earth',
    text: 'Concept poster reinterpreting human survival through scale, isolation, and cosmic perspective.'
  },
  {
    img: 'assets/images/projects/selected/thumbnail-system-hero.jpg',
    title: 'High-Impact Thumbnail System',
    text: 'Thumbnail system designed to maximize clarity and hierarchy under extreme visual constraints.'
  },
  {
    img: 'assets/images/projects/archive/void-formless-archive.png',
    title: 'VOID — Formless Fashion System',
    text: 'Fashion poster system exploring identity, form, and modern streetwear culture through typographic dominance and editorial hierarchy.'
  },
  {
    img: 'assets/images/projects/archive/nexomedia-1.png',
    title: 'Nexomedia — Promotional Layout',
    text: 'Promotional layout exploring modular hierarchy and brand clarity.'
  },
  {
    img: 'assets/images/projects/archive/nexomedia-2.png',
    title: 'Service Communication System',
    text: 'Visual system designed to communicate multiple services clearly.'
  },
  {
    img: 'assets/images/projects/archive/truman-show.png',
    title: 'The Truman Show — Controlled Reality',
    text: 'Concept poster exploring surveillance and constructed identity.'
  },
  {
    img: 'assets/images/projects/archive/ashenfall.png',
    title: 'Ashenfall — Myth & Decay',
    text: 'Mythical poster exploring power, decay, and narrative scale.'
  },
  {
    img: 'assets/images/projects/archive/devilman.png',
    title: 'Devilman Crybaby — Inner Collapse',
    text: 'Illustrative poster exploring psychological conflict.'
  },
  {
    img: 'assets/images/projects/archive/incendies.png',
    title: 'Incendies — Inherited Silence',
    text: 'Concept poster exploring memory, trauma, and inheritance.'
  },
  {
    img: 'assets/images/projects/archive/experimental-layout.png',
    title: 'Experimental Editorial Layout',
    text: 'Exploratory layout testing rhythm and typographic tension.'
  },
  {
    img: 'assets/images/projects/archive/imagined-worlds-hero.jpg',
    title: 'Spatial Echoes',
    text: 'A conceptual artwork focused on mood, scale, and spatial ambiguity, using atmosphere and depth to suggest narrative rather than define it.'
  },
  {
    img: 'assets/images/projects/archive/1408-poster.png',
    title: '1408 — Psychological Confinement',
    text: 'A horror concept poster focusing on psychological collapse rather than physical threat.'
  },
  {
    img: 'assets/images/projects/archive/squid-game-poster.png',
    title: 'Squid Game — Survival as Spectacle',
    text: 'Concept poster exploring power, greed, and dehumanization through bold symbolism and hierarchy.'
  }
];


/* =====================================================
   STATE
===================================================== */

let currentIndex = 0;
let isOpen = false;
let itemWidth = 0;
let sidePadding = 0; // 🔧 FIX ADDED


/* =====================================================
   POPULATE ARCHIVE
===================================================== */

function populateArchive() {
  archiveTrack.innerHTML = '';

  archiveProjects.forEach(project => {
    const item = document.createElement('div');
    item.className = 'archive-item';

    item.innerHTML = `
      <img src="${project.img}" alt="${project.title}" />
      <div class="archive-title">${project.title}</div>
      <div class="archive-text">${project.text}</div>
    `;

    archiveTrack.appendChild(item);
  });

  requestAnimationFrame(() => {
    const firstItem = archiveTrack.querySelector('.archive-item');
    if (!firstItem) return;

    itemWidth = firstItem.offsetWidth + 56; // includes gap

    // 🔧 CRITICAL FIX: allow last items to center
    sidePadding = (overlayContent.clientWidth / 2) - (itemWidth / 2);
    archiveTrack.style.paddingLeft = `${sidePadding}px`;
    archiveTrack.style.paddingRight = `${sidePadding}px`;

    updatePosition();
  });
}


/* =====================================================
   POSITION + ACTIVE STATE
===================================================== */

function updatePosition() {
  const offset = -(currentIndex * itemWidth);

  archiveTrack.style.transform = `translateX(${offset}px)`;

  const items = archiveTrack.querySelectorAll('.archive-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentIndex);
  });
}


/* =====================================================
   SCROLL CONTROL
===================================================== */

function onWheel(e) {
  if (!isOpen) return;

  e.preventDefault();

  if (e.deltaY > 0 && currentIndex < archiveProjects.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  updatePosition();
}


/* =====================================================
   OPEN / CLOSE
===================================================== */

function openArchive() {
  if (!overlay) return;

  populateArchive();

  currentIndex = 0;
  isOpen = true;

  overlay.classList.add('active');
  document.body.classList.add('overlay-open');

  overlayContent.addEventListener('wheel', onWheel, { passive: false });
}

function closeArchive() {
  if (!overlay) return;

  isOpen = false;

  overlay.classList.remove('active');
  document.body.classList.remove('overlay-open');

  overlayContent.removeEventListener('wheel', onWheel);
}


/* =====================================================
   EVENTS
===================================================== */

overlayBackdrop?.addEventListener('click', closeArchive);
overlayClose?.addEventListener('click', closeArchive);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) {
    closeArchive();
  }
});


/* =====================================================
   EXPOSE (CRITICAL)
===================================================== */

window.openArchive = openArchive;

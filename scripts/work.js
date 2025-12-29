/* =====================================================
   SELECTED WORK — ACCORDION + ARCHIVE TRIGGER (SAFE)
===================================================== */

/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const projectRows = document.querySelectorAll('.project-row');
const viewAllButton = document.querySelector('.view-all');


/* =====================================================
   STATE
===================================================== */

let activeRow = null;


/* =====================================================
   OPEN PROJECT ROW
===================================================== */

function openProject(row) {
  if (activeRow && activeRow !== row) {
    closeProject(activeRow);
  }

  row.classList.add('active');
  activeRow = row;

  projectRows.forEach(r => {
    if (r !== row) r.classList.add('inactive');
  });
}


/* =====================================================
   CLOSE PROJECT ROW
===================================================== */

function closeProject(row) {
  row.classList.remove('active');
  activeRow = null;

  projectRows.forEach(r => r.classList.remove('inactive'));
}


/* =====================================================
   ROW CLICK HANDLING
===================================================== */

projectRows.forEach(row => {
  const trigger = row.querySelector('.project-trigger');
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (row.classList.contains('active')) {
      closeProject(row);
    } else {
      openProject(row);
    }
  });
});


/* =====================================================
   VIEW ALL WORKS (FIXED)
===================================================== */

if (viewAllButton) {
  viewAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeRow) closeProject(activeRow);

    if (typeof window.openArchive === 'function') {
      window.openArchive();
    } else {
      console.warn('[work.js] openArchive() not available');
    }
  });
}


/* =====================================================
   ESC — CLOSE ACTIVE ROW
===================================================== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeRow) {
    closeProject(activeRow);
  }
});


/* =====================================================
   CLICK OUTSIDE — CLOSE ACTIVE ROW
===================================================== */

document.addEventListener('click', (e) => {
  if (!activeRow) return;
  if (!e.target.closest('.project-row')) {
    closeProject(activeRow);
  }
});

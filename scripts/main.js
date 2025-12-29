const cta = document.querySelector('.cta');
const selectedWork = document.querySelector('#selected-work');

cta.addEventListener('click', () => {
  selectedWork.scrollIntoView({ behavior: 'smooth' });
});

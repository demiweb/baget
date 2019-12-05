import animateHeader from './animateHeader';
import animateStagger from './animateStagger';
import animateHome from './animateHome';

function initPageAnimations() {
  animateStagger();
  animateHome();
}

export default function setAnimations() {
  const staggerElsAll = [...document.querySelectorAll('.js-stagger-el')];

  if (staggerElsAll.length > 0) {
    staggerElsAll.forEach((el) => {
      const block = el;
      block.style.opacity = 0;
    });
  }
  animateHeader()
    .then(initPageAnimations);
}

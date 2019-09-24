import animateHeader from './animateHeader';
import animateStagger from './animateStagger';
import animateHome from './animateHome';

function initPageAnimations() {
  animateStagger();
  animateHome();
}

export default function setAnimations() {
  animateHeader()
    .then(initPageAnimations);
}

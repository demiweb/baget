import animateHeader from './animateHeader';
import animateStagger from './animateStagger';

function initPageAnimations() {
  animateStagger();
}

export default function setAnimations() {
  animateHeader()
    .then(initPageAnimations);
}

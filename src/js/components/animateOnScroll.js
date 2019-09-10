import Animator from '../lib/animateOnScroll';

export default function animateOnScroll() {
  const els = [...document.querySelectorAll('.js-anim-el')];
  if (!els.length) return;

  els.forEach((el) => {
    const animator = new Animator(el, {
      observer: {
        threshold: 0.3,
      },
    });
    animator.init();
  });
}

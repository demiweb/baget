import Animator from '../lib/animateOnScroll';

export default function animateOnScroll() {
  const els = [].slice.call(document.querySelectorAll('.js-anim-el'));
  if (!els.length) return;

  els.forEach((el) => {
    const animator = new Animator(el, {
      observer: {
        threshold: 0.2,
      },
    });
    animator.init();
  });
}
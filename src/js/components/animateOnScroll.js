import Anim from 'js-anim';

export default function animateOnScroll() {
  const els = [...document.querySelectorAll('.js-anim-el')];
  if (!els.length) return;

  els.forEach((el) => {
    const animator = new Anim(el, {
      observer: {
        threshold: 0.2,
      },
    });
    animator.observe();
  });
}

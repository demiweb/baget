import Anim from 'js-anim';

export default function animateOnScroll() {
  const els = document.querySelectorAll('.js-anim-el');

  const animator = new Anim(els, {
    observer: {
      threshold: 0.2,
    },
  });
  animator.observe();

  console.log(animator);
}

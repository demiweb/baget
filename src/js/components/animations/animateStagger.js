import { TimelineLite, Power2 } from 'gsap';

export default function animateStagger() {
  const staggerWraps = [...document.querySelectorAll('.js-stagger')];

  if (!staggerWraps.length) return;

  staggerWraps.forEach((wrap) => {
    const els = wrap.querySelectorAll('.js-stagger-el');

    const myObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tl = new TimelineLite({
            onComplete: () => {
              observer.unobserve(entry.target);
            },
          });

          tl
            .staggerFromTo(
              els,
              1,
              { y: 50, opacity: 0, ease: Power2.easeOut },
              { y: 0, opacity: 1, ease: Power2.easeOut },
              0.2,
            );
        }
      });
    });
    myObserver.observe(wrap);
  });
}

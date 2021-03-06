import { TimelineLite, Power2 } from 'gsap';

export default function animateHome() {
  const wrap = document.querySelector('.horizontal-page');
  if (!wrap) return;

  const headerEls = document.querySelector('.header-hor .header-hor__inner').children;

  const tl = new TimelineLite();

  tl
    .to(
      wrap,
      1,
      { opacity: 1 },
    )
    .staggerFromTo(
      headerEls,
      1,
      { y: 30, opacity: 0, ease: Power2.easeOut },
      { y: 0, opacity: 1, ease: Power2.easeOut },
      0.2,
    );
}

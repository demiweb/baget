import { TimelineLite, Power2 } from 'gsap';
import { IS_LOADED } from '../../constants';

export default function animateHeader() {
  return new Promise((resolve) => {
    const {
      out,
      main,
      header,
      headerLeft,
      headerContacts,
      headerNav,
    } = {
      out: document.querySelector('.out'),
      main: document.querySelector('.main'),
      header: document.querySelector('.header'),
      headerLeft: document.querySelector('.header__left'),
      headerContacts: document.querySelector('.header__contacts'),
      headerNav: document.querySelectorAll('.header__nav li'),
    };

    const tl = new TimelineLite({
      onComplete: () => {
        out.classList.add(IS_LOADED);
        resolve();
      },
    });

    tl
      .fromTo(
        headerLeft,
        0.5,
        { opacity: 0, ease: Power2.easeOut },
        { opacity: 1, ease: Power2.easeOut },
      );
    if (window.matchMedia('(min-width: 576px)').matches) {
      tl
        .fromTo(
          headerContacts,
          0.5,
          { x: '100%', opacity: 0, ease: Power2.easeOut },
          { x: '0%', opacity: 1, ease: Power2.easeOut },
          '-=0.5',
        );
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      tl
        .staggerFromTo(
          headerNav,
          0.5,
          { y: 15, opacity: 0, ease: Power2.easeOut },
          { y: 0, opacity: 1, ease: Power2.easeOut },
          0.1,
        );
    }
    tl
      .fromTo(
        main,
        1,
        { opacity: 0, ease: Power2.easeOut },
        { opacity: 1, ease: Power2.easeOut },
      );
  });
}

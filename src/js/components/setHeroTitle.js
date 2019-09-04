import { throttle } from 'throttle-debounce';
import { IS_HIDDEN } from '../constants';

class HeroTitle {
  constructor(title) {
    this.title = title;
    this.out = document.querySelector('.out');
  }

  toggle() {
    const paddingBottom = parseInt(window.getComputedStyle(this.out).paddingBottom, 10);

    const top = this.out.offsetHeight - paddingBottom;
    const wTop = window.pageYOffset;
    const outScrollTop = this.out.scrollTop;

    console.log({ top, wTop });

    if (true) {
      this.title.classList.add(IS_HIDDEN);
    } else {
      this.title.classList.remove(IS_HIDDEN);
    }
  }

  _toggleTitle() {
    this.toggleThrottled = throttle(66, this.toggle.bind(this));
    window.addEventListener('scroll', this.toggleThrottled);
  }

  init() {
    this._toggleTitle();
  }
}

export default function setHeroTitle() {
  const titles = [].slice.call(document.querySelectorAll('.js-hero-title'));

  if (!titles.length) return;


  // function toggleTitle() {
  //   if (window.matchMedia('(max-width: 767px)').matches) {};

  //   const out = document.querySelector('.out');
  //   if (window.pageYOffset) {
  //     title
  //   } else {
  //     second expression
  //   }

  // }

  // const toggleTitleThrottled = throttle(66, toggleTitle);

  titles.forEach((title) => {
    const heroTitle = new HeroTitle(title);
    heroTitle.init();
    // window.addEventListener('scroll', toggleTitleThrottled);
  });
}

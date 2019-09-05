import { debounce } from 'throttle-debounce';
import { IS_VISIBLE } from '../constants';

class Footer {
  constructor(footer) {
    this.footer = footer;
    this.header = document.querySelector('.header');
    this.sideLine = document.querySelector('.js-side-line');
  }

  setVisibility() {
    this.out = document.querySelector('.out');
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.out.style.paddingBottom = '';
      this.footer.classList.add(IS_VISIBLE);
      return;
    }

    this.footer.classList.remove(IS_VISIBLE);
    this.height = this.footer.offsetHeight;
    this.out.style.paddingBottom = `${this.height}px`;
  }

  toggleVisibility(entries) {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
        this.footer.classList.remove(IS_VISIBLE);
      } else {
        this.footer.classList.add(IS_VISIBLE);
      }
    });
  }

  _setOutPadding() {
    this.setVisibility();
    this.setVisibilityDebounced = debounce(300, this.setVisibility.bind(this));
    window.addEventListener('resize', this.setVisibilityDebounced);
  }

  _toggleVisibility() {
    this.observer = new IntersectionObserver(this.toggleVisibility.bind(this), {
      rootMargin: '100px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    this.observer.observe(this.header);
  }


  init() {
    this._setOutPadding();
    this._toggleVisibility();
  }
}

export default function setOutPaddingBottom() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const f = new Footer(footer);
  f.init();
}
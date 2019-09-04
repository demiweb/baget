import { debounce } from 'throttle-debounce';
import { IS_VISIBLE } from '../constants';

class Footer {
  constructor(footer) {
    this.footer = footer;
    this.header = document.querySelector('.header');
  }

  setPadding() {
    this.out = document.querySelector('.out');
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.out.style.paddingBottom = '';
      this.footer.classList.add(IS_VISIBLE);
      return;
    }

    this.height = this.footer.offsetHeight;
    this.out.style.paddingBottom = `${this.height}px`;
  }

  toggleVisibility(entries) {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.footer.classList.remove(IS_VISIBLE);
      } else {
        this.footer.classList.add(IS_VISIBLE);
      }
    });
  }

  _setOutPadding() {
    this.setPadding();
    this.setPaddingDebounced = debounce(300, this.setPadding.bind(this));
    window.addEventListener('resize', this.setPaddingDebounced);
  }

  _toggleVisibility() {
    this.observer = new IntersectionObserver(this.toggleVisibility.bind(this), { rootMargin: '100px' });
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

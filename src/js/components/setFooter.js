import { debounce, throttle } from 'throttle-debounce';
import { IS_VISIBLE, IS_ABOVE } from '../constants';
import { isTouch } from '../helpers';

class Footer {
  constructor(footer) {
    this.footer = footer;
    this.header = document.querySelector('.header');
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

  toggleAbove(condition) {
    if (condition) {
      this.footer.classList.add(IS_ABOVE);
    } else {
      this.footer.classList.remove(IS_ABOVE);
    }
  }

  toggleZIndex() {
    this.toggleAbove((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight);
  }

  _toggleZIndex() {
    if (!isTouch) return;
    this.toggleZIndexThrottled = throttle(66, this.toggleZIndex.bind(this));
    window.addEventListener('scroll', this.toggleZIndexThrottled);
  }

  show() {
    this.footer.classList.add(IS_VISIBLE);
  }

  hide() {
    this.footer.classList.remove(IS_VISIBLE);
  }

  toggleVisibility(entries) {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
        this.hide();
      } else {
        this.show();
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
    if (!this.footer) return;
    this._setOutPadding();
    this._toggleVisibility();
    this._toggleZIndex();
  }
}


const footer = document.querySelector('.footer');

const fixedFooter = new Footer(footer);

export default fixedFooter;
